import React, { useState } from "react";
import { login } from "../src/lib/front/login";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./login.module.css";
import { set } from "mongoose";
import { useRouter } from "next/router";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  return (
    <div>
      <h1>Login page</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          setErrorMessage("");
          const { email, password } = values;
          const user = await login({ email, password });
          if (!user) {
            return setErrorMessage("Erreur dans le mail ou le mot de passe");
          }
          resetForm();
          router.replace("/");
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className={styles.error}>{errorMessage}</div>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              render={(msg) => <div className={styles.error}>{msg}</div>}
            />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <div>{JSON.stringify(errors)}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
