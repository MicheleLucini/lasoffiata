import React, { useMemo } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Button from '@components/button';
import Icon from "@components/icon";
import { checkConstant, getConstantDescriptionByValue, VALIDATION_STATUS } from "@logic/constants";
import { BASE_URL } from "@api/utils"
import styles from "./IMieiAnnunci.module.css";

const RigaAnnuncio = ({ annuncio, loading }) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio.images || annuncio.images.length === 0) {
      return "";
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio]);

  const statoApprovazione = useMemo(() => {
    let icon = "hourglass_empty";
    let className = ""; //styles.pending;
    if (checkConstant(VALIDATION_STATUS.VALIDATED, annuncio.validationStatus)) {
      icon = "task_alt";
      className = styles.success;
    } else if (checkConstant(VALIDATION_STATUS.REFUSED, annuncio.validationStatus)) {
      icon = "block";
      className = styles.error;
    }
    return (
      <span className={className}>
        <Icon
          name={icon}
          size={18}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
        />
        {getConstantDescriptionByValue(VALIDATION_STATUS, annuncio.validationStatus)}
      </span>
    );
  }, [annuncio.validationStatus]);

  const statoPubblicazione = useMemo(() => {
    return (
      <span className={annuncio.isSuspended ? styles.error : styles.success}>
        <Icon
          name={annuncio.isSuspended ? "event_busy" : "event_available"}
          size={18}
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
        />
        {annuncio.isSuspended ? "Scaduto" : "Attivo"}
      </span>
    );
  }, [annuncio.isSuspended]);

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
        <span className={styles.extra}>{`${annuncio.city} (${annuncio.province}) - ${moment(annuncio.publishDate).format("D MMMM YYYY")}`}</span>
      </div>
      <div className={styles.status}>
        {statoApprovazione}
        {statoPubblicazione}
      </div>
      <div className={styles.actions}>
        {/* <Button
          text="Rendi privato"
          onClick={() => { }}
          disabled={loading}
          size="mini"
        />
        <Button
          text="Rendi pubblico"
          onClick={() => { }}
          disabled={loading}
          size="mini"
        /> */}
        <Button
          type="outlined"
          text="Ripubblica"
          onClick={() => { }}
          disabled={loading}
          size="mini"
        />
        <Button
          type="outlined"
          text="Modifica"
          onClick={() => { }}
          disabled={loading}
          size="mini"
        />
        <Button
          type="outlined"
          text="Elimina"
          onClick={() => { }}
          disabled={loading}
          size="mini"
        />
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
};

RigaAnnuncio.defaultProps = {
};

export default RigaAnnuncio;
