import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '@store/userSlice';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import AdminCategorie from "@scenes/adminCategorie";
import AdminEdizioni from "@scenes/adminEdizioni";
import AdminEsportaAnnunci from "@scenes/adminEsportaAnnunci";
import AdminPagamenti from "@scenes/adminPagamenti";
import AdminUtenti from "@scenes/adminUtenti";
import AdminValidazioneAnnunci from "@scenes/adminValidazioneAnnunci";
import Administration from "@scenes/administration";
import Annuncio from "@scenes/annuncio";
import CreaAnnuncio from "@scenes/creaAnnuncio";
import Home from "@scenes/home";
import IMieiAnnunci from "@scenes/iMieiAnnunci";
import Login from "@scenes/login";
import PersonalInfo from "@scenes/personalInfo";
import Register from "@scenes/register";

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
      {checkCurrentRoute(ROUTES.CREA_ANNUNCIO) && <CreaAnnuncio />}
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.I_MIEI_ANNUNCI) && <IMieiAnnunci />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
      {checkCurrentRoute(ROUTES.PERSONALINFO) && <PersonalInfo />}
      {checkCurrentRoute(ROUTES.REGISTER) && <Register />}
    </>
  );
};

export default AppRouting;
