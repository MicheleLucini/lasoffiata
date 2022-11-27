import React from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Annuncio from "@scenes/annuncio";
import Home from "@scenes/home";
import Login from "@scenes/login";
import PersonalInfo from "@scenes/personalInfo";
import Register from "@scenes/register";

const AppRouting = () => {
  const { checkCurrentRoute } = useNavigator();

  return (
    <>
      {checkCurrentRoute(ROUTES.ANNUNCIO) && <Annuncio />}
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
      {checkCurrentRoute(ROUTES.PERSONALINFO) && <PersonalInfo />}
      {checkCurrentRoute(ROUTES.REGISTER) && <Register />}
    </>
  );
};

export default AppRouting;
