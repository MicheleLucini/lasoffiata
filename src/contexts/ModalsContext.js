import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const ModalsContext = React.createContext();

function ModalsProvider({ children }) {
  const [activeModals, setActiveModals] = useState([]);

  const closeModal = useCallback((id) => {
    setActiveModals((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const openModal = useCallback(({ title, children }) => {
    const newId = uuidv4();
    setActiveModals((prev) => [
      ...prev,
      {
        id: newId,
        title,
        children,
      }
    ]);
  }, []);

  console.log(activeModals)

  const modalsContextValue = useMemo(() => ({
    openModal,
    closeModal,
    activeModals,
  }), [openModal, closeModal, activeModals]);

  return (
    <ModalsContext.Provider value={modalsContextValue}>
      {children}
    </ModalsContext.Provider>
  );
}

ModalsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
ModalsProvider.defaultProps = {};

function useModals() {
  const context = React.useContext(ModalsContext);
  if (context === undefined) {
    throw new Error("useModals must be used within a ModalsProvider");
  }
  return context;
}

export { ModalsProvider, useModals };
