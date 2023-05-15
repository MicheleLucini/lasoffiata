import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { useCategories } from "@contexts/CategoriesContext";

import { getConstantDescriptionByValue, PROVINCES } from "@logic/constants";

import Button from "@components/button";
import Icon from "@components/icon";
import TextInput from '@components/textInput';

import SelectCategory from "@templates/selectCategory";
import SelectProvince from "@templates/selectProvince";

import styles from "./Home.module.css";

const HomeSearch = ({ loading, onSearch }) => {
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState({ text: "", tags: [] });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [province, setProvince] = useState(null);
  
  const { getCategoryDescriptionById } = useCategories();

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
    onSearch({ description, category, province });
    setFilters({
      text: description,
      tags: [
        province ? getConstantDescriptionByValue(PROVINCES, province) : null,
        getCategoryDescriptionById(category),
      ].filter((x) => !!x),
    });
    setIsSearchModalOpen(false)
  }, [onSearch, description, category, province, getCategoryDescriptionById]);

  const onClearFiltersClick = useCallback((e) => {
    e.stopPropagation()
    setCategory(null);
    setProvince(null);
    setDescription("");
    setFilters({ text: "", tags: [] });
    onSearch({});
  }, [onSearch]);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.classList.add("block_scroll");
    } else {
      document.body.classList.remove("block_scroll");
    }
    return () => {
      document.body.classList.remove("block_scroll");
    }
  }, [isSearchModalOpen])

  return (
    <>
      <div className={styles.searchWrapper}>
        <Icon
          name="search"
          className={styles.searchIcon}
          size={22}
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
        />
        <input
          className={styles.searchInput}
          placeholder='Cerca su La Soffiata'
        />
        {/* <div className={styles.searchInput} onClick={openSearchModal}>
          <div className={styles.header}>
            <Icon
              name="search"
              className={styles.icon}
              size={22}
              fill={0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
            {filters.text ? (
              <span className={styles.titleActive}>{filters.text}</span>
            ) : (
              <span className={styles.title}>Cosa stai cercando?</span>
            )}
            {(filters.text || filters.tags.length > 0) && (
              <Button
                className={styles.clearFiltersButton}
                type="text"
                icon="filter_alt_off"
                onClick={onClearFiltersClick}
                fillIcon
              />
            )}
          </div>
          {filters.tags.length > 0 && (
            <div className={styles.tags}>
              {filters.tags.map((x, i) => <span key={i} className={styles.tag}>{x}</span>)}
            </div>
          )}
        </div> */}
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
          <TextInput
            label="Descrizione"
            value={description}
            setValue={setDescription}
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
