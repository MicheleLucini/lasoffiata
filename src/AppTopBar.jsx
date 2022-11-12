import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '@store/userSlice';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import LogoHeader from "@assets/logo_header_white.png";
import Icon from "@components/icon";
import Link from "@components/link";
import styles from "./AppTopBar.module.css";

const AppTopBar = () => {
  const { checkCurrentRoute } = useNavigator();
  const user = useSelector(selectUser);

  const showCurrentUserGreeting = useMemo(() => (
    user.isLogged
  ), [user.isLogged]);

  const showLoginHero = useMemo(() => (
    checkCurrentRoute(ROUTES.LOGIN)
  ), [checkCurrentRoute]);

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        {/* <Link route={ROUTES.HOME}>
          <Icon
            name="arrow_back"
            fill={0}
            weight={400}
            grade={0}
            opticalSize={24}
          />
        </Link> */}
        <Link route={ROUTES.HOME}>
          <img alt='Logo soffiata' className={styles.logo} src={LogoHeader} />
        </Link>
      </div>
      <div className={styles.topBarCenter}></div>
      <div className={styles.topBarRight}>
        {checkCurrentRoute(ROUTES.HOME) && (
          <>
            <Link route={ROUTES.LOGIN}>
              <Icon
                name="person"
                fill={user.isLogged ? 1 : 0}
                weight={400}
                grade={0}
                opticalSize={24}
              />
            </Link>
            <Link route={ROUTES.LOGIN}>
              <Icon
                name="shopping_basket"
                fill={0}
                weight={400}
                grade={0}
                opticalSize={24}
              />
            </Link>
          </>
        )}
      </div >
      <div className={styles.topBarSub}>
        {showCurrentUserGreeting && (
          <span className={styles.logged}>Ciao {user.email}! ✨</span>
        )}
        {showLoginHero && (
          <span className={styles.login}>
            Ciao!
            <br />
            Accedi al tuo account la soffiata.
          </span>
        )}
      </div >
    </div >
  );
};

export default AppTopBar;
