import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/models/User";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "PUT":
      try {
        if (req.query._id !== req.body._id)
          return res.status(400).json({ message: "Bad request" });
        let user = await User.findByIdAndUpdate(req.body._id, req.body, {
          new: "true",
        });

        res.status(200).json({ data: user });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    case "DELETE":
      try {
        if (req.query._id !== req.body._id)
          return res.status(400).json({ message: "Bad request" });

        let user = await User.findByIdAndDelete(req.body._id);

        res.status(200).json({ data: user });
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
