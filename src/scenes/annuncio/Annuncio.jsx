import * as apiPublic from "@api/public";
import Button from "@components/button";
import Card from '@components/card';
import DetailsGrid from '@components/detailsGrid';
import PropTypes from "prop-types";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import moment from 'moment';
import styles from "./Annuncio.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { getAdvertisementImageUrl } from "@logic/annuncio"
import { selectUser } from '@store/userSlice';
import { useCategories } from "@contexts/CategoriesContext";
import { useSelector } from 'react-redux';

const Annuncio = ({ initialAnnuncio }) => {
  const [annuncio, setAnnuncio] = useState(initialAnnuncio);
  const [indiceImmagineCorrente, setIndiceImmagineCorrente] = useState(0);

  const user = useSelector(selectUser);
  const { navigate, currentRoute, changePageTitle } = useNavigator();
  const { getCategoryDescriptionById } = useCategories();

  const isMyAnnuncio = useMemo(() => (
    annuncio?.user.id === user?.id
  ), [annuncio, user?.id]);

  const loadAnnuncio = useCallback(async () => {
    const advertisementIdFromParams = currentRoute.params ? currentRoute.params[0] : null;
    const data = await apiPublic.GetAdvertisement({
      advertisementId: advertisementIdFromParams || initialAnnuncio?.id
    });
    setAnnuncio(data);
    changePageTitle(data.title);
  }, [changePageTitle, currentRoute.params, initialAnnuncio?.id])

  const shareAnnuncio = useCallback(() => {
    navigator.share({
      title: document.title + " | La Soffiata",
      text: annuncio.description,
      url: window.location.href,
    });
  }, [annuncio])

  const foregroundImageSrc = useMemo(() => (
    getAdvertisementImageUrl({
      userId: annuncio?.userId,
      advertisementId: annuncio?.id,
      imageId: annuncio?.images[indiceImmagineCorrente]?.id,
    })
  ), [annuncio, indiceImmagineCorrente]);

  const imagesCarousel = useMemo(() => {
    return annuncio?.images.map((x, i) => {
      const src = getAdvertisementImageUrl({
        userId: annuncio.userId,
        advertisementId: annuncio.id,
        imageId: annuncio.images[i].id,
      });

      return (
        <img
          key={x.id}
          src={src}
          alt={`Anteprima immagine annuncio numero ${i + 1}`}
          className={styles.anteprimaImmagine + (i === indiceImmagineCorrente ? " " + styles.active : "")}
          onClick={() => setIndiceImmagineCorrente(i)}
        />
      );
    });
  }, [annuncio, indiceImmagineCorrente]);

  useEffect(() => {
    loadAnnuncio();
  }, [loadAnnuncio]);

  if (!annuncio) {
    return null;
  }

  return (
    <>
      {annuncio.images && annuncio.images.length > 0 && (
        <div className={styles.wrapperImmagini}>
          <div className={styles.immagineBGBlur}>
            <img
              src={foregroundImageSrc}
              alt={`Immagine annuncio ${annuncio.title} bg`}
              className={styles.immagineBG}
            />
          </div>
          <img
            src={foregroundImageSrc}
            alt={`Immagine annuncio ${annuncio.title}`}
            className={styles.immagineCorrente}
          />
          <div className={styles.caroselloImmagini}>
            {imagesCarousel}
          </div>
        </div>
      )}
      <br></br>
      <div className='row'>
        <div className='col'>
          <div className={styles.infoPrincipali}>
            <span className={styles.titolo}>{annuncio.title}</span>
            <span className={styles.descrizione}>{`Annuncio pubblicato il ${moment(annuncio.publishDate).format("D MMMM YYYY")} presso ${annuncio.city} (${annuncio.province})`}</span>
            <span className={styles.descrizione}>{`L'annuncio scadrà il ${moment(annuncio.expirationDate).format("D MMMM YYYY")}`}</span>
          </div>
        </div>
      </div>
      {(isMyAnnuncio || user.isAdmin) && (
        <div className='row'>
          <div className='col'>
            <Button
              color="primary"
              fullWidth
              icon="settings"
              onClick={() => navigate(ROUTES.ANNUNCIO_GESTISCI, [annuncio.id])}
              text="Gestisci"
            />
          </div>
        </div>
      )}
      {(!isMyAnnuncio || user.isAdmin) && (
        <div className='row'>
          <div className='col'>
            <Button
              color="primary"
              fullWidth
              onClick={() => { }}
              text="Invia un messaggio al venditore"
            />
          </div>
        </div>
      )}
      <div className='row'>
        <div className='col'>
          <div className={styles.azioniPrincipali}>
            <Button
              icon="share"
              onClick={shareAnnuncio}
              text="Condividi"
            />
          </div>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Card>
            <div className='row'>
              <div className='col'>
                <span className="page-section">Dettagli</span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <DetailsGrid
                  labels={["Categoria", "Condizione", "Descrizione"]}
                  values={[getCategoryDescriptionById(annuncio.categoryId), "Usato - Buono", annuncio.description]}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Card>
            <div className='row'>
              <div className='col'>
                <span className="page-section">Informazioni sul venditore</span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <DetailsGrid
                  labels={["Username", "Email", "Cellulare", "Telefono"]}
                  values={[annuncio.user.advertisementName, annuncio.user.email, annuncio.user.cel, annuncio.user.tel]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <Button
                  onClick={() => navigate(ROUTES.UTENTE, [annuncio.user.id])}
                  size="mini"
                  text="Visita il profilo del venditore"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

Annuncio.propTypes = {
  initialAnnuncio: PropTypes.shape({
    categoryId: PropTypes.number,
    city: PropTypes.string,
    description: PropTypes.string,
    editions: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        id: PropTypes.number,
      })
    ),
    expirationDate: PropTypes.string,
    id: PropTypes.number,
    images: PropTypes.array,
    isFeatured: PropTypes.bool,
    isSuspended: PropTypes.bool,
    province: PropTypes.string,
    publishDate: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      advertisementName: PropTypes.string,
      tel: PropTypes.string,
      cel: PropTypes.string,
      email: PropTypes.string,
    }),
    userId: PropTypes.number,
    validationStatus: PropTypes.number,
  }),
};

Annuncio.defaultProps = {
  annuncio: undefined,
};

export default Annuncio;
