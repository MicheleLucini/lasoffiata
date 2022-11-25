import React, { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "@components/select";
import * as apiPublic from "@api/public";

const SelectCategory = ({ value, setValue, disabled }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiPublic.GetCategories();
      setCategories(data);
    } catch { }
    setLoading(false);
  }, []);

  const onSelection = useCallback((newValue) => {
    setValue(newValue || null);
  }, [setValue]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const options = useMemo(() => (
    categories.map((category) => ({
      value: category.id,
      description: category.name,
    }))
  ), [categories]);

  return (
    <Select
      label="Categoria"
      options={options}
      value={value}
      setValue={onSelection}
      disabled={loading || disabled}
    />
  );
};

SelectCategory.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SelectCategory.defaultProps = {
  value: null,
  disabled: false,
};

export default SelectCategory;
