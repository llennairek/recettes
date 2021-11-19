import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © Made by
      <a
        href="http://github.com//lennairek"
        target="_blank"
        rel="noopener noreferrer"
      >
        Fabrice
      </a>
    </footer>
  );
};

export default Footer;
