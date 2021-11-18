import Head from "next/head";

import Home from "../src/components/home/Home";

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
