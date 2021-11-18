import React from "react";
import useSWR from "swr";

import useUser from "../../lib/front/hooks/useUser";
import LoginForm from "../forms/LoginForm";
import BlueButton from "../buttons/BlueButton";
import Spinner from "../spinner/Spinner";

import styles from "./Home.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { user, userError } = useUser();
  const { data, error } = useSWR(user ? "/api/recipes" : null, fetcher);
  const handleAddRecipe = async () => {};
  if (error || userError)
    return (
      <div>
        <p>Bah alors t'es qui??!</p>
        <LoginForm />
      </div>
    );
  if (!data) return <Spinner />;
  return (
    <main className={styles.main}>
      <h1>Salut {user.name}</h1>
      <BlueButton text="Ajouter une recette" onClick={handleAddRecipe}>
        <span>Ajouter une recette</span>
      </BlueButton>
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