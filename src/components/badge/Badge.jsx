import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Icon from '../icon';
import styles from "./Badge.module.css";

const Badge = ({
  className,
  icon,
  size,
  text,
  type,
}) => {
  const badgeClassName = useMemo(() => (
    [
      styles.badge,
      styles[type],
      size === "mini" ? styles.mini : null,
      className,
    ].filter((x) => !!x).join(" ")
  ), [className, size, type]);

  return (
    <div className={badgeClassName}>
      {icon && (
        <Icon
          fill={0}
          grade={0}
          name={icon}
          opticalSize={24}
          weight={400}
        />
      )}
      {text && text}
    </div>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOf(["mini"]),
  text: PropTypes.string,
  type: PropTypes.oneOf(["success","warning"]),
};

Badge.defaultProps = {
  className: null,
  icon: null,
  size: null,
  text: null,
  type: null,
};

export default Badge;
