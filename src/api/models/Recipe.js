import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // steps: [{ step: Number, content: String }],
    vegetarian: { type: Boolean, required: true },
    howMany: Number,
    // season: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
    picture: Object,
    comment: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
