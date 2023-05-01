import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useSelector } from 'react-redux';
import { selectUser } from '@store/userSlice';
import Button from "@components/button";
import Icon from "@components/icon";
import Link from "@components/link";
import * as apiPublic from "@api/public";
import HomeSearch from './HomeSearch';
import Annuncio from "./HomeAnnuncio";
import AnnuncioPlaceholder from "./HomeAnnuncioPlaceholder";
import styles from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const user = useSelector(selectUser);
  const { navigate } = useNavigator();

  const userIconLinkRoute = useMemo(() => (
    user.isLogged ? ROUTES.PERSONALINFO : ROUTES.LOGIN
  ), [user.isLogged]);

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
      <div className={styles.links}>
        <Link route={userIconLinkRoute}>
          <Icon
            name="person"
            fill={user.isLogged ? 1 : 0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
        </Link>
        <Link route={ROUTES.CREA_ANNUNCIO}>
          <span>Vendi</span>
        </Link>
      </div>
      <HomeSearch
        loading={loading}
        onSearch={searchAdvertisements}
      />
      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
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
      </div> */}
      <div className={styles.wrapperAnnunci}>
        <span>Consigliato oggi</span>
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
