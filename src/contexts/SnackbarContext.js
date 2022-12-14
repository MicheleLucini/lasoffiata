import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const SnackbarContext = React.createContext();

function SnackbarProvider({ children }) {
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

  const openSnackbar = useCallback(({ text }) => {
    const newId = uuidv4();
    setActiveSnackbars((prev) => [
      ...prev,
      {
        id: newId,
        text,
      }
    ]);
    setTimeout(() => hideSnackbar(newId), 5000);
    setTimeout(() => closeSnackbar(newId), 5400);
  }, [hideSnackbar, closeSnackbar]);

  const snackbarContextValue = useMemo(() => ({
    openSnackbar,
    closeSnackbar,
    activeSnackbars,
  }), [openSnackbar, closeSnackbar, activeSnackbars]);

  return (
    <SnackbarContext.Provider value={snackbarContextValue}>
      {children}
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
SnackbarProvider.defaultProps = {};

function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

export { SnackbarProvider, useSnackbar };
