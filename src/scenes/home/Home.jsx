// import Annuncio from "@scenes/annuncio";
// import AnnuncioPreviewPlaceholder from '@templates/annunci/AnnuncioPreviewPlaceholder';
// import HomeAnnuncio from "./HomeAnnuncio";
// import HomeAnnuncioPlaceholder from "./HomeAnnuncioPlaceholder";
// import { useModals } from "@contexts/ModalsContext";
import * as apiPublic from "@api/public";
import AnnuncioPreview from '@templates/annunci/AnnuncioPreview';
import Link from "@components/link";
import Pubblicita from '@templates/pubblicita/Pubblicita';
import React, { useState, useMemo, useCallback, useEffect } from "react";
import SearchInput from "@components/searchInput";
import styles from "./Home.module.css";
import { ROUTES } from "@contexts/NavigatorContext";
import { selectUser } from '@store/userSlice';
import { useNavigator } from "@contexts/NavigatorContext";
import { useSelector } from 'react-redux';
import { useSnackbars } from "@contexts/SnackbarsContext";

const Home = () => {
  const user = useSelector(selectUser);
  const { navigate } = useNavigator();
  const { openSnackbar } = useSnackbars();

  const [featuredAdvertisements, setFeaturedAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  const featuredAnnunciList = useMemo(() => (
    loading
      ? [...Array(20)].map((_, i) => (
        // <HomeAnnuncioPlaceholder key={i} />
        <AnnuncioPreview key={i} loading />
      ))
      : [
        ...featuredAdvertisements.map((x, i) => (
          <>
            {i % 2 === 0 && <Pubblicita />}
            <AnnuncioPreview key={x.id} annuncio={x} />
          </>
        )),
        <Pubblicita />,
      ]
  ), [loading, featuredAdvertisements]);

  const loadFeaturedAdvertisements = useCallback(async () => {
    setLoading(true);
    apiPublic.GetFeaturedAdvertisements()
      .then((data) => setFeaturedAdvertisements(data))
      .catch((e) => {
        openSnackbar("❌ " + e.message);
        setFeaturedAdvertisements([]);
      })
      .finally(() => setLoading(false));
  }, [openSnackbar]);

  useEffect(() => {
    loadFeaturedAdvertisements();
  }, [loadFeaturedAdvertisements]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <SearchInput onClick={() => navigate(ROUTES.SEARCH)} setValue={() => { }} />
        </div>
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
                <Link route={ROUTES.ANNUNCIO_CREA}>
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
