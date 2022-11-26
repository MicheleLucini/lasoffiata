import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "@components/icon";
import Button from "@components/button";
import SelectCategory from "@templates/selectCategory";
import SelectProvince from "@templates/selectProvince";
import styles from "./Home.module.css";

const HomeSearch = ({ loading, onSearch }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [province, setProvince] = useState(null);

  const searchModalOverlayClass = useMemo(() => [
    styles.searchModalOverlay,
    isSearchModalOpen ? styles.active : null,
  ].filter((x) => !!x).join(" "), [isSearchModalOpen]);

  const searchModalClass = useMemo(() => [
    styles.searchModal,
    isSearchModalOpen ? styles.active : null,
  ].filter((x) => !!x).join(" "), [isSearchModalOpen]);

  const openSearchModal = useCallback(() => {
    setIsSearchModalOpen(true)
  }, []);

  const closeSearchModal = useCallback(() => {
    setIsSearchModalOpen(false)
  }, []);

  const onSearchClick = useCallback(() => {
    onSearch({ category, province });
    setIsSearchModalOpen(false)
  }, [onSearch, category, province]);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.classList.add("modal_open");
    } else {
      document.body.classList.remove("modal_open");
    }
    return () => {
      document.body.classList.remove("modal_open");
    }
  }, [isSearchModalOpen])

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
      <div className={searchModalOverlayClass} onClick={closeSearchModal} />
      <div className={searchModalClass}>
        <div className={styles.searchModalBody}>
          <span className={styles.title}>
            Filtri di ricerca
            <Button
              type="text"
              icon="close"
              onClick={closeSearchModal}
            />
          </span>
          <SelectCategory
            value={category}
            setValue={setCategory}
            disabled={loading}
          />
          <SelectProvince
            value={province}
            setValue={setProvince}
            disabled={loading}
          />
          <Button
            icon="search"
            text="Cerca"
            onClick={onSearchClick}
          />
        </div>
      </div>
    </>
  );
};

HomeSearch.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default HomeSearch;
