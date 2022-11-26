import React from "react";
// import { useSelector } from 'react-redux';
// import { selectUser } from '@store/userSlice';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Home from "@scenes/home";
import Login from "@scenes/login";
import Register from "@scenes/register";
import Annuncio from "@scenes/annuncio";

const AppRouting = () => {
  const { checkCurrentRoute } = useNavigator();
  // const user = useSelector(selectUser);

  // console.log(user);

  return (
    <>
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
      {checkCurrentRoute(ROUTES.REGISTER) && <Register />}
      {checkCurrentRoute(ROUTES.ANNUNCIO) && <Annuncio />}
    </>
  );
};

export default AppRouting;
