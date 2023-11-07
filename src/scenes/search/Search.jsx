import * as apiPublic from "@api/public";
import HomeAnnuncio from "../home/HomeAnnuncio";
import HomeAnnuncioPlaceholder from "../home/HomeAnnuncioPlaceholder";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import SearchInput from "@components/searchInput";
import SelectCategory from "@templates/selectCategory";
import SelectProvince from "@templates/selectProvince";
import styles from "./Search.module.css";
import { useCategories } from "@contexts/CategoriesContext";
// import Annuncio from "@scenes/annuncio";
// import Icon from "@components/icon";
// import Link from "@components/link";
// import { ROUTES } from "@contexts/NavigatorContext";
// import { selectUser } from '@store/userSlice';
// import { useModals } from "@contexts/ModalsContext";
// import { useSelector } from 'react-redux';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState(0);
  const [filterProvince, setFilterProvince] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);
  // const [selectedAnnuncio, setSelectedAnnuncio] = useState(null);

  const { categories } = useCategories();
  // const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  // const { openModal } = useModals();

  // const userIconLinkRoute = useMemo(() => (
  //   user.isLogged ? ROUTES.MY_ACCOUNT : ROUTES.LOGIN
  // ), [user.isLogged]);

  const showCategoriesList = useMemo(() => (
    !loading && advertisements.length === 0 && !filterText && !filterCategoryId
  ), [advertisements.length, loading, filterText, filterCategoryId]);

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

  const searchAdvertisements = useCallback(async (q, cId, p) => {
    setLoading(true);
    try {
      const data = await apiPublic.SearchAdvertisements({
        searchText: q,
        categoryId: cId,
        province: p,
        page: 1,
      });
      setAdvertisements(data);
    } catch {
      setAdvertisements([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (filterText || filterCategoryId) {
      setLoading(true);
      const debounced = setTimeout(() => {
        searchAdvertisements(filterText, filterCategoryId, filterProvince);
      }, 500);
      return () => clearTimeout(debounced);
    } else {
      setAdvertisements([]);
      setLoading(false);
    }
  }, [searchAdvertisements, filterText, filterCategoryId, filterProvince]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <SearchInput value={filterText} setValue={setFilterText} autoFocus />
        </div>
      </div>
      {showCategoriesList ? (
        <>
          <br></br>
          <div className='row'>
            <div className='col'>
              <span className='page-title'>Categorie</span>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className={styles.wrapperCategorie}>
                {categories.map((category) => (
                  <div key={category.id} onClick={() => setFilterCategoryId(category.id)} >{category.name}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='row'>
            <div className='col'>
              <SelectCategory
                value={filterCategoryId}
                setValue={setFilterCategoryId}
                disabled={loading}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <SelectProvince
                label="Provincia"
                value={filterProvince}
                setValue={setFilterProvince}
                disabled={loading}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <span className='page-title'>Risultati ricerca</span>
            </div>
          </div>
          <div className='row'>
            {annunciList.length === 0 ? (
              <div className='col col-flex-center'>
                <span style={{ marginTop: 20 }}>Nessun annuncio trovato</span>
              </div>
            ) : (
              <div className='col'>
                <div className={styles.wrapperAnnunci}>
                  {annunciList}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Search;
