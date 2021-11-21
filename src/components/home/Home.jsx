import React, { useState } from "react";
import useSWR from "swr";

import useUser from "../../lib/front/hooks/useUser";
import LoginForm from "../forms/LoginForm";
import RecipeForm from "../forms/RecipeForm";
import BlueButton from "../buttons/BlueButton";
import Spinner from "../spinner/Spinner";
import RecipesList from "../recipes/RecipesList";

import styles from "./Home.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { user, userError } = useUser();
  const { data, mutate, error } = useSWR(user ? "/api/recipes" : null, fetcher);

  if (error || userError)
    return (
      <div className={styles.main}>
        <p
          style={{
            animationDuration: "2s",
            animationFillMode: "forwards",
            marginBottom: "2rem",
          }}
          className={styles.who + " slide-from-top"}
        >
          Salut...{" "}
          <span
            style={{
              animationDelay: "1.5s",
            }}
            className={styles.whoSpan + " slide-from-right"}
          >
            euh t'es qui??!
          </span>
        </p>
        <LoginForm />
      </div>
    );

  if (!data) return <Spinner />;

  return (
    <div className={styles.main}>
      <p className={styles.who + " slide-from-top"}>
        Salut
        <span className={styles.whoSpan + " slide-from-right"}>
          {user.name}
        </span>
      </p>
      <div className={styles.recipeForm + " slide-from-left"}>
        <RecipeForm mutate={mutate} />
      </div>
      <div className={styles.recipesContainer + " slide-from-right"}>
        <RecipesList recipeList={data} />
      </div>
    </div>
  );
};

export default Home;
