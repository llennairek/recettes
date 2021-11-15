import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    steps: [{ step: Number, content: String }],
    howMany: Number,
    season: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ingredients: [
      {
        quantity: Number,
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
      },
    ],
    picture: Object,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
