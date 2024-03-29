import { selectUser } from '@store/userSlice';
import { useSelector } from 'react-redux';
import Icon from "@components/icon";
import Link from "@components/link";
import React, { useMemo } from "react";
import styles from "./AppNavBar.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";

const AppNavBar = () => {
  const { checkCurrentRoute } = useNavigator();
  const user = useSelector(selectUser);

  const routeMyAccount = useMemo(() => (
    user.isLogged ? ROUTES.MY_ACCOUNT : ROUTES.LOGIN
  ), [user.isLogged]);

  const isHomeCurrentRoute = useMemo(() => {
    return checkCurrentRoute(ROUTES.HOME);
  }, [checkCurrentRoute]);

  const isSearchCurrentRoute = useMemo(() => {
    return checkCurrentRoute(ROUTES.SEARCH);
  }, [checkCurrentRoute]);

  const isMyAccountCurrentRoute = useMemo(() => {
    return checkCurrentRoute(ROUTES.LOGIN)
      || checkCurrentRoute(ROUTES.MY_ACCOUNT)
      || checkCurrentRoute(ROUTES.BALANCE)
      || checkCurrentRoute(ROUTES.I_MIEI_ANNUNCI)
      || checkCurrentRoute(ROUTES.PERSONAL_BILLING_INFO)
      || checkCurrentRoute(ROUTES.PERSONAL_INFO)
      || checkCurrentRoute(ROUTES.REGISTER)
      || checkCurrentRoute(ROUTES.FORGOT_PASSWORD)
      || checkCurrentRoute(ROUTES.RESET_PASSWORD);
  }, [checkCurrentRoute]);

  // const showCurrentUserGreeting = useMemo(() => (
  //   user.isLogged
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
    <div className={styles.navBar}>
      <Link route={ROUTES.HOME}>
        <Icon
          name="home"
          fill={0}
          weight={isHomeCurrentRoute ? 700 : 400}
          grade={0}
          opticalSize={24}
          className={isHomeCurrentRoute ? styles.active : ""}
          size={26}
        />
      </Link>
      <Link route={ROUTES.SEARCH}>
        <Icon
          name="search"
          fill={0}
          weight={isSearchCurrentRoute ? 700 : 400}
          grade={0}
          opticalSize={24}
          className={isSearchCurrentRoute ? styles.active : ""}
          size={26}
        />
      </Link>
      <Link route={routeMyAccount}>
        <Icon
          name="person"
          fill={0}
          weight={isMyAccountCurrentRoute ? 700 : 400}
          grade={0}
          opticalSize={24}
          className={isMyAccountCurrentRoute ? styles.active : ""}
          size={26}
        />
      </Link>
      {/* <Link route={ROUTES.HOME}>
        <Icon
          name="menu"
          fill={0}
          weight={400}
          grade={0}
          opticalSize={24}
          size={26}
        />
      </Link> */}
    </div>
  );
};

export default AppNavBar;
