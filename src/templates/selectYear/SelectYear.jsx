import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import Select from "@components/select";

const SelectYear = ({ label, value, setValue, disabled }) => {
  const yearsOptions = useMemo(() => {
    const years = [];
    const currentYear = moment().year();
    for (let i = currentYear; i > currentYear - 100; i--) {
      years.push({ value: `${i}`, description: `${i}` });
    }
    return years;
  }, []);

  const onSelection = useCallback((newValue) => {
    setValue(newValue || null);
  }, [setValue]);

  return (
    <Select
      label={label}
      options={yearsOptions}
      value={`${value || ""}`}
      setValue={onSelection}
      disabled={disabled}
    />
  );
};

SelectYear.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SelectYear.defaultProps = {
  label: "",
  value: null,
  disabled: false,
};

export default SelectYear;
