import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { getAdvertisementImageUrl } from "@logic/annuncio"
import Icon from "@components/icon";
import styles from "./ModificaAnnuncio.module.css";

const ImagePreviewer = ({ userId, advertisementId, imageId, removeImage }) => {
  const imageSrc = useMemo(() => (
    getAdvertisementImageUrl({ userId, advertisementId, imageId })
  ), [userId, advertisementId, imageId]);

  return (
    imageSrc
      ? (
        <div>
          <div className={styles.closeIcon} onClick={() => removeImage(imageId)}>
            <Icon
              name="close"
              size={20}
              fill={1}
              weight={400}
              grade={-25}
              opticalSize={20}
            />
          </div>
          <img alt="anteprima immagine caricata" src={imageSrc} />
        </div>
      )
      : <div className={styles.loading} />
  );
};

ImagePreviewer.propTypes = {
  userId: PropTypes.number.isRequired,
  advertisementId: PropTypes.number.isRequired,
  imageId: PropTypes.number.isRequired,
  removeImage: PropTypes.func.isRequired,
};

ImagePreviewer.defaultProps = {
};

export default ImagePreviewer;
