import styles from "./SelectField.module.css";
import { useField } from "formik";

import React from "react";
import Select, { Option } from "react-select";

const SelectField = (props) => {
  console.log(props.options);
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
    />
  );
};

export default SelectField;
