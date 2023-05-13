import React, { useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Icon from '../icon';
import styles from "./Select.module.css";

const Select = ({
  label,
  options,
  value,
  setValue,
  placeholder,
  disabled,
  clearable,
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
      {clearable && <option value=""></option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.description}</option>
      ))}
    </>
  ), [options, clearable]);

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
        // required="required"
        disabled={disabled ? "disabled" : false}
      >
        {optionsList}
      </select>
      <Icon
        name="expand_more"
        className={styles.icon}
        fill={0}
        weight={300}
        grade={0}
        opticalSize={24}
      />
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
  clearable: PropTypes.bool,
};

Select.defaultProps = {
  label: null,
  options: [],
  value: null,
  placeholder: null,
  disabled: false,
  clearable: true,
};

export default Select;
