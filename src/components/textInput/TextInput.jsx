import React, { useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./TextInput.module.css";

const TextInput = ({
  label,
  value,
  setValue,
  placeholder,
  disabled,
  onKeyPressEnter,
  type,
}) => {
  const [isActive, setIsActive] = useState(false);

  const wrapperClassName = useMemo(() => (
    [
      styles.textInput,
      isActive ? styles.active : null,
      !!value ? styles.filled : null,
      disabled ? styles.disabled : null,
    ].filter((x) => !!x).join(" ")
  ), [isActive, value, disabled]);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, [setValue]);

  const onFocus = useCallback(() => {
    setIsActive(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsActive(false);
  }, []);

  const onKeyPress = useCallback((e) => {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode === "Enter" && onKeyPressEnter) {
      onKeyPressEnter();
      return false;
    }
  }, [onKeyPressEnter]);

  return (
    <div className={wrapperClassName}    >
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        // validate={validate}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        required="required"
        onKeyPress={onKeyPress}
        disabled={disabled ? "disabled" : false}
      />
      {/* <p>// place for errors</p> */}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  // validate: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onKeyPressEnter: PropTypes.func,
  type: PropTypes.string,
};

TextInput.defaultProps = {
  label: null,
  value: null,
  // validate: () => {},
  placeholder: null,
  disabled: false,
  onKeyPressEnter: null,
  type: "text",
};

export default TextInput;
