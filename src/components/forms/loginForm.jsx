import React, { useState } from "react";
import { login } from "../../lib/front/login";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./loginForm.module.css";
import { useRouter } from "next/router";

import loginSchema from "../../utils/validationSchemas/loginSchema";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { resetForm }) => {
          setErrorMessage("");
          const { email, password } = values;
          const user = await login({ email, password });
          if (!user) {
            return setErrorMessage("Erreur de mail ou de mot de passe");
          }
          resetForm();
          router.replace("/");
        }}
      >
        {({ isSubmitting, isValidating, errors, values }) => (
          <Form className={styles.form}>
            <div className={styles.error}>{errorMessage}</div>
            <Field type="email" name="email" className={styles.input} />
            <ErrorMessage
              name="email"
              render={(msg) => <div className={styles.error}>{msg}</div>}
            />
            <Field type="password" name="password" className={styles.input} />
            <ErrorMessage
              name="password"
              render={(msg) => <div className={styles.error}>{msg}</div>}
            />
            <button
              type="submit"
              disabled={isSubmitting || isValidating}
              className={styles.submit}
            >
              Submit
            </button>
            <div>{JSON.stringify(errors)}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
