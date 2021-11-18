import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Home from "../src/components/home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mon carnet de recettes</title>
        <meta
          name="description"
          content="Bienvenue sur mon carnet de recettes, l'application pour toujours avoir une idée de recette"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />

      {/* <footer className={styles.footer}></footer> */}
    </>
  );
}
