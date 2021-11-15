import dbConnect from "../../../src/lib/dbConnect";
import Recipe from "../../../src/api/models/Recipe";

import isAuthenticated from "../../../src/api/middlewares/isAuthenticated";

export default isAuthenticated(async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log(req.user);
        const recipes = await Recipe.find({ owner: req.user });
        res.status(200).json({ data: recipes });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      try {
        const recipe = new Recipe({
          title: req.body.title,
          steps: req.body.steps,
          howMany: req.body.howMany,
          season: req.body.season,
          owner: req.user._id,
          ingredients: req.body.ingredients,
          picture: req.body.picture,
        });

        const user = req.user;
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
});
