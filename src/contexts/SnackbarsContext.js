import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const SnackbarsContext = React.createContext();

function SnackbarsProvider({ children }) {
  const [activeSnackbars, setActiveSnackbars] = useState([]);

  const closeSnackbar = useCallback((id) => {
    setActiveSnackbars((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const hideSnackbar = useCallback((id) => {
    setActiveSnackbars((prev) => prev.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          close: true,
        }
      }
      return x;
    }));
  }, []);

  const hideAndCloseSnackbar = useCallback((id) => {
    hideSnackbar(id);
    setTimeout(() => closeSnackbar(id), 400);
  }, [hideSnackbar, closeSnackbar]);

  const openSnackbar = useCallback((text) => {
    const newId = uuidv4();
    setActiveSnackbars((prev) => [
      ...prev,
      {
        id: newId,
        text,
      }
    ]);
    setTimeout(() => hideAndCloseSnackbar(newId), 5000);
  }, [hideAndCloseSnackbar]);

  const snackbarsContextValue = useMemo(() => ({
    openSnackbar,
    hideAndCloseSnackbar,
    activeSnackbars,
  }), [openSnackbar, hideAndCloseSnackbar, activeSnackbars]);

  return (
    <SnackbarsContext.Provider value={snackbarsContextValue}>
      {children}
    </SnackbarsContext.Provider>
  );
}

SnackbarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
SnackbarsProvider.defaultProps = {};

function useSnackbars() {
  const context = React.useContext(SnackbarsContext);
  if (context === undefined) {
    throw new Error("useSnackbars must be used within a SnackbarsProvider");
  }
  return context;
}

export { SnackbarsProvider, useSnackbars };
