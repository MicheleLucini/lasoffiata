import * as apiAdministration from "@api/administration";
import * as apiPublic from "@api/public";
import AdminCategorieModalEditCategory from './AdminCategorieModalEditCategory';
import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import styles from "./AdminCategorie.module.css";
import { useModals } from "@contexts/ModalsContext";
import { useSnackbars } from "@contexts/SnackbarsContext";

const AdminCategorie = () => {
  const { openSnackbar } = useSnackbars();
  const { openModal, closeAllModals } = useModals();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const loadCategories = useCallback(() => {
    setLoading(true);
    apiPublic.GetCategories()
      .then(setCategories)
      .catch(() => openSnackbar("Qualcosa è andato storto durante il caricamento delle categorie ❌"))
      .finally(() => setLoading(false));
  }, [openSnackbar]);

  const createCategory = useCallback(() => {
    setLoading(true);
    apiAdministration.CreateCategory()
      .then(() => loadCategories())
      .catch(() => {
        openSnackbar("Qualcosa è andato storto durante la creazione di una categoria ❌");
        setLoading(false);
      });
  }, [loadCategories, openSnackbar]);

  const onEditCategoryClick = useCallback((category) => {
    openModal({
      title: "Modifica categoria " + (category.name || "senza nome"),
      children: <AdminCategorieModalEditCategory
        categories={categories}
        category={category}
        onEditCallback={() => {
          closeAllModals();
          loadCategories();
        }}
      />,
    });
  }, [categories, closeAllModals, loadCategories, openModal]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories])

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Gestione delle categorie</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.tableCategorie}>
            <span>Id</span>
            <span>Name</span>
            <span>CategoryPrices</span>
            <span></span>
            {categories.map((x) => (
              <React.Fragment key={x.id}>
                <span>{x.id}</span>
                <span>{x.name}</span>
                <span>{x.categoryPrices}</span>
                <Button
                  disabled={loading}
                  onClick={() => onEditCategoryClick(x)}
                  icon="edit"
                  size="mini"
                />
              </React.Fragment>
            ))}
            <div className={styles.btnCrea}>
              <Button
                disabled={loading}
                fullWidth
                onClick={createCategory}
                text="Crea nuova categoria"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategorie;
