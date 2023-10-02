import Icon from "../icon";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import styles from "./ImageInput.module.css";

const ImagePreviewer = ({
  inputFile,
  removeImage
}) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!inputFile) return;
    if (!!inputFile.src) {
      setImageSrc(inputFile.src)
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event.target.result);
    }
    reader.readAsDataURL(inputFile);
  }, [inputFile])

  return (
    imageSrc
      ? (
        <div>
          {removeImage && (
            <div className={styles.closeIcon} onClick={() => removeImage(inputFile.name)}>
              <Icon
                name="close"
                size={20}
                fill={1}
                weight={400}
                grade={-25}
                opticalSize={20}
              />
            </div>
          )}
          <img alt="anteprima immagine caricata" src={imageSrc} />
        </div>
      )
      : <div className={styles.loading} />
  );
};

ImagePreviewer.propTypes = {
  inputFile: PropTypes.any.isRequired,
  removeImage: PropTypes.func,
};

ImagePreviewer.defaultProps = {
  removeImage: null,
};

export default ImagePreviewer;
