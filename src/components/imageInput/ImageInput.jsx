import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Button from '../button';
import ImagePreviewer from './ImagePreviewer';
import styles from "./ImageInput.module.css";

const ImageInput = ({
  setValue,
  disabled,
}) => {
  const inputFile = useRef(null);
  const [images, setImages] = useState([]);

  const onChange = useCallback((e) => {
    setImages((prev) => {
      const prevNames = prev.map((x) => x.name);
      // TODO: segnalare che l'immagine è già presente tra quelle scelte (stesso nome)
      const newImages = Array.from(e.target.files).filter((x) => !prevNames.includes(x.name));
      return [
        ...prev,
        ...newImages,
      ];
    });
    e.target.value = null;
  }, []);

  const removeImage = useCallback((name) => {
    setImages((prev) => prev.filter((x) => x.name !== name));
  }, []);

  useEffect(() => {
    setValue(images);
  }, [setValue, images])

  return (
    <>
      <input
        ref={inputFile}
        name="image-uploader"
        type="file"
        accept="image/*"
        onChange={onChange}
        multiple
        style={{ display: "none" }}
      />
      <Button
        icon="upload"
        text="Scegli immagini"
        type="outlined"
        fullWidth
        onClick={() => inputFile.current.click()}
      />
      <div className={styles.previewsWrapper}>
        {images.map((image) => (
          <ImagePreviewer
            key={image.name}
            inputFile={image}
            removeImage={removeImage}
          />
        ))}
      </div>
    </>
  );
};

ImageInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ImageInput.defaultProps = {
  disabled: false,
};

export default ImageInput;
