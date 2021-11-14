import dbConnect from "../../../src/lib/dbConnect";
import Recipe from "../../../src/models/Recipe";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const recipes = await Recipe.find();
        res.status(200).json({ data: recipes });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json({ data: recipe });
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
