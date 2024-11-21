// import PropTypes from "prop-types";
import React from "react";
import styles from "./pubblicita.module.css";

const Pubblicita = () => {
  return (
    <div className={styles.pubblicita}>
      <img
        src="https://placehold.co/600x200?font=Playfair+Display&text=Template+pubblicità"
        alt="Pubblicità"
      />
    </div >
  );
};

Pubblicita.propTypes = {
};

Pubblicita.defaultProps = {
};

export default Pubblicita;
