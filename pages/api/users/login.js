import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/api/models/User";
import Recipe from "../../../src/api//models/Recipe";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  if (method !== "POST")
    return res.status(405).json({ message: "Method not supported" });

  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email: req.body.email }).populate({
      path: "recipesOwner",
      model: Recipe,
    });
    if (!user) return res.status(400).json("Wrong email or password");

    const isPasswordVerified = await bcrypt.compare(
      req.body.password,
      user.hash
    );

    if (!isPasswordVerified)
      return res.status(400).json("Wrong email or password");

    const claims = { sub: user._id };
    const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "600s",
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
        maxAge: 600,
        path: "/",
      })
    );

    res.status(200).json({
      name: user.name,
      email: user.email,
      recipes: user.recipesOwner,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
