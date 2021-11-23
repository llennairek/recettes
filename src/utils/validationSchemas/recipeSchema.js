import * as Yup from "yup";

const RecipeSchema = Yup.object({
  title: Yup.string().required("Champs requis"),
  // steps: Yup.object(),
  comment: Yup.string(),
  // seasons: Yup.string(),
  ingredients: Yup.array(),
  vegetarian: Yup.string().required().oneOf(["true", "false"]),
});

export default RecipeSchema;
