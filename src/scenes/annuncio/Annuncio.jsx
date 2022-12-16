import React, { useState, useMemo, useCallback, useEffect } from "react";
import moment from 'moment';
import { useNavigator } from "@contexts/NavigatorContext";
import * as apiPublic from "@api/public";
import Icon from "@components/icon";
import { getAdvertisementImageUrl } from "@logic/annuncio"
import styles from "./Annuncio.module.css";

const Annuncio = () => {
  const { currentRoute } = useNavigator();
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
          className={styles.anteprimaImmagine}
          onClick={() => setIndiceImmagineCorrente(i)}
        />
      );
    });
  }, [annuncio]);

  useEffect(() => {
    loadAnnuncio();
  }, [loadAnnuncio]);

  if (!annuncio) {
    return null;
  }

  return (
    <>
      {annuncio.images && annuncio.images.length > 0 && (
        <div>
          <img
            src={foregroundImageSrc}
            alt={`Immagine annuncio ${annuncio.title}`}
            className={styles.immagineCorrente}
          />
          <div className={styles.wrapperImmagini}>
            {imagesCarousel}
          </div>
        </div>
      )}
      <div className={styles.infoPrincipali}>
        <span className={styles.titolo}>{annuncio.title}</span>
        <Icon
          name="location_on"
          size={16}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{`${annuncio.city} (${annuncio.province})`}</span>
        <Icon
          name="edit_calendar"
          size={16}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{moment(annuncio.publishDate).format("D MMMM YYYY")}</span>
        <Icon
          name="event_busy"
          size={16}
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
          size={16}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span>{annuncio.user.advertisementName}</span>
        <Icon
          name="mail"
          size={16}
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
          size={16}
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
          size={16}
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
