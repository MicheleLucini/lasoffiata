import * as apiPublic from "@api/public";
import AnnuncioPreview from '@templates/annunci/AnnuncioPreview';
import Button from "@components/button";
import Icon from "@components/icon";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import moment from 'moment';
import styles from "./IMieiAnnunci.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { checkConstant, VALIDATION_STATUS } from "@logic/constants";
import { selectUser } from '@store/userSlice';
import { useSelector } from "react-redux";

const IMieiAnnunci = () => {
  const user = useSelector(selectUser);
  const { navigate } = useNavigator();
  // const { openDialog } = useDialogs();
  // const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const loadUserAdvertisements = useCallback(async () => {
    setLoading(true);
    apiPublic.GetUserAdvertisements({ userId: user.id })
      .then((data) => setAdvertisements(data))
      .catch(() => setAdvertisements([]))
      .finally(() => setLoading(false));
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
    advertisements.map((x) => {
      // const isMaiStatoAttivato = x.publishDate === "0001-01-01T00:00:00Z";
      let icon = "event_available";
      let className = styles.success;
      let text = "Attivo";
      // if (isMaiStatoAttivato) {
      //   icon = "savings";
      //   className = styles.warning;
      //   text = "Pagamento richiesto";
      // } else       
      if (x.isSuspended) {
        icon = "pause_circle";
        className = styles.error;
        text = "Sospeso";
      } else if (x.isExpired) {
        icon = "event_busy";
        className = styles.error;
        text = "Scaduto";
      } else if (checkConstant(VALIDATION_STATUS.WAITING, x.validationStatus)) {
        icon = "hourglass_empty";
        className = "";
        text = "In attesa di verifica";
      } else if (checkConstant(VALIDATION_STATUS.REFUSED, x.validationStatus)) {
        icon = "block";
        className = styles.error;
        text = "Rifiutato";
      }

      return (
        <AnnuncioPreview
          key={x.id}
          annuncio={x}
          suppressNavigation
        // loading={loading}
        // onRipubblica={ripubblica}
        // onSospendi={sospendi}
        // onElimina={onEliminaClick}
        >
          <div className={styles.actions}>
            <span className={styles.status + " " + className}>
              <Icon
                name={icon}
                size={18}
                fill={1}
                weight={400}
                grade={-25}
                opticalSize={20}
              />
              {text}
            </span>
            <Button
              icon="settings"
              text="Gestisci"
              onClick={() => navigate(ROUTES.ANNUNCIO_GESTISCI, [x.id])}
              disabled={loading}
              size="mini"
            />
          </div>
        </AnnuncioPreview>
      );
    })
  ), [advertisements, loading, navigate]); //, ripubblica, sospendi, onEliminaClick]);

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
        <div className='col col-flex-center'>
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
