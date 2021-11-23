import styles from "./SelectField.module.css";
import { useField } from "formik";

import React from "react";
import Select, { Option } from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "var(--background)",
    // borderBottom: "1px solid var(--background)",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  }),
  control: (provided) => ({
    ...provided,
    width: "95%",
    margin: "0 auto",
  }),
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition };
  // }
};

const SelectField = (props) => {
  const [field, state, { setValue, setTouched }] = useField(props.field?.name);
  const onChange = (value) => {
    setValue(value);
  };
  return (
    <Select
      className={styles.select}
      isMulti={props.isMulti}
      options={props.options}
      name={field?.name}
      value={state?.value}
      onChange={onChange}
      onBlur={setTouched}
      menuPortalTarget={document.querySelector("main")}
      styles={customStyles}
      placeholder="Choisissez vos ingrédients"
    />
  );
};

export default SelectField;
