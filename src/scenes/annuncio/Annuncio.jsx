import React, { useState, useMemo, useCallback, useEffect } from "react";
import moment from 'moment';
import { useNavigator } from "@contexts/NavigatorContext";
import * as apiPublic from "@api/public";
import noPhoto from "@assets/logo_header.png";
import Icon from "@components/icon";
import { BASE_URL } from "@api/utils"
import styles from "./Annuncio.module.css";

function getUrlImmagineAnnuncio(annuncio, indice) {
  if (!annuncio.images || annuncio.images.length === 0) {
    return noPhoto;
  }
  return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[indice].id}.jpg`;
}

const Annuncio = () => {
  const { currentRoute } = useNavigator();
  const [annuncio, setAnnuncio] = useState(null);
  const [indiceImmagineCorrente, setIndiceImmagineCorrente] = useState(0);

  const loadAnnuncio = useCallback(async () => {
    const data = await apiPublic.GetAdvertisement({ idAnnuncio: currentRoute.params[0] });
    setAnnuncio(data);
  }, [currentRoute])

  const imagesCarousel = useMemo(() => {
    return annuncio?.images.map((x, i) => (
      <img
        key={x.id}
        src={getUrlImmagineAnnuncio(annuncio, i)}
        alt={`Anteprima immagine annuncio numero ${i + 1}`}
        className={styles.anteprimaImmagine}
        onClick={() => setIndiceImmagineCorrente(i)}
      />
    ));
  }, [annuncio]);

  useEffect(() => {
    loadAnnuncio();
  }, [loadAnnuncio]);

  if (!annuncio) {
    return null;
  }

  return (
    <>
      <div>
        <img
          src={getUrlImmagineAnnuncio(annuncio, indiceImmagineCorrente)}
          alt={`Immagine annuncio ${annuncio.title}`}
          className={styles.immagineCorrente}
        />
        <div className={styles.wrapperImmagini}>
          {imagesCarousel}
        </div>
      </div>
      <div className={styles.infoPrincipali}>
        <span className={styles.titolo}>{annuncio.title}</span>
        <Icon
          name="location_on"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{`${annuncio.city} (${annuncio.province})`}</span>
        <Icon
          name="edit_calendar"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{moment(annuncio.publishDate).format("D MMMM YYYY")}</span>
        <Icon
          name="event_busy"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{moment(annuncio.expirationDate).format("D MMMM YYYY")}</span>
      </div>
      <div className={styles.infoSecondarie}>
        <span>Descrizione</span>
        <span>{annuncio.description}</span>
      </div>
      <div className={styles.infoUtente}>
        <span className={styles.titolo}>Inserzionista</span>
        <Icon
          name="face"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{annuncio.user.advertisementName}</span>
        <Icon
          name="mail"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <a href={`mailto:${annuncio.user.email}?subject=${encodeURIComponent("La soffiata - annuncio: " + annuncio.title)}&body=${encodeURIComponent("Ciao! Sono interessato all'annuncio in oggetto, volevo sapere...")}`}>
          <span>{annuncio.user.email}</span>
        </a>
        <Icon
          name="call"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <a href={`tel:${annuncio.user.tel}`}>
          <span>{annuncio.user.tel}</span>
        </a>
        <Icon
          name="phone_android"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <a href={`tel:${annuncio.user.cel}`}>
          <span>{annuncio.user.cel}</span>
        </a>
      </div>
    </>
  );
};

export default Annuncio;
