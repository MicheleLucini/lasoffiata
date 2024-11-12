import * as logicUser from "@logic/user";
import Button from '@components/button';
import Icon from "@components/icon";
// import Link from "@components/link";
import React, { useState, useCallback } from "react";
import styles from "./MyAccount.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { selectUser } from '@store/userSlice';
import { useDialogs } from "@contexts/DialogsContext";
import { useSelector, useDispatch } from "react-redux";

const MyAccount = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const { openDialog } = useDialogs();

  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  const logout = useCallback(() => {
    setLoading(true);
    dispatch(logicUser.logout())
      .then(() => {
        navigate(ROUTES.HOME);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [dispatch, navigate]);

  const onLogoutClick = useCallback(() => {
    openDialog({
      title: "Sei sicuro di fare il logout?",
      body: "Se fai il logout dovrai reinserire username e password per rientrare.",
      confirmButtonText: "Logout",
      confirmButtonAction: logout,
    });
  }, [openDialog, logout]);

  const iconRenderer = (iconName) => (
    <div>
      <Icon
        name={iconName}
        size={40}
        fill={0}
        weight={400}
        grade={0}
        opticalSize={40}
      />
    </div>
  );

  if (!user.isLogged) {
    navigate(ROUTES.HOME);
    return null;
  }

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Benvenuto, {user.name}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.card} onClick={() => navigate(ROUTES.PERSONAL_BILLING_INFO)}>
            <span>Dati personali</span>
            <p>Gestisci i tuoi dati privati</p>
            {iconRenderer("encrypted")}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.card} onClick={() => navigate(ROUTES.PERSONAL_INFO)}>
            <span>Dati pubblici</span>
            <p>Gestisci i tuoi dati pubblici</p>
            {iconRenderer("badge")}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.card} onClick={() => navigate(ROUTES.I_MIEI_ANNUNCI)}>
            <span>I miei annunci</span>
            <p>Visualizza l'elenco degli annunci che hai creato</p>
            {iconRenderer("photo_prints")}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.card} onClick={() => navigate(ROUTES.BALANCE)}>
            <span>Il tuo bilancio</span>
            <p>Visualizza e gestisci i tuoi crediti</p>
            {iconRenderer("account_balance_wallet")}
          </div>
        </div>
      </div>
      {user.isAdmin && (
        <>
          <div className='row'>
            <div className='col'>
              <div className={styles.card + " " + styles.admin} onClick={() => navigate(ROUTES.ADMIN_ANNUNCI_E_UTENTI)}>
                <span>Validazione annunci</span>
                <p></p>
                {iconRenderer("rule")}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className={styles.card + " " + styles.admin} onClick={() => navigate(ROUTES.ADMIN_PAGAMENTI)}>
                <span>Gestisci pagamenti</span>
                <p></p>
                {iconRenderer("price_check")}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className={styles.card + " " + styles.admin} onClick={() => navigate(ROUTES.ADMIN_UTENTI)}>
                <span>Gestisci utenti</span>
                <p></p>
                {iconRenderer("manage_accounts")}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className={styles.card + " " + styles.admin} onClick={() => navigate(ROUTES.ADMIN_EDIZIONI)}>
                <span>Gestisci edizioni</span>
                <p></p>
                {iconRenderer("full_coverage")}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className={styles.card + " " + styles.admin} onClick={() => navigate(ROUTES.ADMIN_CATEGORIE)}>
                <span>Gestisci categorie</span>
                <p></p>
                {iconRenderer("category")}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className={styles.card + " " + styles.admin} onClick={() => navigate(ROUTES.ADMIN_ESPORTA_ANNUNCI)}>
                <span>Esporta annunci</span>
                <p></p>
                {iconRenderer("download")}
              </div>
            </div>
          </div>
        </>
      )}
      {/* <div className='row'>
        <div className='col'>
          <Button
            text="Checkout"
            icon="shopping_cart_checkout"
            onClick={() => navigate(ROUTES.CHECKOUT)}
          />
        </div>
      </div> */}
      <br></br>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Button
            disabled={loading}
            fullWidth
            icon="logout"
            onClick={onLogoutClick}
            text="Logout"
          />
        </div>
      </div>
    </>
  );
};

export default MyAccount;

