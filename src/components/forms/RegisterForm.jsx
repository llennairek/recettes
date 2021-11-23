import React, { useState, useRef } from "react";
import { register } from "../../lib/front/register";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./RegisterForm.module.css";

import BlueButton from "../buttons/BlueButton";

import RegisterSchema from "../../utils/validationSchemas/registerSchema";

const LoginForm = ({ setShowRegisterForm }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerLeaveAnimation, setTriggerLeaveAnimation] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${styles.container} ${triggerLeaveAnimation && styles.leave}`}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { resetForm }) => {
          setErrorMessage("");
          const { name, email, password } = values;
          const user = await register({ name, email, password });
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

            <label className={styles.label} htmlFor="name">
              Nom
            </label>
            <ErrorMessage
              name="name"
              render={(msg) => <div className={styles.error}>{msg}</div>}
            />
            <Field type="text" name="name" className={styles.input} />

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
              S&apos;inscrire
            </BlueButton>

            <div className={styles.registerText}>
              <div>
                T&apos;es perdu ? tu voulais juste <span> te connecter ?</span>
              </div>
              <div>
                Allez je suis sympa, je t&apos;aide , c&apos;est juste là !{" "}
                <span
                  className={styles.registerLink}
                  onClick={() => {
                    setShowRegisterForm(false);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
