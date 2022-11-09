import React from "react";
import { ROUTES, useNavigator } from "../../contexts/NavigatorContext";
import Login from "../login";
import Home from "../home";

const Navigator = () => {
  const { currentRoute } = useNavigator();

  return (
    <>
      {currentRoute === ROUTES.HOME.url && <Home />}
      {currentRoute === ROUTES.LOGIN.url && <Login />}
    </>
  );
};

export default Navigator;
