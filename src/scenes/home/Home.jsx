import React, { useState, useMemo, useCallback, useEffect } from "react";
import Annuncio, { PlaceholderAnnuncio } from "@components/annuncio";
import * as apiPublic from "@api/public";
import HomeSearch from './HomeSearch';
import styles from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const placeholderAnnunciList = useMemo(() => (
    [...Array(20)].map((_, i) => <PlaceholderAnnuncio key={i} />)
  ), []);

  const annunciList = useMemo(() => (
    advertisements.map((x) => <Annuncio key={x.id} annuncio={x} />)
  ), [advertisements]);

  const loadFeaturedAdvertisements = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiPublic.GetFeaturedAdvertisements();
      setAdvertisements(data);
    } catch {
      setAdvertisements([]);
    }
    setLoading(false);
  }, [setAdvertisements]);

  const searchAdvertisements = useCallback(async ({ category, province }) => {
    setLoading(true);
    try {
      const data = await apiPublic.SearchAdvertisements({
        description: "",
        categoryId: category,
        province,
        page: 1,
      });
      setAdvertisements(data);
    } catch {
      setAdvertisements([]);
    }
    setLoading(false);
  }, [setAdvertisements]);

  useEffect(() => {
    loadFeaturedAdvertisements();
  }, [loadFeaturedAdvertisements]);

  return (
    <>
      <HomeSearch
        loading={loading}
        onSearch={searchAdvertisements}
      />
      <span>Benvenuto! Eccoti gli annunci</span>
      <div className={styles.wrapperAnnunci}>
        {loading ? (
          placeholderAnnunciList
        ) : (
          annunciList
        )}
      </div>
    </>
  );
};

export default Home;
