import React from "react";
import { useSnackbar } from "@contexts/SnackbarContext";
import styles from './Snackbars.module.css';

const Snackbar = ({ id, text, close }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <div className={styles.snackbar + (close ? " " + styles.hide : "")} onClick={(e) => closeSnackbar(id)}>
      <span>{text}</span>
    </div>
  );
};

export default Snackbar;
