import React from "react";
import PropTypes from "prop-types";
import Icon from "../icon";
import styles from "./InlineAlert.module.css";

const ICON_BY_TYPE = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
}

const InlineAlert = ({ type, text }) => {
  if (!text) return null;

  return (
    <div className={`${styles.inlineAlert} ${styles[type]}`}>
      <Icon
        name={ICON_BY_TYPE[type]}
        fill={0}
        weight={400}
        grade={0}
        opticalSize={24}
      />
      <span className={styles.text}>
        {text}
      </span>
    </div>
  );
};

InlineAlert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
  text: PropTypes.string,
};

InlineAlert.defaultProps = {
  text: null,
};

export default InlineAlert;
