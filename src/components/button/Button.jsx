import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Icon from '../icon';
import styles from "./Button.module.css";

const Button = ({ type, text, icon, onClick, disabled, className, size }) => {
  const buttonClassName = useMemo(() => (
    [
      styles.button,
      styles[type],
      disabled ? styles.disabled : null,
      !text ? styles.iconOnly : null,
      size,
      className,
    ].filter((x) => !!x).join(" ")
  ), [type, disabled, text, size, className]);

  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      {icon && (
        <Icon
          name={icon}
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
        />
      )}
      {text && text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["elevated", "filled", "filled tonal", "outlined", "text"]),
  text: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "filled",
  text: null,
  icon: null,
  size: null,
  onClick: () => { },
  disabled: false,
  className: null,
};

export default Button;
