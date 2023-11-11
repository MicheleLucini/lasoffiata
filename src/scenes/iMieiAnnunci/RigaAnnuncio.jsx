import React, { useMemo } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Button from '@components/button';
import Icon from "@components/icon";
import { checkConstant, VALIDATION_STATUS } from "@logic/constants";
import { BASE_URL } from "@api/utils"
import styles from "./IMieiAnnunci.module.css";

const RigaAnnuncio = ({ 
  annuncio, loading, // onRipubblica, onSospendi, onElimina,
}) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio.images || annuncio.images.length === 0) {
      return "";
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio.id, annuncio.images, annuncio.userId]);

  const isScaduto = useMemo(() => {
    return moment().diff(annuncio.expirationDate) > 0;
  }, [annuncio.expirationDate]);

  const isMaiStatoAttivato = useMemo(() => {
    return annuncio.publishDate === "0001-01-01T00:00:00Z";
  }, [annuncio.publishDate]);

  const statoAnnuncio = useMemo(() => {
    let icon = "event_available";
    let className = styles.success;
    let text = "Attivo";
    if (isMaiStatoAttivato) {
      icon = "savings";
      className = styles.warning;
      text = "Pagamento richiesto";
    } else if (annuncio.isSuspended) {
      icon = "pause_circle";
      className = styles.error;
      text = "Sospeso";
    } else if (isScaduto) {
      icon = "event_busy";
      className = styles.error;
      text = "Scaduto";
    } else if (checkConstant(VALIDATION_STATUS.WAITING, annuncio.validationStatus)) {
      icon = "hourglass_empty";
      className = "";
      text = "In attesa di verifica";
    } else if (checkConstant(VALIDATION_STATUS.REFUSED, annuncio.validationStatus)) {
      icon = "block";
      className = styles.error;
      text = "Rifiutato";
    }
    return (
      <span className={styles.status + " " + className}>
        <Icon
          name={icon}
          size={18}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
        />
        {text}
      </span>
    );
  }, [annuncio.isSuspended, annuncio.validationStatus, isMaiStatoAttivato, isScaduto]);

  return (
    <>
      <div
        className={styles.imageContainer}
        onClick={() => navigate(ROUTES.ANNUNCIO, [annuncio.id])}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`Immagine annuncio ${annuncio.title}`}
          />
        ) : (
          <Icon
            className={styles.imagePlaceholderIcon}
            name={"inventory_2"}
            size={48}
            fill={0}
            weight={400}
            grade={0}
            opticalSize={48}
          />
        )}
      </div>
      <div className={styles.mainInfo}>
        <span className={styles.title} onClick={() => navigate(ROUTES.ANNUNCIO, [annuncio.id])}>{annuncio.title}</span>
        <span className={styles.description}>{annuncio.description}</span>
        <span className={styles.extra}>{`${annuncio.city} (${annuncio.province})`}</span>
        <span className={styles.extra}>{isMaiStatoAttivato ? "" : `${moment(annuncio.publishDate).format("D MMMM YYYY")}`}</span>
      </div>
      <div className={styles.actions}>
        {statoAnnuncio}
        <Button
          icon="settings"
          text="Gestisci"
          // onClick={() => onElimina(annuncio)}
          disabled={loading}
          size="mini"
        />
        {/* {!isMaiStatoAttivato && (
          annuncio.isSuspended || isScaduto ? (
            <Button
              type="outlined"
              text={isScaduto ? "Ripubblica" : "Riattiva"}
              onClick={() => onRipubblica(annuncio.id)}
              disabled={loading}
              size="mini"
            />
          ) : (
            <Button
              type="outlined"
              text="Sospendi"
              onClick={() => onSospendi(annuncio.id)}
              disabled={loading}
              size="mini"
            />
          )
        )}
        <Button
          type="outlined"
          text="Modifica"
          onClick={() => navigate(ROUTES.MODIFICA_ANNUNCIO, [annuncio.id])}
          disabled={loading}
          size="mini"
        />
        <Button
          type="outlined"
          text="Elimina"
          onClick={() => onElimina(annuncio)}
          disabled={loading}
          size="mini"
        /> */}
      </div>
    </>
  );
};

RigaAnnuncio.propTypes = {
  annuncio: PropTypes.shape({
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
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  // onRipubblica: PropTypes.func.isRequired,
  // onSospendi: PropTypes.func.isRequired,
  // onElimina: PropTypes.func.isRequired,
};

RigaAnnuncio.defaultProps = {
};

export default RigaAnnuncio;
