import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Icon from '../icon';
import styles from "./Button.module.css";

const Button = ({
  className,
  color,
  disabled,
  fillIcon,
  fullWidth,
  icon,
  onClick,
  size,
  text,
  type,
}) => {
  const buttonClassName = useMemo(() => (
    [
      styles.button,
      styles[type],
      styles[color],
      disabled ? styles.disabled : null,
      !text ? styles.iconOnly : null,
      size === "mini" ? styles.mini : null,
      fullWidth ? styles.fullWidth : null,
      className,
    ].filter((x) => !!x).join(" ")
  ), [type, color, disabled, text, size, fullWidth, className]);

  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      {icon && (
        <Icon
          fill={fillIcon ? 1 : 0}
          grade={0}
          name={icon}
          opticalSize={24}
          weight={400}
        />
      )}
      {text && text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  disabled: PropTypes.bool,
  fillIcon: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["mini"]),
  text: PropTypes.string,
  type: PropTypes.oneOf(["filled"]),
};

Button.defaultProps = {
  className: null,
  color: "secondary",
  disabled: false,
  fillIcon: false,
  fullWidth: false,
  icon: null,
  onClick: () => { },
  size: null,
  text: null,
  type: "filled",
};

export default Button;
