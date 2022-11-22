import React, { useMemo, useCallback } from "react";
import moment from 'moment';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import PropTypes from "prop-types";
import Icon from "@components/icon";
import { BASE_URL } from "@api/utils"
import styles from "./Annuncio.module.css";

const Annuncio = ({ annuncio }) => {
  const { navigate } = useNavigator();

  const photoUrl = useMemo(() => {
    if (!annuncio.images || annuncio.images.length === 0) {
      return "";
    }
    return `${BASE_URL}/images/${annuncio.userId}/${annuncio.id}/${annuncio.images[0].id}.jpg`;
  }, [annuncio]);

  const onClickAnnuncio = useCallback(() => {
    navigate(ROUTES.ANNUNCIO, [annuncio.id]);
  }, [navigate, annuncio.id]);

  return (
    <div className={styles.annuncio} onClick={onClickAnnuncio}>
      <div className={styles.imageContainer}>
        {(annuncio.images && annuncio.images.length > 0) ? (
          <img
            src={photoUrl}
            alt={`Immagine annuncio ${annuncio.title}`}
          />
        ) : (
          <Icon
            className={styles.imagePlaceholderIcon}
            name={"inventory_2"}
            fill={0}
            weight={400}
            grade={0}
            opticalSize={48}
          />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{annuncio.title}</span>
        <Icon
          name="bookmark_add"
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
          className={styles.addIcon}
        />
        <Icon
          name="location_on"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span className={styles.description}>{`${annuncio.city} (${annuncio.province})`}</span>
        <Icon
          name="calendar_month"
          fill={1}
          weight={400}
          grade={-25}
          opticalSize={20}
          className={styles.icon}
        />
        <span className={styles.description}>{moment(annuncio.publishDate).format("D MMMM YYYY")}</span>
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
