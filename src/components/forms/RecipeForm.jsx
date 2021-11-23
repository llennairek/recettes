import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axios from "axios";

import styles from "./RecipeForm.module.css";

import BlueButton from "../buttons/BlueButton";
import RecipeFormNextButton from "../buttons/RecipeFormNextButton";
import RecipeFormPreviousButton from "../buttons/RecipeFormPreviousButton";
import SelectField from "./fields/SelectField";

import RecipeSchema from "../../utils/validationSchemas/recipeSchema";
import { getIngredients } from "../../lib/front/get";
import IngredientForm from "./IngredientForm";

const RecipeForm = ({ mutate, options = [] }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [options, setOptions] = useState(options);

  const formRef = useRef();

  const handleAddRecipe = async () => setShowRecipeForm((value) => !value);
  const handleAddIngredient = async () =>
    setShowIngredientForm((value) => !value);

  return (
    <>
      <div>
        <BlueButton
          text="Ajouter une recette"
          onClick={handleAddRecipe}
          style={showRecipeForm ? { maxWidth: "50px" } : { maxWidth: "200px" }}
        >
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
              <Form
                className={styles.form}
                ref={formRef}
                style={{ maxHeight: showRecipeForm ? "750px" : "0px" }}
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
                  {/* <BlueButton
                    type="button"
                    onClick={handleAddIngredient}
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>+</span>
                  </BlueButton> */}
                  {/* <IngredientForm /> */}
                  <ErrorMessage
                    name="ingredients"
                    render={(msg) => <div className={styles.error}> {msg}</div>}
                  />
                  <Field
                    name="ingredients"
                    // className={styles.input}
                    component={({ field, form }) => {
                      return (
                        <SelectField
                          options={options}
                          field={field}
                          form={form}
                          isMulti={true}
                          // value={
                          //   options
                          //     ? options.find(
                          //         (option) => option.value === field.value
                          //       )
                          //     : ""
                          // }
                          // onChange={(option) =>
                          //   form.setFieldValue(field.name, option.value)
                          // }
                          // onBlur={field.onBlur}
                        />
                      );
                    }}
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

              <div
                className={styles.recipePreview}
                style={{ maxHeight: showRecipeForm ? "400px" : "0px" }}
              >
                <div>
                  <span className="color-blue">
                    Titre : <span className="color-white">{values.title}</span>
                  </span>
                  <span></span>
                </div>
                <div>
                  <span className="color-blue">
                    Nbre de personnes :{" "}
                    <span className="color-white">{values.howMany}</span>
                  </span>
                  <span></span>
                </div>
                <div>
                  <span className="color-blue">
                    Saison :{" "}
                    <span className="color-white">{values.season}</span>
                  </span>
                  <span></span>
                </div>
                <div>
                  <span className="color-blue">
                    Ingrédients :{" "}
                    <span className="color-white">
                      {values.ingredients.map((value) => value.value).join(" ")}
                    </span>
                  </span>
                  <span></span>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RecipeForm;
