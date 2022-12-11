import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '@store/userSlice';
// import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Annuncio, { PlaceholderAnnuncio } from "@components/annuncio";
// import Button from "@components/button";
import * as apiPublic from "@api/public";
import styles from "./IMieiAnnunci.module.css";

const IMieiAnnunci = () => {
  const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const placeholderAnnunciList = useMemo(() => (
    [...Array(20)].map((_, i) => <PlaceholderAnnuncio key={i} />)
  ), []);

  const annunciList = useMemo(() => (
    advertisements.map((x) => <Annuncio key={x.id} annuncio={x} />)
  ), [advertisements]);

  const loadUserAdvertisements = useCallback(async () => {
    setLoading(true);
    let data;
    try {
      data = await apiPublic.GetUserAdvertisements({ userId: user.id });
    } catch {
      data = [];
    }
    setAdvertisements(data);
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    loadUserAdvertisements();
  }, [loadUserAdvertisements]);

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
    </>
  );
};

export default IMieiAnnunci;
