import React from "react";
import useSWR from "swr";

import styles from "./index.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR("/api/recipes", fetcher);
  const handleAddRecipe = async () => {};
  console.log({ data });
  // console.log({ error });

  if (error) return <div>Echec du chargement, vous devez être connecté</div>;
  if (!data) return <div>Chargement en cours....</div>;
  return (
    <main className={styles.main}>
      <h1>Bienvenue sur l'appli de recettes!</h1>
      <button onClick={handleAddRecipe}>Ajouter une recette</button>
      <h2>Liste de recettes</h2>
      <ul>
        {data?.map((recipe) => (
          <li key={recipe._id}>{recipe.title} </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
