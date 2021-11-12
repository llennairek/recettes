import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Ingredient || mongoose.model("Ingredient", IngredientSchema);
