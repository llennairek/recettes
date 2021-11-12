import dbConnect from "../../src/lib/dbConnect";
import User from "../../src/models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        res.status(200).json({ data: users });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({ data: user });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Email already exists" });
      }
      break;
    case "PUT":
      try {
        let user = await User.findByIdAndUpdate(req.body._id, req.body, {
          new: "true",
        });

        res.status(200).json({ data: user });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    default:
      res.status(403).json({ message: "Forbidden" });
      break;
  }
}
