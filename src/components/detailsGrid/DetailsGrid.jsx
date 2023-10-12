import PropTypes from "prop-types";
import React from "react";
import styles from "./DetailsGrid.module.css";

const DetailsGrid = ({
  labels,
  values,
}) => {
  return (
    <div className={styles.wrapper}>
      {labels.map((x, i) => (
        <React.Fragment key={i}>
          <span>{x}</span>
          <span>{values[i]}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

DetailsGrid.propTypes = {
  labels: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
};

DetailsGrid.defaultProps = {
};

export default DetailsGrid;
