import React from "react";

import styles from "./BlueButton.module.css";

const BlueButton = ({
  text,
  disabled,
  className,
  style,
  onClick,
  type,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BlueButton;
