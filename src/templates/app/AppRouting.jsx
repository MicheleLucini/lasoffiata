import AdminCategorie from "@scenes/adminCategorie";
import AdminEdizioni from "@scenes/adminEdizioni";
import AdminEsportaAnnunci from "@scenes/adminEsportaAnnunci";
import AdminPagamenti from "@scenes/adminPagamenti";
import AdminUtenti from "@scenes/adminUtenti";
import AdminValidazioneAnnunci from "@scenes/adminValidazioneAnnunci";
import Administration from "@scenes/administration";
import Annuncio from "@scenes/annuncio";
import AnnuncioCrea from "@scenes/annuncioCrea";
import AnnuncioGestisci from "@scenes/annuncioGestisci";
import AnnuncioModifica from "@scenes/annuncioModifica";
import Balance from "@scenes/balance";
import Checkout from "@scenes/checkout";
import Home from "@scenes/home";
import IMieiAnnunci from "@scenes/iMieiAnnunci";
import Login from "@scenes/login";
import MyAccount from "@scenes/myAccount";
import PersonalBillingInfo from "@scenes/personalBillingInfo";
import PersonalInfo from "@scenes/personalInfo";
import React, { useMemo } from "react";
import Register from "@scenes/register";
import Search from "@scenes/search";
import Utente from "@scenes/utente";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { selectUser } from '@store/userSlice';
import { useSelector } from 'react-redux';

const AppRouting = () => {
  const { checkCurrentRoute } = useNavigator();
  const user = useSelector(selectUser);

  const userIsAdmin = useMemo(() => (
    user.isAdmin
  ), [user.isAdmin]);

  return (
    <>
      {userIsAdmin && (
        <>
          {checkCurrentRoute(ROUTES.ADMIN) && <Administration />}
          {checkCurrentRoute(ROUTES.ADMIN_CATEGORIE) && <AdminCategorie />}
          {checkCurrentRoute(ROUTES.ADMIN_EDIZIONI) && <AdminEdizioni />}
          {checkCurrentRoute(ROUTES.ADMIN_ESPORTA_ANNUNCI) && <AdminEsportaAnnunci />}
          {checkCurrentRoute(ROUTES.ADMIN_PAGAMENTI) && <AdminPagamenti />}
          {checkCurrentRoute(ROUTES.ADMIN_UTENTI) && <AdminUtenti />}
          {checkCurrentRoute(ROUTES.ADMIN_VALIDAZIONE_ANNUNCI) && <AdminValidazioneAnnunci />}
        </>
      )}
      {checkCurrentRoute(ROUTES.ANNUNCIO) && <Annuncio />}
      {checkCurrentRoute(ROUTES.ANNUNCIO_CREA) && <AnnuncioCrea />}
      {checkCurrentRoute(ROUTES.ANNUNCIO_GESTISCI) && <AnnuncioGestisci />}
      {checkCurrentRoute(ROUTES.ANNUNCIO_MODIFICA) && <AnnuncioModifica />}
      {checkCurrentRoute(ROUTES.BALANCE) && <Balance />}
      {checkCurrentRoute(ROUTES.CHECKOUT) && <Checkout />}
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.I_MIEI_ANNUNCI) && <IMieiAnnunci />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
      {checkCurrentRoute(ROUTES.MY_ACCOUNT) && <MyAccount />}
      {checkCurrentRoute(ROUTES.PERSONAL_BILLING_INFO) && <PersonalBillingInfo />}
      {checkCurrentRoute(ROUTES.PERSONAL_INFO) && <PersonalInfo />}
      {checkCurrentRoute(ROUTES.REGISTER) && <Register />}
      {checkCurrentRoute(ROUTES.SEARCH) && <Search />}
      {checkCurrentRoute(ROUTES.UTENTE) && <Utente />}
    </>
  );
};

export default AppRouting;
