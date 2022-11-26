import React from "react";
import Icon from "@components/icon";
import styles from "./Annuncio.module.css";

const AnteprimaAnnuncio = () => {
  return (
    <div className={`${styles.annuncio} ${styles.anteprimaAnnuncio}`}>
      <div className={styles.imageContainer}>
        <Icon
          className={styles.imagePlaceholderIcon}
          name={"inventory_2"}
          fill={0}
          weight={400}
          grade={0}
          opticalSize={48}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.title} />
        <Icon
          name="bookmark_add"
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
          className={styles.addIcon}
        />
        <Icon
          name="location_on"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span className={styles.description} />
        <Icon
          name="calendar_month"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span className={styles.description} />
      </div>
    </div>
  );
};

export default AnteprimaAnnuncio;
