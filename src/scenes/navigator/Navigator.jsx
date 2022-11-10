import React from "react";
import { ROUTES, useNavigator } from "../../contexts/NavigatorContext";
import Login from "../login";
import Home from "../home";

const Navigator = () => {
  const { checkCurrentRoute } = useNavigator();

  return (
    <>
      {checkCurrentRoute(ROUTES.HOME) && <Home />}
      {checkCurrentRoute(ROUTES.LOGIN) && <Login />}
    </>
  );
};

export default Navigator;
