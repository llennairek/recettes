import React, { useState, useEffect } from "react";
import useSWR from "swr";

import useUser from "../../lib/front/hooks/useUser";
import LoginForm from "../forms/LoginForm";
import RecipeForm from "../forms/RecipeForm";
import BlueButton from "../buttons/BlueButton";
import Spinner from "../spinner/Spinner";
import RecipesList from "../recipes/RecipesList";

import styles from "./Home.module.css";
import IngredientForm from "../forms/IngredientForm";
import { getIngredients } from "../../lib/front/get";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { user, userError } = useUser();
  const { data, mutate, error } = useSWR(user ? "/api/recipes" : null, fetcher);
  const {
    data: ingredients,
    mutate: mutateIngredients,
    error: ingredientsError,
  } = useSWR(user ? "/api/ingredients" : null, fetcher);
  const [options, setOptions] = useState(ingredientsError ? [] : ingredients);

  useEffect(() => {
    const optionsformated = ingredients?.map((option) => ({
      value: option.name,
      label: option.name,
      _id: option._id,
    }));
    setOptions(optionsformated);
  }, [ingredients]);

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
            euh t&apos;es qui??!
          </span>
        </p>
        <LoginForm style={{ marginTop: "100px" }} />
      </div>
    );

  if (!data) return <Spinner />;

  return (
    <>
      <p
        className={styles.who + " slide-from-top"}
        style={{ top: "10px", left: "50%" }}
      >
        Salut
        <span className={styles.whoSpan + " slide-from-right"}>
          {user.name}
        </span>
      </p>
      <div className={styles.main}>
        <div className={styles.recipeForm + " slide-from-left"}>
          <RecipeForm
            mutate={mutate}
            options={options}
            ingredients={ingredients}
          />
          {/* <hr style={{ borderColor: "var(--secondary)" }} /> */}
          <IngredientForm mutate={mutateIngredients} />
        </div>
        <div className={styles.recipesContainer + " slide-from-right"}>
          <RecipesList recipeList={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
