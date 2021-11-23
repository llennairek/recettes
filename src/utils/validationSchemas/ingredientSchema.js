import * as Yup from "yup";

const IngredientSchema = Yup.object({
  name: Yup.string().required("Champs requis"),
  type: Yup.string().required("Champs Requis"),
});

export default IngredientSchema;
