import React from "react";

import RecipeCard from "./RecipeCard";

import styles from "./RecipesList.module.css";

const RecipesList = ({ recipeList }) => {
  return (
    <section className={styles.recipesContainer}>
      <h1>Mes recettes</h1>
      <div className={styles.recipesWrapper}>
        {recipeList.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RecipesList;
