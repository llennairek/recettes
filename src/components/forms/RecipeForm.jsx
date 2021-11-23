import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axios from "axios";

import styles from "./RecipeForm.module.css";

import BlueButton from "../buttons/BlueButton";
import RecipeFormNextButton from "../buttons/RecipeFormNextButton";
import RecipeFormPreviousButton from "../buttons/RecipeFormPreviousButton";
import SelectField from "./fields/SelectField";

import RecipeSchema from "../../utils/validationSchemas/recipeSchema";

const RecipeForm = ({ mutate, options = [], ingredients }) => {
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
      <div
        className={styles.container}
        style={{ maxHeight: showRecipeForm ? "750px" : "0px" }}
      >
        <div className={styles.error}>{errorMessage}</div>
        <Formik
          initialValues={{
            title: "",
            // steps: null,
            comment: "",
            // season: "",
            ingredients: [],
            vegetarian: "",
          }}
          validationSchema={RecipeSchema}
          onSubmit={async (values, { resetForm }) => {
            setErrorMessage("");
            const valuesToSend = { ...values };

            const ingredientsToSend = values.ingredients.map(
              (ingredient) => ingredient._id
            );
            valuesToSend.vegetarian =
              values.vegetarian === "true" ? true : false;
            valuesToSend.ingredients = ingredientsToSend;

            axios
              .post(`/api/recipes`, valuesToSend)
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
          {({
            isSubmitting,
            isValidating,
            errors,
            values,
            validateField,
            setFieldValue,
            field,
          }) => (
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

                {/* <div className={styles.fieldWrapper}>
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
                </div> */}

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
                  <label className={styles.label} htmlFor="vegetarian">
                    Plat végétarien?
                  </label>
                  <ErrorMessage
                    name="vegetarian"
                    render={(msg) => <div className={styles.error}>{msg}</div>}
                  />
                  <div
                    className={styles.radioWrapper}
                    role="group"
                    aria-labelledby="vegetarian-group"
                  >
                    <label>
                      <Field type="radio" name="vegetarian" value="true" />
                      Végétarien
                    </label>
                    <label>
                      <Field type="radio" name="vegetarian" value="false" />
                      Non végétarien
                    </label>
                  </div>
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
                      error={errors.vegetarian}
                      value={values.vegetarian}
                    />
                  </div>
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="comment">
                    Commentaires / Instructions de la recette
                  </label>
                  <ErrorMessage
                    name="comment"
                    render={(msg) => <div className={styles.error}> {msg}</div>}
                  />
                  <Field
                    type="text"
                    name="comment"
                    className={styles.input}
                    as="textarea"
                    placeholder="Ajouter un commentaire ou des instructions de recette"
                    rows="5"
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
                      error={errors.comment}
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
                        !values.title ||
                        errors.vegetarian
                      }
                    >
                      Ajouter
                    </BlueButton>
                  </div>
                </div>
              </Form>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

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
                    Commentaires :{" "}
                    <span className="color-white">{values.comment}</span>
                  </span>
                  <span></span>
                </div>
                {/* <div>
                  <span className="color-blue">
                    Saison :{" "}
                    <span className="color-white">{values.season}</span>
                  </span>
                  <span></span>
                </div> */}
                <div>
                  <span className="color-blue">
                    Ingrédients :{" "}
                    <span className="color-white">
                      {values.ingredients.map((value) => value.value).join(" ")}
                    </span>
                  </span>
                  <span></span>
                </div>
                <div>
                  <span className="color-blue">
                    Végétarien :{" "}
                    <span className="color-white">
                      {!values.vegetarian
                        ? ""
                        : values.vegetarian === "true"
                        ? "Oui"
                        : "Non"}
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
