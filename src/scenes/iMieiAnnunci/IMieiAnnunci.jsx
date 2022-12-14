import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from '@store/userSlice';
// import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import RigaAnnuncio from "./RigaAnnuncio";
// import Button from "@components/button";
import * as apiPublic from "@api/public";
import styles from "./IMieiAnnunci.module.css";
import { useDialogs } from "@contexts/DialogsContext";
import * as apiUser from "@api/user";

const IMieiAnnunci = () => {
  const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  const { openDialog } = useDialogs();
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const elimina = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiUser.DeleteAdvertisement({ advertisementId: id });
      setAdvertisements((prev) => prev.filter((x) => x.id !== id));
    } catch { }
    setLoading(false);
  }, []);

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
          onElimina={onEliminaClick}
        />
        <hr />
      </React.Fragment>
    ))
  ), [advertisements, loading, onEliminaClick]);

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
