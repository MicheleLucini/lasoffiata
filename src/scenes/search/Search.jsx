import * as apiPublic from "@api/public";
// import Annuncio from "@scenes/annuncio";
import HomeAnnuncio from "../home/HomeAnnuncio";
import HomeAnnuncioPlaceholder from "../home/HomeAnnuncioPlaceholder";
import Icon from "@components/icon";
// import Link from "@components/link";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import styles from "./Search.module.css";
// import { ROUTES } from "@contexts/NavigatorContext";
// import { selectUser } from '@store/userSlice';
// import { useModals } from "@contexts/ModalsContext";
// import { useSelector } from 'react-redux';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [advertisements, setAdvertisements] = useState([]);
  // const [selectedAnnuncio, setSelectedAnnuncio] = useState(null);

  // const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  // const { openModal } = useModals();

  // const userIconLinkRoute = useMemo(() => (
  //   user.isLogged ? ROUTES.MY_ACCOUNT : ROUTES.LOGIN
  // ), [user.isLogged]);

  // const onAnnuncioClick = useCallback((annuncio) => {
  //   openModal({
  //     title: annuncio.description,
  //     children: (
  //       <Annuncio initialAnnuncio={annuncio} />
  //     ),
  //   });
  // }, [openModal]);

  const annunciList = useMemo(() => (
    loading
      ? [...Array(20)].map((_, i) => (
        <HomeAnnuncioPlaceholder
          key={i}
        />
      ))
      : advertisements.map((x) => (
        <HomeAnnuncio
          key={x.id}
          annuncio={x}
        // onAnnuncioClick={onAnnuncioClick}
        />
      ))
  ), [loading, advertisements]);

  // const loadAdvertisements = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const data = await apiPublic.GetFeaturedAdvertisements();
  //     setAdvertisements(data);
  //   } catch {
  //     setAdvertisements([]);
  //   }
  //   setLoading(false);
  // }, []);

  const searchAdvertisements = useCallback(async (q) => {
    setLoading(true);
    try {
      const data = await apiPublic.SearchAdvertisements({
        searchText: q,
        categoryId: 0,
        province: "",
        page: 1,
      });
      setAdvertisements(data);
    } catch {
      setAdvertisements([]);
    }
    setLoading(false);
  }, []);

  const onSearchInputChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  // const onSearchInputKeyPress = useCallback((e) => {
  //   if (!e) e = window.event;
  //   var keyCode = e.code || e.key;
  //   if (keyCode === "Enter") {
  //     // setSearchActive(true);
  //     return false;
  //   }
  // }, []);

  useEffect(() => {
    if (searchInput) {
      const debounced = setTimeout(() => {
        searchAdvertisements(searchInput);
      }, 500);
      return () => clearTimeout(debounced);
    } else {
      setAdvertisements([]);
    }
  }, [searchAdvertisements, searchInput]);

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
          // onKeyPress={onSearchInputKeyPress}
          placeholder='Cerca su La Soffiata'
          value={searchInput}
          autoFocus
        />
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Risultati ricerca</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.wrapperAnnunci}>
            {annunciList}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
