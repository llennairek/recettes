import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/api/models/User";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  if (method !== "POST")
    return res.status(405).json({ message: "Method not supported" });

  if (!req.body.name || !req.body.email)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) return res.status(400).json("Email already exists");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      hash: hashedPassword,
    });
    await user.save();

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

    res.status(201).json({
      name: user.name,
      email: user.email,
      recipes: user.recipesOwner,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
