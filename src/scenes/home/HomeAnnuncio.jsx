import React, { useMemo, useCallback } from "react";
// import moment from 'moment';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import PropTypes from "prop-types";
// import Icon from "@components/icon";
import { BASE_URL } from "@logic/api"
import styles from "./Home.module.css";

const HomeAnnuncio = ({ annuncio, onAnnuncioClick }) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio.images || annuncio.images.length === 0) {
      return "";
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio]);

  const onClickAnnuncio = useCallback(() => {
    navigate(ROUTES.ANNUNCIO, [annuncio.id]);
    // onAnnuncioClick(annuncio);
  }, [annuncio.id, navigate]);

  return (
    <div className={styles.annuncio} onClick={onClickAnnuncio}>
      {/* {annuncio.isFeatured && <div className={styles.featured}>Sponsorizzato</div>} */}
      <div className={styles.imageContainer}>
        {(annuncio.images && annuncio.images.length > 0) && (
          <img
            src={photoUrl}
            alt={`Immagine annuncio ${annuncio.title}`}
          />
        )}
      </div>
      <span className={styles.price}>€ 100</span>
      <span className={styles.title}>{annuncio.title}</span>
      <span className={styles.place}>{`${annuncio.city} (${annuncio.province})`}</span>
      {/* <span className={styles.time}>{moment(annuncio.publishDate).format("D MMMM YYYY")}</span> */}
    </div>
  );
};

HomeAnnuncio.propTypes = {
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
  onAnnuncioClick: PropTypes.func.isRequired,
};

HomeAnnuncio.defaultProps = {
};

export default HomeAnnuncio;
