import React, { useEffect } from "react";
import Icon from "@components/icon";
// import * as userApi from "../../api/user";
import styles from "./Home.module.css";

const Home = () => {
  // useEffect(() => {
  //   userApi.GetFeaturedAdvertisements();
  // }, []);

  return (
    <div className={styles.home}>
      <div className={styles.searchFormWrapper}>
        <div className={styles.header}>
          <Icon
            name="search"
            className={styles.icon}
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span className={styles.title}>Cosa stai cercando?</span>
        </div>
      </div>
      <span>Benvenuto nella home del sito!</span>
    </div>
  );
};

export default Home;
