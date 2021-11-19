import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "./RecipeForm.module.css";

import BlueButton from "../buttons/BlueButton";
import RecipeFormNextButton from "../buttons/RecipeFormNextButton";
import RecipeFormPreviousButton from "../buttons/RecipeFormPreviousButton";

import RecipeSchema from "../../utils/validationSchemas/recipeSchema";

const RecipeForm = ({ mutate }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerLeaveAnimation, setTriggerLeaveAnimation] = useState(false);
  const router = useRouter();

  const formRef = useRef();

  const handleAddRecipe = async () => setShowRecipeForm((value) => !value);
  return (
    <>
      <div>
        <BlueButton text="Ajouter une recette" onClick={handleAddRecipe}>
          <span>{showRecipeForm ? "X" : "Ajouter une recette"}</span>
        </BlueButton>
      </div>
      <div className={styles.container}>
        <div className={styles.error}>{errorMessage}</div>
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
                setScrollPosition(0);
                mutate();
              })
              .catch((error) =>
                setErrorMessage("!! Erreur lors de l'envoi de la recette !!")
              );
          }}
        >
          {({ isSubmitting, isValidating, errors, values, validateField }) => (
            <>
              <div
                className={styles.recipePreview}
                style={{
                  maxHeight: !showRecipeForm ? "0px" : "1000px",
                }}
              >
                <div>
                  <span>Titre : </span>
                  <span></span>
                </div>
              </div>

              <Form
                className={styles.form}
                ref={formRef}
                style={{ maxHeight: showRecipeForm ? "350px" : "0px" }}
              >
                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="title">
                    Titre
                  </label>
                  <ErrorMessage
                    name="title"
                    render={(msg) => <div className={styles.error}>{msg}</div>}
                  />
                  <Field
                    type="text"
                    name="title"
                    className={styles.input}
                    placeholder="Titre de la recette"
                  />
                  <div className={styles.buttonsWrapper}>
                    <RecipeFormNextButton
                      onClick={() => validateField("title")}
                      formRef={formRef}
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      isSubmitting={isSubmitting}
                      isValidating={isValidating}
                      error={errors.title}
                      value={values.title}
                    />
                  </div>
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="howMany">
                    Pour combien de personnes?
                  </label>
                  <ErrorMessage
                    name="howMany"
                    render={(msg) => <div className={styles.error}> {msg}</div>}
                  />
                  <Field
                    type="number"
                    name="howMany"
                    className={styles.input}
                  />
                  <div className={styles.buttonsWrapper}>
                    <RecipeFormPreviousButton
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      formRef={formRef}
                    />
                    <RecipeFormNextButton
                      formRef={formRef}
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      isSubmitting={isSubmitting}
                      isValidating={isValidating}
                      error={errors.howMany}
                      value={true}
                    />
                  </div>
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="season">
                    Saison
                  </label>
                  <ErrorMessage
                    name="season"
                    render={(msg) => <div className={styles.error}> {msg}</div>}
                  />
                  <Field type="text" name="season" className={styles.input} />
                  <div className={styles.buttonsWrapper}>
                    <RecipeFormPreviousButton
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      formRef={formRef}
                    />
                    <RecipeFormNextButton
                      formRef={formRef}
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      isSubmitting={isSubmitting}
                      isValidating={isValidating}
                      error={errors.season}
                      value={true}
                    />
                  </div>
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="ingredients">
                    Ingrédients
                  </label>
                  <ErrorMessage
                    name="ingredients"
                    render={(msg) => <div className={styles.error}> {msg}</div>}
                  />
                  <Field
                    type="text"
                    name="ingredients"
                    className={styles.input}
                  />
                  <div className={styles.buttonsWrapper}>
                    <RecipeFormPreviousButton
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      formRef={formRef}
                    />
                    <RecipeFormNextButton
                      formRef={formRef}
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      isSubmitting={isSubmitting}
                      isValidating={isValidating}
                      error={errors.ingredients}
                      value={true}
                    />
                  </div>
                </div>

                <div className={styles.fieldWrapper}>
                  <div className={styles.buttonsWrapper}>
                    <RecipeFormPreviousButton
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      formRef={formRef}
                    />

                    <BlueButton
                      type="submit"
                      style={{
                        marginBottom: "2rem",
                        backgroundColor: "var(--secondary)",
                      }}
                      disabled={
                        isSubmitting ||
                        isValidating ||
                        errors.title ||
                        !values.title
                      }
                    >
                      Ajouter
                    </BlueButton>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RecipeForm;
