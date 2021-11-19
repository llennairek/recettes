import React, { useState, useRef } from "react";
import { login } from "../../lib/front/login";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./LoginForm.module.css";

import BlueButton from "../buttons/BlueButton";
import RegisterForm from "./RegisterForm";

import LoginSchema from "../../utils/validationSchemas/loginSchema";

const LoginForm = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerLeaveAnimation, setTriggerLeaveAnimation] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${styles.container} ${triggerLeaveAnimation && styles.leave}`}
    >
      {showRegisterForm ? (
        <RegisterForm setShowRegisterForm={setShowRegisterForm} />
      ) : (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
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
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <ErrorMessage
                name="email"
                render={(msg) => <div className={styles.error}>{msg}</div>}
              />
              <Field type="email" name="email" className={styles.input} />

              <label className={styles.label} htmlFor="password">
                Mot de passe
              </label>
              <ErrorMessage
                name="password"
                render={(msg) => <div className={styles.error}> {msg}</div>}
              />
              <Field type="password" name="password" className={styles.input} />

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

              <div className={styles.registerText}>
                <div>
                  Tu n'as pas encore de compte ? <span>Sérieux ???!!??</span>
                </div>
                <div>
                  Viens là ! Dépêche toi!{" "}
                  <span
                    className={styles.registerLink}
                    onClick={() => {
                      setShowRegisterForm(true);
                    }}
                  >
                    Inscris-toi
                  </span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default LoginForm;
