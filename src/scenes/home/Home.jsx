import React, { useState, useCallback, useEffect } from "react";
import Annuncio from "@components/annuncio";
import Icon from "@components/icon";
import * as userApi from "@api/user";
import styles from "./Home.module.css";

const Home = () => {
  const [annunci, setAnnunci] = useState([]);

  const loadAnnunci = useCallback(async () => {
    const data = await userApi.GetFeaturedAdvertisements();
    setAnnunci(data);
  }, [setAnnunci])

  useEffect(() => {
    loadAnnunci();
  }, [loadAnnunci]);

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
      <span>Benvenuto! Eccoti gli annunci</span>
      <div className={styles.wrapperAnnunci}>
        {annunci.map((x) => <Annuncio key={x.id} annuncio={x} />)}
      </div>
    </div>
  );
};

export default Home;
