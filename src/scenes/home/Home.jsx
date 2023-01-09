import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Button from "@components/button";
import * as apiPublic from "@api/public";
import HomeSearch from './HomeSearch';
import Annuncio from "./HomeAnnuncio";
import AnnuncioPlaceholder from "./HomeAnnuncioPlaceholder";
import styles from "./Home.module.css";

const Home = () => {
  const { navigate } = useNavigator();
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const placeholderAnnunciList = useMemo(() => (
    [...Array(20)].map((_, i) => <AnnuncioPlaceholder key={i} />)
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

  const searchAdvertisements = useCallback(async ({ description, category, province }) => {
    setLoading(true);
    try {
      const data = await apiPublic.SearchAdvertisements({
        description,
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
        <Button
          text="Crea annuncio"
          icon="add"
          onClick={() => navigate(ROUTES.CREA_ANNUNCIO)}
        />
        <Button
          text="I miei annunci"
          icon="list"
          onClick={() => navigate(ROUTES.I_MIEI_ANNUNCI)}
        />
        <Button
          text="Checkout"
          icon="shopping_cart_checkout"
          onClick={() => navigate(ROUTES.CHECKOUT)}
        />
      </div>
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
