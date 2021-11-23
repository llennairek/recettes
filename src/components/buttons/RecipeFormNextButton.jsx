import React, { useEffect } from "react";

import BlueButton from "./BlueButton";

const RecipeFormNextButton = ({
  formRef,
  isSubmitting,
  isValidating,
  error,
  value,
  scrollPosition,
  setScrollPosition,
  onClick,
}) => {
  useEffect(() => {
    formRef.current.style.transform = `translateX(${scrollPosition}%)`;
  }, [formRef, scrollPosition]);

  return (
    <BlueButton
      type="button"
      style={{ marginBottom: "2rem", maxWidth: "150px" }}
      onClick={() => {
        onClick && onClick();
        setScrollPosition((position) => position - 100);
      }}
      disabled={
        isSubmitting || isValidating || error || !value ? !value : false
      }
    >
      Suivant
    </BlueButton>
  );
};

export default RecipeFormNextButton;
