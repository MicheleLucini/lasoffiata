import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Annuncio, { PlaceholderAnnuncio } from "@components/annuncio";
import Button from "@components/button";
import * as apiPublic from "@api/public";
import styles from "./IMieiAnnunci.module.css";

const IMieiAnnunci = () => {
  const { navigate } = useNavigator();
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

  const onCreaAnnuncioClick = useCallback(() => {
    navigate(ROUTES.CREA_ANNUNCIO);
  }, [navigate]);

  useEffect(() => {
    loadFeaturedAdvertisements();
  }, [loadFeaturedAdvertisements]);

  return (
    <>
      <span>I miei annunci</span>
      <div className={styles.wrapperAnnunci}>
        {loading ? (
          placeholderAnnunciList
        ) : (
          annunciList
        )}
      </div>
      <Button
        text="Crea annuncio"
        icon="add"
        onClick={onCreaAnnuncioClick}
      />
    </>
  );
};

export default IMieiAnnunci;
