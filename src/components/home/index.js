import React, { useEffect } from "react";
import useSWR from "swr";

import styles from "./index.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR("/api/recipes", fetcher);
  const handleAddRecipe = async () => {};
  console.log(data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading........</div>;
  return (
    <main className={styles.main}>
      <h1>Bienvenue sur l'appli de recettes!</h1>
      <button onClick={handleAddRecipe}>Ajouter une recette</button>
      <h2>Liste de recettes</h2>
      <ul>
        {data.data.map((recipe) => (
          <li>{recipe.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
