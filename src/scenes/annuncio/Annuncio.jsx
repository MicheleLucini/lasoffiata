import * as apiPublic from "@api/public";
import Button from "@components/button";
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
            <span className={styles.prezzo}>100€</span>
            <span className={styles.descrizione}>{`Annuncio pubblicato il ${moment(annuncio.publishDate).format("D MMMM YYYY")} presso ${annuncio.city} (${annuncio.province})`}</span>
            <span className={styles.descrizione}>{`L'annuncio scadrà il ${moment(annuncio.expirationDate).format("D MMMM YYYY")}`}</span>
          </div>
        </div>
      </div>
      {!isMyAnnuncio && (
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
            {isMyAnnuncio && (
              <Button
                text="Modifica"
                onClick={() => navigate(ROUTES.MODIFICA_ANNUNCIO, [annuncio.id])}
              />
            )}
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
          <span className="page-section">Dettagli</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.infoSecondarie}>
            <span>Categoria:</span><span>{getCategoryDescriptionById(annuncio.categoryId)}</span>
            <span>Condizione:</span><span>Usato - Buono</span>
            <span>Categoria:</span><span>{getCategoryDescriptionById(annuncio.categoryId)}</span>
            <span>Descrizione</span><span>{annuncio.description}</span>
          </div>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className="page-section">Informazioni sul venditore</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.infoSecondarie}>
            <span>Nome</span><span>{annuncio.user.advertisementName}</span>
            <span>Email</span><span>{annuncio.user.email}</span>
            <span>Telefono</span><span>{annuncio.user.tel}</span>
            <span>Cellulare</span><span>{annuncio.user.cel}</span>
          </div>
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
      {/* <Icon
          name="face"
          size={16}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{annuncio.user.advertisementName}</span> */}
      {/* <a href={`mailto:${annuncio.user.email}?subject=${encodeURIComponent("La soffiata - annuncio: " + annuncio.title)}&body=${encodeURIComponent("Ciao! Sono interessato all'annuncio in oggetto, volevo sapere...")}`}>
          <span>{annuncio.user.email}</span>
        </a>
    </div > */}
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
