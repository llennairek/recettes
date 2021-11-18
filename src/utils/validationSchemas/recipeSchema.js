import * as Yup from "yup";

const RecipeSchema = Yup.object({
  title: Yup.string().required("Champs requis"),
  steps: Yup.object(),
  howMany: Yup.string(),
  seasons: Yup.string(),
  ingredients: Yup.array(),
});

export default RecipeSchema;
