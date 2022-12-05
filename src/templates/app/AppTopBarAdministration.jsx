import React from "react";
import { ROUTES } from "@contexts/NavigatorContext";
import Link from "@components/link";
import styles from "./AppTopBarUser.module.css";

const AppTopBarAdministration = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <Link route={ROUTES.HOME}>
          🡐 torna al sito
        </Link>
      </div>
      <div className={styles.topBarCenter}></div>
      <div className={styles.topBarRight}></div>
      <div className={styles.topBarSub}>
        <Link route={ROUTES.ADMIN_VALIDAZIONE_ANNUNCI}>Validazione annunci</Link>
        <Link route={ROUTES.ADMIN_PAGAMENTI}>Gestisci pagamenti</Link>
        <Link route={ROUTES.ADMIN_UTENTI}>Gestisci utenti</Link>
        <Link route={ROUTES.ADMIN_EDIZIONI}>Gestisci edizioni</Link>
        <Link route={ROUTES.ADMIN_CATEGORIE}>Gestisci categorie</Link>
        <Link route={ROUTES.ADMIN_ESPORTA_ANNUNCI}>Esporta annunci</Link>
      </div>
    </div>
  );
};

export default AppTopBarAdministration;
