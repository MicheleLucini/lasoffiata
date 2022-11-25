import React, { useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./Select.module.css";

const Select = ({
  label,
  options,
  value,
  setValue,
  placeholder,
  disabled,
}) => {
  const [isActive, setIsActive] = useState(false);

  const wrapperClassName = useMemo(() => (
    [
      styles.select,
      isActive ? styles.active : null,
      !!value ? styles.filled : null,
      disabled ? styles.disabled : null,
    ].filter((x) => !!x).join(" ")
  ), [isActive, value, disabled]);

  const onChange = useCallback((e) => {
    setValue(e.target.value || null);
  }, [setValue]);

  const onFocus = useCallback(() => {
    setIsActive(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsActive(false);
  }, []);

  const optionsList = useMemo(() => (
    <>
      <option value=""></option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.description}</option>
      ))}
    </>
  ), [options]);

  return (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <select
        id={label}
        name={label}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        required="required"
        disabled={disabled ? "disabled" : false}
      >
        {optionsList}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
  })),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  label: null,
  options: [],
  value: null,
  placeholder: null,
  disabled: false,
};

export default Select;
