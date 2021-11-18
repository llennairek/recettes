import dbConnect from "../../../src/lib/dbConnect";
import Recipe from "../../../src/api/models/Recipe";
import User from "../../../src/api/models/User";

import isAuthenticated from "../../../src/api/middlewares/isAuthenticated";

export default isAuthenticated(handler);

async function handler(req, res) {
  if (!req.user) return;

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const recipes = await Recipe.find({ owner: req.user._id });
        res.status(200).json(recipes);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      try {
        const recipe = await new Recipe({
          title: req.body.title,
          steps: req.body.steps,
          howMany: req.body.howMany,
          season: req.body.season,
          owner: req.user._id,
          ingredients: req.body.ingredients,
          picture: req.body.picture,
        });

        const user = await User.findById(req.user._id);
        user.recipesOwner.push(recipe._id);

        await recipe.save();
        await user.save();

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
