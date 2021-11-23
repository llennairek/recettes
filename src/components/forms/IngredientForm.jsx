import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axios from "axios";

import styles from "./IngredientForm.module.css";

import BlueButton from "../buttons/BlueButton";
import RecipeFormNextButton from "../buttons/RecipeFormNextButton";
import RecipeFormPreviousButton from "../buttons/RecipeFormPreviousButton";
import SelectField from "./fields/SelectField";

import IngredientSchema from "../../utils/validationSchemas/ingredientSchema";
import { getIngredients } from "../../lib/front/get";

const IngredientForm = ({ mutate }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState([]);

  const formRef = useRef();

  const handleAddRecipe = async () => setShowRecipeForm((value) => !value);

  const radioOptions = [
    {
      name: "Fruit",
      type: "fruit",
    },
    {
      name: "Légume",
      type: "legume",
    },
    {
      name: "Viande",
      type: "viande",
    },
    {
      name: "Poission",
      type: "poisson",
    },
    {
      name: "Oeuf",
      type: "Oeuf",
    },
    {
      name: "Produit laitier",
      type: "produit-laitier",
    },
    {
      name: "Féculent",
      type: "feculent",
    },
    {
      name: "Matière grasse",
      type: "matiere-grasse",
    },
    {
      name: "Autre",
      type: "autre",
    },
  ];

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const options = await getIngredients();
  //       const optionsformated = options.map((option) => ({
  //         value: option.name,
  //         label: option.name,
  //       }));
  //       setOptions(optionsformated);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <BlueButton
          onClick={handleAddRecipe}
          style={showRecipeForm ? { maxWidth: "50px" } : { maxWidth: "200px" }}
        >
          <span>{showRecipeForm ? "X" : "Ajouter un ingrédient"}</span>
        </BlueButton>
      </div>
      <div className={styles.container}>
        <div className={styles.error}>{errorMessage}</div>
        <Formik
          initialValues={{
            name: "",
            type: "",
          }}
          validationSchema={IngredientSchema}
          onSubmit={async (values, { resetForm }) => {
            setErrorMessage("");
            axios
              .post("http://localhost:3000/api/ingredients", values)
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
                style={{ maxHeight: showRecipeForm ? "500px" : "0px" }}
              >
                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="name">
                    Nom
                  </label>
                  <ErrorMessage
                    name="name"
                    render={(msg) => <div className={styles.error}>{msg}</div>}
                  />
                  <Field
                    type="text"
                    name="name"
                    className={styles.input}
                    placeholder="Nom de l'ingrédient"
                  />
                  <div className={styles.buttonsWrapper}>
                    <RecipeFormNextButton
                      onClick={() => validateField("name")}
                      formRef={formRef}
                      scrollPosition={scrollPosition}
                      setScrollPosition={setScrollPosition}
                      isSubmitting={isSubmitting}
                      isValidating={isValidating}
                      error={errors.name}
                      value={values.name}
                    />
                  </div>
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.label} htmlFor="type">
                    Catégorie de l&apos;ingrédient
                  </label>
                  <ErrorMessage
                    name="type"
                    render={(msg) => <div className={styles.error}>{msg}</div>}
                  />
                  <div
                    className={styles.radioWrapper}
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <label>
                      <Field type="radio" name="type" value="fruit" />
                      Fruit
                    </label>
                    <label>
                      <Field type="radio" name="type" value="legume" />
                      Légume
                    </label>
                    <label>
                      <Field type="radio" name="type" value="viande" />
                      Viande
                    </label>
                    <label>
                      <Field type="radio" name="type" value="poisson" />
                      Poisson
                    </label>
                    <label>
                      <Field type="radio" name="type" value="oeuf" />
                      Oeuf
                    </label>
                    <label>
                      <Field type="radio" name="type" value="produit-laitier" />
                      Produit laitier
                    </label>
                    <label>
                      <Field type="radio" name="type" value="feculent" />
                      Féculent
                    </label>
                    <label>
                      <Field type="radio" name="type" value="matiere-grasse" />
                      Matière grasse
                    </label>
                    <label>
                      <Field type="radio" name="type" value="autre" />
                      Autre
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
                      error={errors.type}
                      value={true}
                    />
                  </div>
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

                <div className={styles.fieldWrapper}>
                  <div
                    className={styles.recipePreview}
                    style={{ maxHeight: showRecipeForm ? "400px" : "0px" }}
                  >
                    <div>
                      <span className="color-blue">
                        Nom : <span className="color-white">{values.name}</span>
                      </span>
                    </div>
                    <div>
                      <span className="color-blue">
                        Type :{" "}
                        <span className="color-white">
                          {radioOptions.find(
                            (option) => option.type === values.type
                          )
                            ? radioOptions.find(
                                (option) => option.type === values.type
                              )["name"]
                            : null}
                        </span>
                      </span>
                    </div>
                  </div>
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
                        errors.name ||
                        !values.name ||
                        errors.type
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

export default IngredientForm;
