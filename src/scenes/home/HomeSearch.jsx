import React, { useState, useCallback, useMemo } from "react";
import Icon from "@components/icon";
import Button from "@components/button";
import styles from "./Home.module.css";

const HomeSearch = () => {
  const [isSearchModalOpen, setIisSearchModalOpen] = useState(false);

  const openSearchModal = useCallback(() => {
    setIisSearchModalOpen(true)
  }, [],);

  const closeSearchModal = useCallback(() => {
    setIisSearchModalOpen(false)
  }, [],);


  const searchModalClass = useMemo(() => [
    styles.searchModalOverlay,
    isSearchModalOpen ? styles.active : null,
  ].filter((x) => !!x).join(" "), [isSearchModalOpen]);

  return (
    <>
      <div className={styles.searchRecap} onClick={openSearchModal}>
        <div className={styles.header}>
          <Icon
            name="search"
            className={styles.icon}
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
          <span className={styles.title}>Cosa stai cercando?</span>
        </div>
      </div>
      <div className={searchModalClass} onClick={closeSearchModal}>
        <div className={styles.searchModal}>
          <span className={styles.title}>
            Filtri di ricerca
            <Button
              type="text"
              icon="close"
              onClick={closeSearchModal}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeSearch;
