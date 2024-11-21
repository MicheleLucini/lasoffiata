import React from "react";
import styles from "./Home.module.css";

const HomeAnnuncioPlaceholder = () => {
  return (
    <div className={`${styles.annuncio} ${styles.anteprimaAnnuncio}`}>
      <div className={styles.imageContainer} />
      <span className={styles.title} />
      <span className={styles.place} />
    </div>
  );
};

export default HomeAnnuncioPlaceholder;
