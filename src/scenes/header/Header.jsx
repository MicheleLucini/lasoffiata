import React from "react";
import { ROUTES, useNavigator } from "../../contexts/NavigatorContext";
import "./header.css";
import LogoHeader from "../../assets/logo_header_white.png";

const Header = () => {
  const { navigate, checkCurrentRoute } = useNavigator();
  return (
    <div className="app-bar">
      <div className="abl">
        {/* <a onClick={() => navigate(ROUTES.HOME)}>
          <span className="material-symbols-rounded">arrow_back</span>
        </a> */}
        <a onClick={() => navigate(ROUTES.HOME)}>
          <img className="logo" src={LogoHeader} />
        </a>
      </div>
      <div className="abc"></div>
      <div className="abr">
        {checkCurrentRoute(ROUTES.HOME) && (
          <>
            <a onClick={() => navigate(ROUTES.LOGIN)}>
              <span className="material-symbols-rounded">person</span>
            </a>
            <a onClick={() => navigate(ROUTES.LOGIN)}>
              <span className="material-symbols-rounded">shopping_basket</span>
            </a>
          </>
        )}
      </div>
      <div className="absub">
        {checkCurrentRoute(ROUTES.LOGIN) ? (
          <span className="login">
            Ciao!
            <br />
            Accedi al tuo account la soffiata.
          </span>
        ) : (
          <span className="logged">Ciao Michele! ✨</span>
        )}
      </div>
    </div>
  );
};

export default Header;
