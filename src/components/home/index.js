import React from "react";
import useSWR from "swr";
import Link from "next/link";

import useUser from "../../lib/front/hooks/useUser";

import styles from "./index.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { user, userError } = useUser();
  const { data, error } = useSWR(user ? "/api/recipes" : null, fetcher);
  const handleAddRecipe = async () => {};

  if (error || userError)
    return (
      <div>
        <p>Bah alors t'es qui??!</p>
        <Link href="/login">
          <a>Se connecter</a>
        </Link>
      </div>
    );
  if (!data) return <div>Chargement en cours....</div>;
  return (
    <main className={styles.main}>
      <h1>Bienvenue sur l'appli de recettes!</h1>
      <button onClick={handleAddRecipe}>Ajouter une recette</button>
      <h2>Liste de recettes</h2>
      <ul>
        {data?.map((recipe) => (
          <li key={recipe._id}>{recipe.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
