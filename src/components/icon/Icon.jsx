import React, { useMemo } from "react";
import PropTypes from "prop-types";

const Icon = ({
  name,
  className,
  size,
  type,
  fill,
  weight,
  grade,
  opticalSize
}) => {
  const iconClassName = useMemo(() => (
    [
      "material-symbols-" + type,
      className,
    ].filter((x) => !!x).join(" ")
  ), [type, className]);

  const iconStyle = useMemo(() => ({
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
    fontSize: size,
    width: size,
    height: size,
  }), [size, fill, weight, grade, opticalSize]);

  return (
    <span
      className={iconClassName}
      style={iconStyle}
    >
      {name}
    </span>
  );
};

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.oneOf(["outlined", "rounded", "sharp"]),
  fill: PropTypes.oneOf([0, 1]),
  weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700]),
  grade: PropTypes.oneOf([-25, 0, 200]),
  opticalSize: PropTypes.oneOf([20, 24, 40, 48]),
};

Icon.defaultProps = {
  name: "question_mark",
  className: null,
  size: 24,
  type: "rounded",
  fill: 0,
  weight: 100,
  grade: 0,
  opticalSize: 48,
};

export default Icon;
