import ImagePreviewer from './ImagePreviewer';
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import styles from "./ImageInput.module.css";

const FakeImageInput = ({
  label,
  images,
  disabled,
  removeImage,
}) => {
  const wrapperClassName = useMemo(() => [
    styles.wrapper,
    disabled ? styles.disabled : null,
  ].filter((x) => !!x).join(" "), [disabled]);

  return (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <div className={styles.previewsWrapper}>
        {images.map((image) => (
          <ImagePreviewer
            key={image.name}
            inputFile={image}
            removeImage={disabled || !removeImage ? null : removeImage}
          />
        ))}
      </div>
    </div>
  );
};

FakeImageInput.propTypes = {
  label: PropTypes.string,
  images: PropTypes.array,
  disabled: PropTypes.bool,
  removeImage: PropTypes.func,
};

FakeImageInput.defaultProps = {
  label: "Immagini",
  images: [],
  disabled: false,
  removeImage: null,
};

export default FakeImageInput;
