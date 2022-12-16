import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useCategories } from "@contexts/CategoriesContext";
import Select from "@components/select";

const SelectCategory = ({ value, setValue, disabled }) => {
  const { categories } = useCategories();

  const onSelection = useCallback((newValue) => {
    setValue(newValue || null);
  }, [setValue]);

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
      disabled={disabled}
    />
  );
};

SelectCategory.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SelectCategory.defaultProps = {
  value: null,
  disabled: false,
};

export default SelectCategory;
