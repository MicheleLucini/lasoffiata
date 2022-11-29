import React, { useMemo } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Link from "@components/link";
import styles from "./AppTopBarUser.module.css";

const AppTopBarAdministration = () => {
  const { checkCurrentRoute } = useNavigator();

  const showLoginHero = useMemo(() => (
    checkCurrentRoute(ROUTES.LOGIN)
  ), [checkCurrentRoute]);

  const showRegisterHero = useMemo(() => (
    checkCurrentRoute(ROUTES.REGISTER)
  ), [checkCurrentRoute]);

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <Link route={ROUTES.HOME}>
          🡐 torna al sito
        </Link>
      </div>
      <div className={styles.topBarCenter}></div>
      <div className={styles.topBarRight}>
        {!showLoginHero && !showRegisterHero && (
          <>
          <Link route={ROUTES.ADMIN_VALIDAZIONE_ANNUNCI}>Validazione annunci</Link>
          <Link route={ROUTES.ADMIN_PAGAMENTI}>gestisci pagamenti</Link>
          <Link route={ROUTES.ADMIN_UTENTI}>gestisci utenti</Link>
          <Link route={ROUTES.ADMIN_EDIZIONI}>gestisci edizioni</Link>
          <Link route={ROUTES.ADMIN_CATEGORIE}>gestisci categorie</Link>
          <Link route={ROUTES.ADMIN_ESPORTA_ANNUNCI}>esporta annunci</Link>
          </>
        )}
      </div >
    </div >
  );
};

export default AppTopBarAdministration;
