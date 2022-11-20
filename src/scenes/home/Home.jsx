import React, { useState, useCallback, useEffect } from "react";
import Annuncio from "@components/annuncio";
import * as userApi from "@api/user";
import HomeSearch from './HomeSearch';
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
    <>
      <HomeSearch />
      <span>Benvenuto! Eccoti gli annunci</span>
      <div className={styles.wrapperAnnunci}>
        {annunci.map((x) => <Annuncio key={x.id} annuncio={x} />)}
      </div>
    </>
  );
};

export default Home;
