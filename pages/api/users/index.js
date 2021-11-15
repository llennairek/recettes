import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/api/models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "GET")
    return res.status(405).json({ message: "Method not supported" });

  try {
    await dbConnect();
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json(error);
  }
}
