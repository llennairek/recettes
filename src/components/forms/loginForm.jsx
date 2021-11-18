import React, { useState, useRef } from "react";
import { login } from "../../lib/front/login";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";

import styles from "./loginForm.module.css";

import BlueButton from "../buttons/BlueButton";

import loginSchema from "../../utils/validationSchemas/loginSchema";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerLeaveAnimation, setTriggerLeaveAnimation] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${styles.container} ${triggerLeaveAnimation && styles.leave}`}
    >
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
          setTriggerLeaveAnimation(true);
          router.pathname === "/" ? router.reload() : router.push("/");
        }}
      >
        {({ isSubmitting, isValidating, errors, values }) => (
          <Form className={styles.form}>
            <div className={styles.error}>{errorMessage}</div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className={styles.input} />
            <ErrorMessage
              name="email"
              render={(msg) => <div className={styles.error}>{msg}</div>}
            />
            <label htmlFor="password">Mot de passe</label>
            <Field type="password" name="password" className={styles.input} />
            <ErrorMessage
              name="password"
              render={(msg) => <div className={styles.error}> {msg}</div>}
            />
            <BlueButton
              type="submit"
              text="Se connecter"
              disabled={
                isSubmitting ||
                isValidating ||
                !values.email ||
                !values.password ||
                errors.email ||
                errors.password
              }
            >
              Se connecter
            </BlueButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
