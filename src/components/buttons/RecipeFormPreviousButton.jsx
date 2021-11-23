import React, { useEffect } from "react";

import BlueButton from "./BlueButton";

const RecipeFormPreviousButton = ({
  formRef,
  scrollPosition,
  setScrollPosition,
}) => {
  useEffect(() => {
    formRef.current.style.transform = `translateX(${scrollPosition}%)`;
  }, [scrollPosition, formRef]);

  return (
    <BlueButton
      type="button"
      style={{ marginBottom: "2rem", maxWidth: "150px" }}
      onClick={() => {
        setScrollPosition((position) => position + 100);
      }}
    >
      Précédent
    </BlueButton>
  );
};

export default RecipeFormPreviousButton;
