import dbConnect from "../../../src/lib/dbConnect";
import Ingredient from "../../../src/models/Ingredient";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "PUT":
      try {
        if (req.query._id !== req.body._id)
          return res.status(400).json({ message: "Bad request" });

        let ingredient = await Ingredient.findByIdAndUpdate(
          req.body._id,
          req.body,
          {
            new: "true",
          }
        );

        res.status(200).json({ data: ingredient });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Bad request" });
      }
      break;
    case "DELETE":
      try {
        if (req.query._id !== req.body._id)
          return res.status(400).json({ message: "Bad request" });

        let ingredient = await Ingredient.findByIdAndDelete(req.body._id);

        res.status(200).json({ data: ingredient });
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
