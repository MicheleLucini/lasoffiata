import React from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Annuncio from "@scenes/annuncio";
import Home from "@scenes/home";
import Login from "@scenes/login";
import PersonalInfo from "@scenes/personalInfo";
import Register from "@scenes/register";
import Administration from "@scenes/administration";
import AdminValidazioneAnnunci from "@scenes/adminValidazioneAnnunci";
import AdminPagamenti from "@scenes/adminPagamenti";
import AdminUtenti from "@scenes/adminUtenti";
import AdminEdizioni from "@scenes/adminEdizioni";
import AdminCategorie from "@scenes/adminCategorie";
import AdminEsportaAnnunci from "@scenes/adminEsportaAnnunci";

const AppRouting = () => {
  const { checkCurrentRoute } = useNavigator();

  return (
    <>
      {checkCurrentRoute(ROUTES.ANNUNCIO) && <Annuncio />}
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
      {checkCurrentRoute(ROUTES.PERSONALINFO) && <PersonalInfo />}
      {checkCurrentRoute(ROUTES.REGISTER) && <Register />}
      {checkCurrentRoute(ROUTES.ADMIN) && <Administration />}
      {checkCurrentRoute(ROUTES.ADMIN_VALIDAZIONE_ANNUNCI) && <AdminValidazioneAnnunci />}
      {checkCurrentRoute(ROUTES.ADMIN_PAGAMENTI) && <AdminPagamenti />}
      {checkCurrentRoute(ROUTES.ADMIN_UTENTI) && <AdminUtenti />}
      {checkCurrentRoute(ROUTES.ADMIN_EDIZIONI) && <AdminEdizioni />}
      {checkCurrentRoute(ROUTES.ADMIN_CATEGORIE) && <AdminCategorie />}
      {checkCurrentRoute(ROUTES.ADMIN_ESPORTA_ANNUNCI) && <AdminEsportaAnnunci />}
    </>
  );
};

export default AppRouting;
