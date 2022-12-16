import React, { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import * as apiPublic from "@api/public";

const CategoriesContext = React.createContext();

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await apiPublic.GetCategories();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  }, []);

  const getCategoryDescriptionById = useCallback((id) => {
    // eslint-disable-next-line eqeqeq
    return categories.find((category) => category.id == id)?.name || null;
  }, [categories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const categoriesContextValue = useMemo(() => ({
    categories,
    getCategoryDescriptionById,
    loadCategories,
  }), [categories, getCategoryDescriptionById, loadCategories]);

  return (
    <CategoriesContext.Provider value={categoriesContextValue}>
      {children}
    </CategoriesContext.Provider>
  );
}

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
CategoriesProvider.defaultProps = {};

function useCategories() {
  const context = React.useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}

export { CategoriesProvider, useCategories };
