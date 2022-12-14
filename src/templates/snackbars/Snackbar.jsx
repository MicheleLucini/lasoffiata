import React from "react";
import { useSnackbars } from "@contexts/SnackbarsContext";
import styles from './Snackbars.module.css';

const Snackbar = ({ id, text, close }) => {
  const { hideAndCloseSnackbar } = useSnackbars();

  return (
    <div className={styles.snackbar + (close ? " " + styles.hide : "")} onClick={(e) => hideAndCloseSnackbar(id)}>
      <span>{text}</span>
    </div>
  );
};

export default Snackbar;
