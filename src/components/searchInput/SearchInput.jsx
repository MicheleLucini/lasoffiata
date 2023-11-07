import Icon from "@components/icon";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({
  value,
  setValue,
  autoFocus,
  onClick,
}) => {
  const onSearchInputChange = useCallback((e) => {
    setValue(e.target.value);
  }, [setValue]);

  // const onSearchInputKeyPress = useCallback((e) => {
  //   if (!e) e = window.event;
  //   var keyCode = e.code || e.key;
  //   if (keyCode === "Enter") {
  //     // setSearchActive(true);
  //     return false;
  //   }
  // }, []);

  return (
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
        onChange={onSearchInputChange}
        // onKeyPress={onSearchInputKeyPress}
        placeholder='Cerca su La Soffiata'
        value={value}
        autoFocus={autoFocus}
        onClick={onClick || null}
      />
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

SearchInput.defaultProps = {
  value: "",
  autoFocus: undefined,
};

export default SearchInput;
