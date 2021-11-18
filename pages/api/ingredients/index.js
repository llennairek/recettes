import dbConnect from "../../../src/lib/dbConnect";
import Ingredient from "../../../src/api/models/Ingredient";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const ingredients = await Ingredient.find();
        res.status(200).json({ data: ingredients });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      try {
        const ingredient = await Ingredient.create(req.body);
        res.status(201).json({ data: ingredient });
      } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
      }
      break;
    default:
      res.status(405).json({ message: "Method not supported" });
      break;
  }
}
