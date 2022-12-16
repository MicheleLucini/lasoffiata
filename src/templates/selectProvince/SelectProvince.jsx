import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Select from "@components/select";
import { getSelectOptionsFromConstant, PROVINCES } from "@logic/constants";

const SelectProvince = ({ label, value, setValue, disabled }) => {
  const onSelection = useCallback((newValue) => {
    setValue(newValue || null);
  }, [setValue]);

  return (
    <Select
      label={label || "Province"}
      options={getSelectOptionsFromConstant(PROVINCES)}
      value={value}
      setValue={onSelection}
      disabled={disabled}
    />
  );
};

SelectProvince.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SelectProvince.defaultProps = {
  label: null,
  value: null,
  disabled: false,
};

export default SelectProvince;
