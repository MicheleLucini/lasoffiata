import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '@store/userSlice';
import { ROUTES } from "@contexts/NavigatorContext";
import { useModals } from "@contexts/ModalsContext";
import Icon from "@components/icon";
import Link from "@components/link";
import * as apiPublic from "@api/public";
import Annuncio from "@scenes/annuncio";
import HomeAnnuncio from "./HomeAnnuncio";
import HomeAnnuncioPlaceholder from "./HomeAnnuncioPlaceholder";
import styles from "./Home.module.css";

const Home = () => {
  const [featuredAdvertisements, setFeaturedAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  // const [selectedAnnuncio, setSelectedAnnuncio] = useState(null);

  const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  const { openModal } = useModals();

  // const userIconLinkRoute = useMemo(() => (
  //   user.isLogged ? ROUTES.MY_ACCOUNT : ROUTES.LOGIN
  // ), [user.isLogged]);

  const onAnnuncioClick = useCallback((annuncio) => {
    openModal({
      title: annuncio.description,
      children: (
        <Annuncio initialAnnuncio={annuncio} />
      ),
    });
  }, [openModal]);

  const featuredAnnunciList = useMemo(() => (
    loading
      ? [...Array(20)].map((_, i) => (
        <HomeAnnuncioPlaceholder
          key={i}
        />
      ))
      : featuredAdvertisements.map((x) => (
        <HomeAnnuncio
          key={x.id}
          annuncio={x}
          onAnnuncioClick={onAnnuncioClick}
        />
      ))
  ), [loading, featuredAdvertisements, onAnnuncioClick]);

  const loadFeaturedAdvertisements = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiPublic.GetFeaturedAdvertisements();
      setFeaturedAdvertisements(data);
    } catch {
      setFeaturedAdvertisements([]);
    }
    setLoading(false);
  }, []);

  // const searchAdvertisements = useCallback(async ({ description, category, province }) => {
  //   setLoadingSearchedAdvertisements(true);
  //   try {
  //     const data = await apiPublic.SearchAdvertisements({
  //       description,
  //       categoryId: category,
  //       province,
  //       page: 1,
  //     });
  //     setFeaturedAdvertisements(data);
  //   } catch {
  //     setFeaturedAdvertisements([]);
  //   }
  //   setLoadingSearchedAdvertisements(false);
  // }, []);

  const onSearchInputChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const onSearchInputKeyPress = useCallback((e) => {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode === "Enter") {
      // setSearchActive(true);
      return false;
    }
  }, []);

  useEffect(() => {
    loadFeaturedAdvertisements();
  }, [loadFeaturedAdvertisements]);

  return (
    <>
      <div className={styles.searchWrapper}>
        <Icon
          name="search"
          className={styles.searchIcon}
          size={22}
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
        />
        <input
          className={styles.searchInput}
          onChange={onSearchInputChange}
          onKeyPress={onSearchInputKeyPress}
          placeholder='Cerca su La Soffiata'
          value={searchInput}
        />
      </div>
      {user.hasAdvertisements && (
      <div className={styles.links}>
        <div>
          <Link route={ROUTES.I_MIEI_ANNUNCI}>
            <span>I miei annunci</span>
          </Link>
          {/* <Link route={userIconLinkRoute}>
            <Icon
              name="person"
              fill={user.isLogged ? 1 : 0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
          </Link>
          <Link route={ROUTES.HOME}>
            <span>Gratis</span>
          </Link>
          {user.isLogged && (
            <>
              <Link route={ROUTES.HOME}>
                <span>Messaggi</span>
              </Link>
              <Link route={ROUTES.CREA_ANNUNCIO}>
                <span>Vendi</span>
              </Link>
            </>
          )}
          <Link route={ROUTES.HOME}>
            <span>Categorie</span>
          </Link> */}
        </div>
      </div>
      )}
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Consigliato oggi</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.wrapperAnnunci}>
            {featuredAnnunciList}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
