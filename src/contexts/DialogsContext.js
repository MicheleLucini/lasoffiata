import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const DialogsContext = React.createContext();

function DialogsProvider({ children }) {
  const [activeDialogs, setActiveDialogs] = useState([]);

  const closeDialog = useCallback((id) => {
    setActiveDialogs((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const openDialog = useCallback(({
    title,
    body,
    confirmButtonText = "Ok",
    confirmButtonAction,
    cancelButtonText = "Annulla",
    cancelButtonAction,
  }) => {
    const newId = uuidv4();
    setActiveDialogs((prev) => [
      ...prev,
      {
        id: newId,
        title,
        body,
        confirmButtonText,
        confirmButtonAction: () => {
          closeDialog(newId);
          if (confirmButtonAction) {
            confirmButtonAction();
          }
          return true;
        },
        cancelButtonText,
        cancelButtonAction: () => {
          closeDialog(newId);
          if (cancelButtonAction) {
            cancelButtonAction();
          }
          return false;
        },
      }
    ]);
  }, [closeDialog]);

  const dialogsContextValue = useMemo(() => ({
    openDialog,
    closeDialog,
    activeDialogs,
  }), [openDialog, closeDialog, activeDialogs]);

  return (
    <DialogsContext.Provider value={dialogsContextValue}>
      {children}
    </DialogsContext.Provider>
  );
}

DialogsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
DialogsProvider.defaultProps = {};

function useDialogs() {
  const context = React.useContext(DialogsContext);
  if (context === undefined) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }
  return context;
}

export { DialogsProvider, useDialogs };
