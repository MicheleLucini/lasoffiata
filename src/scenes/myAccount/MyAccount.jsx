import * as logicUser from "@logic/user";
import Button from '@components/button';
import Icon from "@components/icon";
import Link from "@components/link";
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

  if (!user.isLogged) {
    navigate(ROUTES.HOME);
    return null;
  }

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Benvenuto, {user.name + " " + user.lastName}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.card} onClick={() => navigate(ROUTES.PERSONAL_INFO)}>
            <span>Dati personali</span>
            <p>Visualizza i dati del tuo account</p>
            <div>
              <Icon
                name="badge"
                size={40}
                fill={0}
                weight={400}
                grade={0}
                opticalSize={40}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.card} onClick={() => navigate(ROUTES.I_MIEI_ANNUNCI)}>
            <span>I tuoi annunci</span>
            <p>Visualizza l'elenco degli annunci che hai creato</p>
            <div>
              <Icon
                name="list"
                size={40}
                fill={0}
                weight={400}
                grade={0}
                opticalSize={40}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            text="Checkout"
            icon="shopping_cart_checkout"
            onClick={() => navigate(ROUTES.CHECKOUT)}
          />
        </div>
      </div>
      {user.isAdmin && (
        <>
          <br></br>
          <div className='row'>
            <div className='col'>
              <Link route={ROUTES.ADMIN_VALIDAZIONE_ANNUNCI}>Validazione annunci</Link>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link route={ROUTES.ADMIN_PAGAMENTI}>Gestisci pagamenti</Link>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link route={ROUTES.ADMIN_UTENTI}>Gestisci utenti</Link>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link route={ROUTES.ADMIN_EDIZIONI}>Gestisci edizioni</Link>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link route={ROUTES.ADMIN_CATEGORIE}>Gestisci categorie</Link>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Link route={ROUTES.ADMIN_ESPORTA_ANNUNCI}>Esporta annunci</Link>
            </div>
          </div>
        </>
      )}
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

