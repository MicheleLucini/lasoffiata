import React, { useCallback, } from 'react';
import PropTypes from 'prop-types';
import { useNavigator } from "@contexts/NavigatorContext";
import styles from './Link.module.css';

const Link = ({
  route, className, style, children,
}) => {
  const { navigate } = useNavigator();

  const handleOnClick = useCallback((e) => {
    navigate(route);
    e.preventDefault();
    return false;
  }, [navigate, route]);

  const handleOnAuxClick = useCallback((e) => {
    handleOnClick(e);
  }, [handleOnClick]);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'Enter') {
      handleOnClick(e);
    }
  }, [handleOnClick]);

  return (
    <a
      // role="menuitem"
      tabIndex="0"
      href={route?.url || ""}
      onClick={handleOnClick}
      onAuxClick={handleOnAuxClick}
      onKeyUp={handleKeyUp}
      className={`${styles.reset} ${className}`}
      style={style}
    >
      {children}
    </a >
  );
};

Link.propTypes = {
  route: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};
Link.defaultProps = {
  className: "",
  style: null,
};

export default Link;
