import Icon from "../icon";
import PropTypes from "prop-types";
import React, { useMemo, useCallback } from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  // onKeyPressEnter,
  // placeholder,
  disabled,
  label,
  setValue,
  value,
}) => {
  // const [isActive, setIsActive] = useState(false);

  const wrapperClassName = useMemo(() => (
    [
      styles.checkboxWrapper,
      // isActive ? styles.active : null,
      value ? styles.checked : null,
      disabled ? styles.disabled : null,
    ].filter((x) => !!x).join(" ")
  ), [value, disabled]);

  const onChange = useCallback((e) => {
    setValue(e.target.checked);
  }, [setValue]);

  // const onFocus = useCallback(() => {
  //   setIsActive(true);
  // }, []);

  // const onBlur = useCallback(() => {
  //   setIsActive(false);
  // }, []);

  // const onKeyPress = useCallback((e) => {
  //   if (!e) e = window.event;
  //   var keyCode = e.code || e.key;
  //   if (keyCode === "Enter" && onKeyPressEnter) {
  //     onKeyPressEnter();
  //     return false;
  //   }
  // }, [onKeyPressEnter]);

  return (
    <div className={wrapperClassName}>
      <input
        // id={id}
        // onBlur={onBlur}
        // onFocus={onFocus}
        // onKeyPress={onKeyPress}
        // placeholder={placeholder}
        // required="required"
        // validate={validate}
        checked={value}
        disabled={disabled ? "disabled" : false}
        onChange={onChange}
        type="checkbox"
      />
      {value ? (
        <Icon
          fill={0}
          grade={0}
          name="check_box"
          opticalSize={24}
          weight={400}
        />
      ) : (
        <Icon
          fill={0}
          grade={0}
          name="check_box_outline_blank"
          opticalSize={24}
          weight={400}
        />
      )}
      <label>{label}</label>
    </div>
  );
};

Checkbox.propTypes = {
  // onKeyPressEnter: PropTypes.func,
  // placeholder: PropTypes.string,
  // type: PropTypes.string,
  // validate: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.bool,
};

Checkbox.defaultProps = {
  // onKeyPressEnter: null,
  // placeholder: null,
  // type: "text",
  // validate: () => {},
  disabled: false,
  label: null,
  value: false,
};

export default Checkbox;
