import * as apiAdministration from "@api/administration";
import * as apiPublic from "@api/public";
import AdminCategorieModalEditCategory from './AdminCategorieModalEditCategory';
import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import styles from "./AdminCategorie.module.css";
import { ACCOUNT_TYPE, SERVICE_TYPE, getConstantDescriptionByValue } from "@logic/constants";
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
      .catch((e) => openSnackbar("❌ " + e.message))
      .finally(() => setLoading(false));
  }, [openSnackbar]);

  const createCategory = useCallback(() => {
    setLoading(true);
    apiAdministration.CreateCategory()
      .then(() => loadCategories())
      .catch((e) => {
        openSnackbar("❌ " + e.message);
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
      <br></br>
      <div className='row'>
        <div className='col'>
          <div className={styles.tableCategorie}>
            <span>Id</span>
            <span>Name</span>
            <span>CategoryPrices</span>
            <span></span>
            <div className={styles.divider}></div>
            {categories.map((x) => (
              <React.Fragment key={x.id}>
                <span>{x.id}</span>
                <span>{x.name}</span>
                <span>
                  {x.categoryPrices.map((cp) => (
                    <span key={cp.accountType + "-" + cp.serviceType}>
                      {getConstantDescriptionByValue(ACCOUNT_TYPE, cp.accountType) + "/" + getConstantDescriptionByValue(SERVICE_TYPE, cp.serviceType) + ": " + cp.price}
                    </span>
                  ))}
                </span>
                <Button
                  disabled={loading}
                  onClick={() => onEditCategoryClick(x)}
                  icon="edit"
                  size="mini"
                />
                <div className={styles.divider}></div>
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
