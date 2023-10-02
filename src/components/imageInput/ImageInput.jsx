import Button from '../button';
import ImagePreviewer from './ImagePreviewer';
import PropTypes from "prop-types";
import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import styles from "./ImageInput.module.css";
import { useSnackbars } from "@contexts/SnackbarsContext";

const _fileId = (file) => file.name + "_" + file.size;

const ImageInput = ({
  label,
  buttonText,
  setValue,
  disabled,
}) => {
  const inputFile = useRef(null);
  const [images, setImages] = useState([]);

  const { openSnackbar } = useSnackbars();

  const wrapperClassName = useMemo(() => [
    styles.wrapper,
    disabled ? styles.disabled : null,
  ].filter((x) => !!x).join(" "), [disabled]);

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
    setTimeout(() => e.target.value = null, 1);
  }, [openSnackbar]);

  const removeImage = useCallback((name) => {
    setImages((prev) => prev.filter((x) => x.name !== name));
  }, []);

  useEffect(() => {
    setValue(images);
  }, [setValue, images])

  return (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <div className={styles.previewsWrapper}>
        {images.map((image) => (
          <ImagePreviewer
            key={image.name}
            inputFile={image}
            removeImage={disabled ? null : removeImage}
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
        text={buttonText}
        fullWidth
        onClick={() => inputFile.current.click()}
        disabled={disabled}
      />
    </div>
  );
};

ImageInput.propTypes = {
  label: PropTypes.string,
  buttonText: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ImageInput.defaultProps = {
  label: "Immagini",
  buttonText: "Scegli immagini",
  disabled: false,
};

export default ImageInput;
