import React from "react";

import styles from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  return (
    <article className={styles.recipeContainer}>
      <div className={styles.recipeWrapper}>
        <h2>{recipe.title}</h2>
        <div>Nbre de personnes: {recipe.howMany || 0}</div>
        <div>Saison: {recipe.season || "Toutes"}</div>
        <div>Ingredients: {recipe.ingredients || ""}</div>
      </div>
    </article>
  );
};

export default RecipeCard;
