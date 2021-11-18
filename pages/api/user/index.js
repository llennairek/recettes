import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/api/models/User";

import isAuthenticated from "../../../src/api/middlewares/isAuthenticated";

export default isAuthenticated(handler);

async function handler(req, res) {
  const { method } = req;

  if (method !== "GET")
    return res.status(405).json({ message: "Method not supported" });

  try {
    await dbConnect();
    const user = await User.findById(req.user._id);
    if (!user) res.status(400).json({ message: "Bad request" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
