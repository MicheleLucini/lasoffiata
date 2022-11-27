import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Select from "@components/select";

const PROVINCES = [
  {
    value: "",
    description: "",
  },
  {
    value: "CR",
    description: "Cremona - CR",
  },
  {
    value: "BG",
    description: "Bergamo - BG",
  },
  {
    value: "BS",
    description: "Brescia - BS",
  },
];

const SelectProvince = ({ value, setValue, disabled }) => {
  const onSelection = useCallback((newValue) => {
    setValue(newValue || null);
  }, [setValue]);

  return (
    <Select
      label="Province"
      options={PROVINCES}
      value={value}
      setValue={onSelection}
      disabled={disabled}
    />
  );
};

SelectProvince.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SelectProvince.defaultProps = {
  value: null,
  disabled: false,
};

export default SelectProvince;
