import React, { useEffect } from "react";

import BlueButton from "./BlueButton";

const RecipeFormPreviousButton = ({
  formRef,
  scrollPosition,
  setScrollPosition,
}) => {
  const translate = formRef.current?.style.transform;
  console.log(formRef);
  console.log(translate);

  useEffect(() => {
    formRef.current.style.transform = `translateX(${scrollPosition}%)`;
  }, [scrollPosition]);

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
