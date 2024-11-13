import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import * as apiAdministration from "@api/administration";

import styles from "./AdminAnnunciEUtenti.module.css";

const AdminAnnunciEUtenti = () => {
  const [annunci, setAnnunci] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const { navigate } = useNavigator();

  const loadAnnunci = useCallback(async () => {
    const data = await apiAdministration.GetAdvertismentsWaitingForValidation();
    setAnnunci(data);
  }, []);

  const onRifiutaClick = useCallback(async (id) => {
    setLoading(true);
    setFormErrors(null);

    apiAdministration.RefuseAdvertisement({
      id: id
    })
      .then(() => {
        loadAnnunci();
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadAnnunci]);

  const onApprovaClick = useCallback(async (id) => {
    setLoading(true);
    setFormErrors(null);

    apiAdministration.ValidateAdvertisement({
      id: id
    })
      .then(() => {
        loadAnnunci();
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadAnnunci]);

  useEffect(() => {
    loadAnnunci();
  }, [loadAnnunci]);

  const annunciList = useMemo(() => {
    return annunci?.map((x) =>
      <div key={x.id}>
        Titolo: {x.title}<br />
        Descrizione: {x.description}<br />

        <button
          onClick={() => navigate(ROUTES.ANNUNCIO, [x.id])}
          disabled={loading}>
          visualizza
        </button>

        <button
          disabled={loading}>
          modifica
        </button>

        <button
          onClick={() => onApprovaClick(x.id)}
          disabled={loading}>
          approva
        </button>

        <button
          onClick={() => onRifiutaClick(x.id)}
          disabled={loading}>
          rifiuta
        </button>
      </div>)
  }, [annunci, loading, onApprovaClick, onRifiutaClick, navigate]);

  return (
    <>
      <h1>Validazione annunci</h1>
      <div className={styles.wrapperAnnunci}>
        {annunciList}
      </div>
      {formErrors && <span className={`${styles.formMessage} ${styles.error}`}>{formErrors}</span>}
    </>
  );
};

export default AdminAnnunciEUtenti;
