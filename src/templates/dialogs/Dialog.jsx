import React from "react";
import { useDialogs } from "@contexts/DialogsContext";
import Button from '@components/button';
import styles from './Dialogs.module.css';

const Dialog = ({
  id,
  title,
  body,
  confirmButtonText,
  confirmButtonAction,
  cancelButtonText,
  cancelButtonAction,
}) => {
  const { closeDialog } = useDialogs();

  return (
    <div className={styles.overlay} onClick={(e) => closeDialog(id)}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>{title}</span>
        <span className={styles.body}>{body}</span>
        <div className={styles.actions}>
          <Button
            type="text"
            text={cancelButtonText}
            onClick={cancelButtonAction}
          />
          <Button
            text={confirmButtonText}
            onClick={confirmButtonAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
