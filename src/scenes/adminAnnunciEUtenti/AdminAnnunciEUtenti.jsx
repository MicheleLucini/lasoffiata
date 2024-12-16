import * as apiAdministration from "@api/administration";
import AnnuncioPreview from '@templates/annunci/AnnuncioPreview';
import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import styles from "./AdminAnnunciEUtenti.module.css";
import { useSnackbars } from "@contexts/SnackbarsContext";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";

const AdminAnnunciEUtenti = () => {
  const { newWindow } = useNavigator();
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [advertisments, setAdvertisments] = useState([]);

  const loadAnnunciDaValidare = useCallback(() => {
    setLoading(true);
    apiAdministration.GetAdvertismentsWaitingForValidation()
      .then(setAdvertisments)
      .catch((e) => openSnackbar("❌ " + e.message))
      .finally(() => setLoading(false));
  }, [openSnackbar]);

  const validateAdvertisement = useCallback((annuncio) => {
    setLoading(true);
    apiAdministration.ValidateAdvertisement({ advertisementId: annuncio.id })
      .then(() => loadAnnunciDaValidare())
      .catch((e) => {
        openSnackbar("❌ " + e.message);
        setLoading(false);
      });
  }, [loadAnnunciDaValidare, openSnackbar]);

  const refuseAdvertisement = useCallback((annuncio) => {
    setLoading(true);
    apiAdministration.RefuseAdvertisement({ advertisementId: annuncio.id })
      .then(() => loadAnnunciDaValidare())
      .catch((e) => {
        openSnackbar("❌ " + e.message);
        setLoading(false);
      });
  }, [loadAnnunciDaValidare, openSnackbar]);

  useEffect(() => {
    loadAnnunciDaValidare();
  }, [loadAnnunciDaValidare])

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
            <span></span>
            <span>Elenco annunci in attesa di validazione</span>
            <div className={styles.divider}></div>
            {advertisments.map((x) => (
              <React.Fragment key={x.id}>
                <span>{x.id}</span>
                <div>
                  <AnnuncioPreview
                    annuncio={x}
                    suppressNavigation
                  >
                    <div className={styles.azioniAnnuncio}>
                      <Button
                        color="primary"
                        disabled={loading}
                        icon="thumb_up"
                        onClick={() => validateAdvertisement(x)}
                        size="mini"
                        text="Valida"
                      />
                      <Button
                        color="secondary"
                        disabled={loading}
                        icon="thumb_down"
                        onClick={() => refuseAdvertisement(x)}
                        size="mini"
                        text="Rifiuta"
                      />
                    </div>
                    <div className={styles.azioniAnnuncio}>
                      <Button
                        color="secondary"
                        disabled={loading}
                        icon="open_in_new"
                        onClick={() => newWindow(ROUTES.ANNUNCIO, [x.id])}
                        size="mini"
                        text="Annuncio"
                      />
                      <Button
                        color="secondary"
                        disabled={loading}
                        icon="open_in_new"
                        onClick={() => newWindow(ROUTES.UTENTE, [x.userId])}
                        size="mini"
                        text={"Utente " + x.user.advertisementName}
                      />
                    </div>
                  </AnnuncioPreview>
                </div>
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
