import React from "react";
import { useModals } from "@contexts/ModalsContext";
// import Button from '@components/button';
import Icon from "@components/icon";
import styles from './Modals.module.css';

const Modal = ({
  id,
  title,
  children
}) => {
  const { closeModal } = useModals();

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalBody} >
        <div className={styles.modalTitle} onClick={(e) => e.stopPropagation()}>
          <div onClick={(e) => closeModal(id)}>
            <Icon
              name="arrow_back"
              fill={0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
          </div>
          <span>{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
