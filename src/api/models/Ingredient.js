import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    picture: Object,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Ingredient || mongoose.model("Ingredient", IngredientSchema);
