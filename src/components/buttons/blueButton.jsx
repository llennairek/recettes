import React from "react";

import styles from "./blueButton.module.css";

const BlueButton = ({ text, disabled, className, style, onClick, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BlueButton;
