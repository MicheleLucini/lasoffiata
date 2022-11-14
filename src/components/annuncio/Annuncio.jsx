import React, { useMemo, useCallback } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import PropTypes from "prop-types";
import noPhoto from "@assets/logo_header.png";
import { BASE_URL } from "@api/utils"
import styles from "./Annuncio.module.css";

const Annuncio = ({ annuncio }) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio.images || annuncio.images.length === 0) {
      return noPhoto;
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio]);

  const onClickAnnuncio = useCallback(() => {
    navigate(ROUTES.ANNUNCIO);
  }, [navigate]);

  return (
    <div className={styles.annuncio} onClick={onClickAnnuncio}>
      <img
        src={photoUrl}
        alt={`Immagine annuncio ${annuncio.title}`}
      />
      <div>
        <span className={styles.titolo}>{annuncio.title}</span>
        <span className={styles.description}>{annuncio.description}</span>
      </div>
    </div>
  );
};

Annuncio.propTypes = {
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
};

Annuncio.defaultProps = {
};

export default Annuncio;
