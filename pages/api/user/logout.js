import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/api/models/User";
import Recipe from "../../../src/api//models/Recipe";

import isAuthenticated from "../../../src/api/middlewares/isAuthenticated";

export default isAuthenticated(handler);

async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  if (method !== "DELETE")
    return res.status(405).json({ message: "Method not supported" });

  try {
    res.setHeader(
      "Set-Cookie",
      "auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.status(200).json({ message: "cookie cleared" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
