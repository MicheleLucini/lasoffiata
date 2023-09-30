import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbars } from "@contexts/SnackbarsContext";
import Button from '../button';
import ImagePreviewer from './ImagePreviewer';
import styles from "./ImageInput.module.css";

const _fileId = (file) => file.name + "_" + file.size;

const ImageInput = ({
  setValue,
  disabled,
}) => {
  const { openSnackbar } = useSnackbars();
  const inputFile = useRef(null);
  const [images, setImages] = useState([]);

  const onChange = useCallback((e) => {
    setImages((prev) => {
      const prevFileIds = prev.map((x) => _fileId(x));
      const newFiles = Array.from(e.target.files);
      const filesToAdd = newFiles.filter((x) => !prevFileIds.includes(_fileId(x)));
      if (filesToAdd.length < newFiles.length) {
        openSnackbar("Una o più immagini scartate perché già caricate.");
      }
      return [
        ...prev,
        ...filesToAdd,
      ];
    });
    e.target.value = null;
  }, [openSnackbar]);

  const removeImage = useCallback((name) => {
    setImages((prev) => prev.filter((x) => x.name !== name));
  }, []);

  useEffect(() => {
    setValue(images);
  }, [setValue, images])

  return (
    <div className={styles.wrapper}>
      <label>Immagini da caricare:</label>
      <div className={styles.previewsWrapper}>
        {images.map((image) => (
          <ImagePreviewer
            key={image.name}
            inputFile={image}
            removeImage={removeImage}
          />
        ))}
      </div>
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
        // type="outlined"
        fullWidth
        onClick={() => inputFile.current.click()}
      />
    </div>
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
