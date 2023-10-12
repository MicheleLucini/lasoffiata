import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

const Card = ({ children}) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
};

export default Card;
