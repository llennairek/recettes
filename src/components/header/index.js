import React from "react";
import Link from "next/link";

import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.container}>
      <nav>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/login">
          <a className={styles.link}>Login</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
