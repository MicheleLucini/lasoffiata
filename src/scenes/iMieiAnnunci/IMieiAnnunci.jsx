import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from '@store/userSlice';
// import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import RigaAnnuncio from "./RigaAnnuncio";
// import Button from "@components/button";
import * as apiPublic from "@api/public";
import styles from "./IMieiAnnunci.module.css";
import { useDialogs } from "@contexts/DialogsContext";
import { useSnackbar } from "@contexts/SnackbarContext";
import * as apiUser from "@api/user";

const IMieiAnnunci = () => {
  const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  const { openDialog } = useDialogs();
  const { openSnackbar } = useSnackbar();
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

  const ripubblica = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiUser.RepublishAdvertisement({ advertisementId: id });
    } catch (e) {
      openSnackbar({ text: e.message });
    }
    loadUserAdvertisements();
  }, [loadUserAdvertisements, openSnackbar]);

  const sospendi = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiUser.SuspendAdvertisement({ advertisementId: id });
    } catch (e) {
      openSnackbar({ text: e.message });
    }
    loadUserAdvertisements();
  }, [loadUserAdvertisements, openSnackbar]);

  const elimina = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiUser.DeleteAdvertisement({ advertisementId: id });
    } catch (e) {
      openSnackbar({ text: e.message });
    }
    loadUserAdvertisements();
  }, [loadUserAdvertisements, openSnackbar]);

  const onEliminaClick = useCallback(({ id, title }) => {
    openDialog({
      title: 'Eliminare l\'annuncio "' + title + '"?',
      body: 'Se confermi l\'annuncio verrà rimosso definitivamente.',
      confirmButtonText: "Elimina",
      confirmButtonAction: () => elimina(id),
    });
  }, [openDialog, elimina]);

  const annunciList = useMemo(() => (
    advertisements.map((x) => (
      <React.Fragment key={x.id}>
        <RigaAnnuncio
          annuncio={x}
          loading={loading}
          onRipubblica={ripubblica}
          onSospendi={sospendi}
          onElimina={onEliminaClick}
        />
        <hr />
      </React.Fragment>
    ))
  ), [advertisements, loading, ripubblica, sospendi, onEliminaClick]);

  useEffect(() => {
    loadUserAdvertisements();
  }, [loadUserAdvertisements]);

  return (
    <>
      <span>I miei annunci</span>
      <div className={styles.wrapperAnnunci}>
        {annunciList}
      </div>
    </>
  );
};

export default IMieiAnnunci;
