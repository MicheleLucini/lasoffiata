import React, { useState, useCallback, useEffect } from "react";
// import * as userApi from "@api/user";
import styles from "./Annuncio.module.css";

const Annuncio = () => {
  const [annuncio, setAnnuncio] = useState(null);

  const loadAnnuncio = useCallback(async () => {
    // const data = await userApi.GetFeaturedAdvertisements();
    // setAnnunci(data);
  }, [setAnnuncio])

  useEffect(() => {
    loadAnnuncio();
  }, [loadAnnuncio]);

  return (
    <div className={styles.annuncio}>
      <span>Annuncio</span>
    </div>
  );
};

export default Annuncio;
