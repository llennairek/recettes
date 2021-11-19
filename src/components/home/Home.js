import React, { useState } from "react";
import useSWR from "swr";

import useUser from "../../lib/front/hooks/useUser";
import LoginForm from "../forms/LoginForm";
import RecipeForm from "../forms/RecipeForm";
import BlueButton from "../buttons/BlueButton";
import Spinner from "../spinner/Spinner";

import styles from "./Home.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { user, userError } = useUser();
  const { data, mutate, error } = useSWR(user ? "/api/recipes" : null, fetcher);

  if (error || userError)
    return (
      <main className={styles.main}>
        <p className={styles.who}>
          Salut...euh t'es <span>qui</span> ??!
        </p>
        <LoginForm />
      </main>
    );

  if (!data) return <Spinner />;

  return (
    <main className={styles.main}>
      <h1>Salut {user.name}</h1>

      <RecipeForm mutate={mutate} />
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
