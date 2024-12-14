import * as apiAdministration from "@api/administration";
// import * as apiPublic from "@api/public";
// import AdminCategorieModalEditCategory from './AdminCategorieModalEditCategory';
// import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import styles from "./AdminAnnunciEUtenti.module.css";
// import { ACCOUNT_TYPE, SERVICE_TYPE, getConstantDescriptionByValue } from "@logic/constants";
// import { useModals } from "@contexts/ModalsContext";
import { useSnackbars } from "@contexts/SnackbarsContext";

const AdminAnnunciEUtenti = () => {
  const { openSnackbar } = useSnackbars();
  // const { openModal, closeAllModals } = useModals();

  const [loading, setLoading] = useState(false);
  const [advertisments, setAdvertisments] = useState([]);

  const loadCategories = useCallback(() => {
    setLoading(true);
    apiAdministration.GetAdvertismentsWaitingForValidation()
      .then(setAdvertisments)
      .catch((e) => openSnackbar("❌ " + e.message))
      .finally(() => setLoading(false));
  }, [openSnackbar]);

  // const createCategory = useCallback(() => {
  //   setLoading(true);
  //   apiAdministration.CreateCategory()
  //     .then(() => loadCategories())
  //     .catch((e) => {
  //       openSnackbar("❌ " + e.message);
  //       setLoading(false);
  //     });
  // }, [loadCategories, openSnackbar]);

  // const onEditCategoryClick = useCallback((category) => {
  //   openModal({
  //     title: "Modifica categoria " + (category.name || "senza nome"),
  //     children: <AdminCategorieModalEditCategory
  //       categories={categories}
  //       category={category}
  //       onEditCallback={() => {
  //         closeAllModals();
  //         loadCategories();
  //       }}
  //     />,
  //   });
  // }, [categories, closeAllModals, loadCategories, openModal]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories])

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Gestione annunci e utenti</span>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <div className={styles.tableAnnunci}>
            <span>Id</span>
            <span>Colonna A</span>
            <div className={styles.divider}></div>
            {advertisments.map((x) => (
              <React.Fragment key={x.id}>
                <span>{x.id}</span>
                <span>{JSON.stringify(x)}</span>
                {/* <Button
                  disabled={loading}
                  onClick={() => onEditCategoryClick(x)}
                  icon="edit"
                  size="mini"
                /> */}
                <div className={styles.divider}></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAnnunciEUtenti;
