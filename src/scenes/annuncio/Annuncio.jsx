import React, { useState, useMemo, useCallback, useEffect } from "react";
import moment from 'moment';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useCategories } from "@contexts/CategoriesContext";
import * as apiPublic from "@api/public";
import Button from "@components/button";
import Icon from "@components/icon";
import { getAdvertisementImageUrl } from "@logic/annuncio"
import styles from "./Annuncio.module.css";

const Annuncio = () => {
  const { navigate, currentRoute } = useNavigator();
  const { getCategoryDescriptionById } = useCategories();
  const [annuncio, setAnnuncio] = useState(null);
  const [indiceImmagineCorrente, setIndiceImmagineCorrente] = useState(0);

  const loadAnnuncio = useCallback(async () => {
    const data = await apiPublic.GetAdvertisement({ advertisementId: currentRoute.params[0] });
    setAnnuncio(data);
  }, [currentRoute])

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
      <div className='row'>
        <div className='col'>
          <div className={styles.azioniPrincipali}>
            <Button
              type="outlined"
              text="Modifica"
              onClick={() => navigate(ROUTES.MODIFICA_ANNUNCIO, [annuncio.id])}
            />
            <Button
              onClick={() => { }}
              text="Condividi"
            />
            <Button
              onClick={() => { }}
              text="..."
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <span className="page-title">Dettagli</span>
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
          <span className="page-title">Informazioni sul venditore</span>
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
            // className={styles.utenteButton}
            // type="outlined"
            // icon="face"
            text="Visita il profilo"
            onClick={() => navigate(ROUTES.UTENTE, [annuncio.user.id])}
            fillIcon
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

export default Annuncio;
