import React from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Home from "@scenes/home";
import Login from "@scenes/login";

const AppRouting = () => {
  const { checkCurrentRoute } = useNavigator();

  return (
    <>
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
    </>
  );
};

export default AppRouting;
