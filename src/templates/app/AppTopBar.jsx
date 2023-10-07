// import { selectUser } from '@store/userSlice';
// import { useSelector } from 'react-redux';
import Icon from "@components/icon";
import Link from "@components/link";
import Logo from "@components/svgs/Logo";
import React, { useMemo } from "react";
import styles from "./AppTopBar.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";

const AppTopBar = () => {
  // const { checkCurrentRoute } = useNavigator();
  // const user = useSelector(selectUser);

  // const backArrowRoute = useMemo(() => {
  //   // if (checkCurrentRoute(ROUTES.ANNUNCIO)) return ROUTES.HOME;
  //   if (checkCurrentRoute(ROUTES.PERSONAL_INFO)) return ROUTES.MY_ACCOUNT;
  //   if (checkCurrentRoute(ROUTES.I_MIEI_ANNUNCI)) return ROUTES.MY_ACCOUNT;
  //   return null;
  // }, [checkCurrentRoute]);

  // const showCurrentUserGreeting = useMemo(() => (
  //   user.isLogged
  // ), [user.isLogged]);

  // const userIconLinkRoute = useMemo(() => (
  //   user.isLogged ? ROUTES.PERSONAL_INFO : ROUTES.LOGIN
  // ), [user.isLogged]);

  // const userIsAdmin = useMemo(() => (
  //   user.isAdmin
  // ), [user.isAdmin]);

  // const showLoginHero = useMemo(() => (
  //   checkCurrentRoute(ROUTES.LOGIN)
  // ), [checkCurrentRoute]);

  // const showRegisterHero = useMemo(() => (
  //   checkCurrentRoute(ROUTES.REGISTER)
  // ), [checkCurrentRoute]);

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        {/* {backArrowRoute && (
          <Link route={backArrowRoute}>
            <Icon
              name="arrow_back"
              fill={0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
          </Link>
        )} */}
      </div>
      <div className={styles.topBarCenter}>
        {/* <Link route={ROUTES.HOME}> */}
          <Logo className={styles.logo} />
        {/* </Link> */}
      </div>
      <div className={styles.topBarRight}>
        {/* {!showLoginHero && !showRegisterHero && (
          <Link route={userIconLinkRoute}>
            <Icon
              name="person"
              fill={user.isLogged ? 1 : 0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
          </Link>
        )} */}
        {/* {userIsAdmin && (
          <Link route={ROUTES.ADMIN}>
            <Icon
              name="key"
              fill={0}
              weight={400}
              grade={0}
              opticalSize={24}
            />
          </Link>
        )} */}
      </div >
    </div >
  );
};

export default AppTopBar;
