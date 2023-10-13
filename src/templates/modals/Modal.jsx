import Icon from "@components/icon";
import React, { useCallback } from "react";
import styles from './Modals.module.css';
import { useModals } from "@contexts/ModalsContext";

const Modal = ({
  id,
  title,
  children
}) => {
  const { closeModal } = useModals();

  const onModalOverlayClick = useCallback((e) => {
    closeModal(id);
    e.stopPropagation();
  }, [closeModal, id]);

  const onModalClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onModalOverlayClick}>
      <div className={styles.modal} onClick={onModalClick}>
        <div className={styles.modalTitle}>
          <span>{title}</span>
          <div onClick={(e) => closeModal(id)}>
            <Icon
              name="close"
              fill={0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
          </div>
        </div>
        <div className={styles.modalBody} >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
