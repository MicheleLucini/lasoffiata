import React from "react";
import Icon from "@components/icon";
import styles from "./Home.module.css";

const HomeAnnuncioPlaceholder = () => {
  return (
    <div className={`${styles.annuncio} ${styles.anteprimaAnnuncio}`}>
      <div className={styles.imageContainer}>
        <Icon
          className={styles.imagePlaceholderIcon}
          name={"inventory_2"}
          size={48}
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
          size={20}
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
          className={styles.addIcon}
        />
        <Icon
          name="location_on"
          size={14}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span className={styles.description} />
        <Icon
          name="calendar_month"
          size={14}
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

export default HomeAnnuncioPlaceholder;
