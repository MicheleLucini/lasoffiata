import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Icon from '../icon';
import styles from "./Button.module.css";

const Button = ({ text, icon, onClick, disabled, className, size }) => {
  const buttonClassName = useMemo(() => (
    [
      styles.button,
      disabled ? styles.disabled : null,
      !text ? styles.iconOnly : null,
      size,
      className,
    ].filter((x) => !!x).join(" ")
  ), [disabled, text, size, className]);

  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      {icon && <Icon name={icon} />}
      {text && text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  text: null,
  icon: null,
  size: null,
  onClick: () => { },
  disabled: false,
  className: null,
};

export default Button;
