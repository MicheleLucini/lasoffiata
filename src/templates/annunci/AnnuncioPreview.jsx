import React, { useMemo } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Icon from "@components/icon";
import { BASE_URL } from "@api/utils"
import styles from "./annunci.module.css";

const AnnuncioPreview = ({
  annuncio, loading, children
}) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio.images || annuncio.images.length === 0) {
      return "";
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio.id, annuncio.images, annuncio.userId]);

  const isMaiStatoAttivato = useMemo(() => {
    return annuncio.publishDate === "0001-01-01T00:00:00Z";
  }, [annuncio.publishDate]);

  return (
    <div className={styles.annuncioPreview}>
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
            name={"yard"}
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
      {!!children && (
        <div className={styles.children}>
          {children}
        </div>
      )}
    </div>
  );
};

AnnuncioPreview.propTypes = {
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
  children: PropTypes.node,
};

AnnuncioPreview.defaultProps = {
};

export default AnnuncioPreview;
