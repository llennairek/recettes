import React from "react";

import styles from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  return (
    <article className={styles.recipeContainer}>
      <div className={styles.recipeWrapper}>
        <h2>{recipe.title}</h2>
        <div>Végétarien : {recipe.vegetarian ? "Oui" : "Non"}</div>
        {/* <div>Saison: {recipe.season || "Toutes"}</div> */}
        <div>
          Ingredients: {recipe.ingredients.map((ingredient) => ingredient.name)}
        </div>
        <div>
          Commentaires:<pre>{recipe.comment || ""}</pre>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
