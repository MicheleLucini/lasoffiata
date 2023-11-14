import Icon from "@components/icon";
import PropTypes from "prop-types";
import React, { useMemo, useCallback } from "react";
import moment from 'moment';
import styles from "./annunci.module.css";
import { BASE_URL } from "@api/utils"
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";

const AnnuncioPreview = ({
  annuncio, loading, suppressNavigation, children
}) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio || !annuncio.images || annuncio.images.length === 0) {
      return "";
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio]);

  const isMaiStatoAttivato = useMemo(() => {
    return annuncio?.publishDate === "0001-01-01T00:00:00Z";
  }, [annuncio?.publishDate]);

  const onClick = useCallback(() => {
    if (!suppressNavigation && annuncio?.id) {
      navigate(ROUTES.ANNUNCIO, [annuncio.id]);
    }
  }, [suppressNavigation, annuncio, navigate]);

  return (
    <div className={styles.annuncioPreview + " " + (loading ? styles.loading : "")} onClick={onClick}>
      <div className={styles.imageContainer}>
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
      {annuncio && !loading && (
        <div className={styles.mainInfo}>
          <span className={styles.price}>€ 100</span>
          <span className={styles.title}>{annuncio.title}</span>
          <span className={styles.description}>{annuncio.description}</span>
          <span className={styles.extra}>
            {`${annuncio.city} (${annuncio.province})`}
            {` - `}
            {isMaiStatoAttivato ? "" : `${moment(annuncio.publishDate).format("D MMMM YYYY")}`}
          </span>
        </div>
      )}
      {loading && (
        <div className={styles.mainInfo}>
          <span />
          <span />
          <span />
        </div>
      )}
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
  }),
  loading: PropTypes.bool,
  suppressNavigation: PropTypes.bool,
  children: PropTypes.node,
};

AnnuncioPreview.defaultProps = {
  annuncio: undefined,
  loading: false,
  suppressNavigation: false,
};

export default AnnuncioPreview;
