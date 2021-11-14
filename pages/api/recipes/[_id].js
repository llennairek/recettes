import dbConnect from "../../../src/lib/dbConnect";
import Recipe from "../../../src/models/Recipe";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "PUT":
      try {
        if (req.query._id !== req.body._id)
          return res.status(400).json({ message: "Bad request" });

        let recipe = await Recipe.findByIdAndUpdate(req.body._id, req.body, {
          new: "true",
        });

        res.status(200).json({ data: recipe });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    case "DELETE":
      try {
        if (req.query._id !== req.body._id)
          return res.status(400).json({ message: "Bad request" });

        let recipe = await Recipe.findByIdAndDelete(req.body._id);

        res.status(200).json({ data: recipe });
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
