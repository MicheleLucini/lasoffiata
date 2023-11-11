import * as apiPublic from "@api/public";
// import * as apiUser from "@api/user";
import Button from "@components/button";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import RigaAnnuncio from "./RigaAnnuncio";
import styles from "./IMieiAnnunci.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { selectUser } from '@store/userSlice';
// import { useDialogs } from "@contexts/DialogsContext";
import { useSelector } from "react-redux";
// import { useSnackbars } from "@contexts/SnackbarsContext";

const IMieiAnnunci = () => {
  const user = useSelector(selectUser);
  const { navigate } = useNavigator();
  // const { openDialog } = useDialogs();
  // const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const loadUserAdvertisements = useCallback(async () => {
    setLoading(true);
    let data;
    try {
      data = await apiPublic.GetUserAdvertisements({ userId: user.id });
    } catch {
      data = [];
    }
    setAdvertisements(data);
    setLoading(false);
  }, [user.id]);

  // const ripubblica = useCallback(async (id) => {
  //   setLoading(true);
  //   try {
  //     await apiUser.RepublishAdvertisement({ advertisementId: id });
  //   } catch (e) {
  //     openSnackbar(e.message);
  //   }
  //   loadUserAdvertisements();
  // }, [loadUserAdvertisements, openSnackbar]);

  // const sospendi = useCallback(async (id) => {
  //   setLoading(true);
  //   try {
  //     await apiUser.SuspendAdvertisement({ advertisementId: id });
  //   } catch (e) {
  //     openSnackbar(e.message);
  //   }
  //   loadUserAdvertisements();
  // }, [loadUserAdvertisements, openSnackbar]);

  // const elimina = useCallback(async (id) => {
  //   setLoading(true);
  //   try {
  //     await apiUser.DeleteAdvertisement({ advertisementId: id });
  //   } catch (e) {
  //     openSnackbar(e.message);
  //   }
  //   loadUserAdvertisements();
  // }, [loadUserAdvertisements, openSnackbar]);

  // const onEliminaClick = useCallback(({ id, title }) => {
  //   openDialog({
  //     title: 'Eliminare l\'annuncio "' + title + '"?',
  //     body: 'Se confermi l\'annuncio verrà rimosso definitivamente.',
  //     confirmButtonText: "Elimina",
  //     confirmButtonAction: () => elimina(id),
  //   });
  // }, [openDialog, elimina]);

  const annunciList = useMemo(() => (
    advertisements.map((x) => (
      <div key={x.id} className={styles.annuncio}>
        <RigaAnnuncio
          annuncio={x}
          loading={loading}
          // onRipubblica={ripubblica}
          // onSospendi={sospendi}
          // onElimina={onEliminaClick}
        />
      </div>
    ))
  ), [advertisements, loading]); //, ripubblica, sospendi, onEliminaClick]);

  useEffect(() => {
    loadUserAdvertisements();
  }, [loadUserAdvertisements]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>I miei annunci</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            text="Crea annuncio"
            icon="add"
            onClick={() => navigate(ROUTES.ANNUNCIO_CREA)}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.wrapperAnnunci}>
            {annunciList}
          </div>
        </div>
      </div>
    </>
  );
};

export default IMieiAnnunci;
