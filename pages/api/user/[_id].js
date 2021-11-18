import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/api/models/User";

import isAuthenticated from "../../../src/api/middlewares/isAuthenticated";

export default isAuthenticated(handler);

async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        if (req.query._id !== req.user._id)
          return res.status(400).json({ message: "Bad request" });
        const user = await User.findById(req.query._id);
        if (!user) res.status(400).json({ message: "Bad request" });

        const { _id, name, email, recipesOwner, recipesUser } = user;

        res.status(200).json({ name, email, recipesOwner, recipesUser });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    case "PUT":
      try {
        if (req.query._id !== req.user._id)
          return res.status(400).json({ message: "Bad request" });
        let user = await User.findByIdAndUpdate(req.query._id, req.body, {
          new: "true",
        });

        res.status(200).json(user);
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    case "DELETE":
      try {
        if (req.query._id !== req.user._id)
          return res.status(400).json({ message: "Bad request" });

        let user = await User.findByIdAndDelete(req.query._id);

        res.status(200).json(user);
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not supported" });
      break;
  }
}
