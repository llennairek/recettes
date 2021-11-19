import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "./RecipeForm.module.css";

import BlueButton from "../buttons/BlueButton";

import RecipeSchema from "../../utils/validationSchemas/recipeSchema";

const RecipeForm = ({ mutate }) => {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerLeaveAnimation, setTriggerLeaveAnimation] = useState(false);
  const router = useRouter();

  const handleAddRecipe = async () => setShowRecipeForm((value) => !value);
  return (
    <>
      <BlueButton text="Ajouter une recette" onClick={handleAddRecipe}>
        <span>Ajouter une recette</span>
      </BlueButton>
      <div
        className={`${styles.container} 
        ${triggerLeaveAnimation && styles.leave}
        `}
        style={{ maxHeight: showRecipeForm ? "500px" : "0px" }}
      >
        <Formik
          initialValues={{
            title: "",
            steps: {},
            howMany: "",
            season: "",
            ingredients: [],
          }}
          validationSchema={RecipeSchema}
          onSubmit={async (values, { resetForm }) => {
            setErrorMessage("");
            axios
              .post("http://localhost:3000/api/recipes", values)
              .then((res) => {
                resetForm();
                setShowRecipeForm(false);
                mutate();
              })
              .catch((error) =>
                setErrorMessage("Erreur lors de l'envoi de la recette")
              );
          }}
        >
          {({ isSubmitting, isValidating, errors, values }) => (
            <Form className={styles.form}>
              <div className={styles.error}>{errorMessage}</div>
              <label htmlFor="title">Titre</label>
              <ErrorMessage
                name="title"
                render={(msg) => <div className={styles.error}>{msg}</div>}
              />
              <Field type="text" name="title" className={styles.input} />

              <label htmlFor="howMany">Pour combien de personnes?</label>
              <ErrorMessage
                name="howMany"
                render={(msg) => <div className={styles.error}> {msg}</div>}
              />
              <Field type="text" name="howMany" className={styles.input} />

              <label htmlFor="season">Saison</label>
              <ErrorMessage
                name="season"
                render={(msg) => <div className={styles.error}> {msg}</div>}
              />
              <Field type="text" name="season" className={styles.input} />

              <label htmlFor="ingredients">Ingrédients</label>
              <ErrorMessage
                name="ingredients"
                render={(msg) => <div className={styles.error}> {msg}</div>}
              />
              <Field type="text" name="ingredients" className={styles.input} />

              <BlueButton
                type="submit"
                text="Se connecter"
                disabled={
                  isSubmitting || isValidating || errors.title || !values.title
                }
              >
                Ajouter
              </BlueButton>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RecipeForm;
