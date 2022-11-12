import React from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '@store/userSlice';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import LogoHeader from "@assets/logo_header_white.png";
import Icon from "@components/icon";
import "./header.css";

const Header = () => {
  const { navigate, checkCurrentRoute } = useNavigator();
  const user = useSelector(selectUser);

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
              <Icon
                name="person"
                fill={user.isLogged ? 1 : 0}
                weight={400}
                grade={0}
                opticalSize={24}
              />
            </a>
            <a onClick={() => navigate(ROUTES.LOGIN)}>
              <Icon
                name="shopping_basket"
                fill={0}
                weight={400}
                grade={0}
                opticalSize={24}
              />
            </a>
          </>
        )}
      </div>
      <div className="absub">
        {checkCurrentRoute(ROUTES.LOGIN) && !user.isLogged ? (
          <span className="login">
            Ciao!
            <br />
            Accedi al tuo account la soffiata.
          </span>
        ) : (
          <span className="logged">Ciao {user.email}! ✨</span>
        )}
      </div>
    </div >
  );
};

export default Header;
