import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Select from "@components/select";

const PROVINCES = [
  {
    value: "CR",
    description: "CR - Cremona",
  },
  {
    value: "BG",
    description: "BG - Bergamo",
  },
  {
    value: "BS",
    description: "BS - Brescia",
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
