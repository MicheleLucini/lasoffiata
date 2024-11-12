import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { ModalsContext } from './ModalsContext';

const NavigatorContext = React.createContext();

const ROUTES = {
  ADMIN_ANNUNCI_E_UTENTI: {
    title: "Amministrazione - Annunci e utenti",
    url: "/amministrazione-annunci-utenti",
    isAdmin: true
  },
  ADMIN_CATEGORIE: {
    title: "Amministrazione - Gestione categorie",
    url: "/amministrazione-gestione-categorie",
    isAdmin: true
  },
  ADMIN_PAGAMENTI: {
    title: "Amministrazione - Gestione pagamenti",
    url: "/amministrazione-gestione-pagamenti",
    isAdmin: true
  },
  ANNUNCIO: {
    title: "Annuncio",
    url: "/annuncio",
  },
  ANNUNCIO_CREA: {
    title: "Crea annuncio",
    url: "/crea-annuncio",
  },
  ANNUNCIO_GESTISCI: {
    title: "Gestisci annuncio",
    url: "/gestisci-annuncio",
  },
  ANNUNCIO_MODIFICA: {
    title: "Modifica annuncio",
    url: "/modifica-annuncio",
  },
  BALANCE: {
    title: "Balance",
    url: "/balance",
  },
  CHECKOUT: {
    title: "Checkout",
    url: "/checkout",
  },
  FORGOT_PASSWORD: {
    title: "Recupero password",
    url: "/forgot-password",
  },
  HOME: {
    title: "Home",
    url: "/",
  },
  I_MIEI_ANNUNCI: {
    title: "I miei annunci",
    url: "/i-miei-annunci",
  },
  LOGIN: {
    title: "Accedi",
    url: "/login",
  },
  MY_ACCOUNT: {
    title: "Il mio account",
    url: "/my-account",
  },
  PERSONAL_BILLING_INFO: {
    title: "Informazioni di fatturazione",
    url: "/personal-billing-info",
  },
  PERSONAL_INFO: {
    title: "Informazioni personali",
    url: "/personal-info",
  },
  REGISTER: {
    title: "Registrati",
    url: "/register",
  },
  RESET_PASSWORD: {
    title: "Reset password",
    url: "/reset-password",
  },
  SEARCH: {
    title: "Cerca",
    url: "/cerca",
  },
  UTENTE: {
    title: "Utente",
    url: "/utente",
  },
};

const BASE_URL = window.location.host === "michelelucini.github.io" ? "/lasoffiata" : "";

function getStandardizedWindowLocationPathname() {
  return window.location.pathname.replace("/lasoffiata", "");
}

function getRouteUrlFromWindowLocation() {
  const standardizedPathname = getStandardizedWindowLocationPathname();
  if (standardizedPathname === "/") {
    return "/";
  }

  const routeFound = Object.entries(ROUTES)
    .sort((a, b) => b[1].url.length - a[1].url.length)
    .find(([key, route]) => route.url !== "/" && standardizedPathname.startsWith(route.url));

  if (routeFound) {
    return routeFound[1].url;
  }

  return null;
}

function getRouteParamsFromWindowLocation() {
  const standardizedPathname = getStandardizedWindowLocationPathname();
  if (standardizedPathname === "/") {
    return null;
  }
  const paramsArray = standardizedPathname.split("/").slice(2);
  return paramsArray.length > 0 ? paramsArray : null;
}

function getRouteFromWindowLocation(defaultRoute = ROUTES.HOME) {
  const routeUrlFromWindowLocation = getRouteUrlFromWindowLocation();
  const validRoute = Object.values(ROUTES).find((x) => x.url === routeUrlFromWindowLocation);
  return validRoute || defaultRoute;
}

function NavigatorProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);

  const { closeAllModals } = React.useContext(ModalsContext);

  const changePageTitle = useCallback((title) => (
    document.title = title + " | La Soffiata"
  ), []);

  const navigate = useCallback((route, params = null, dontChangeState) => {
    // console.log("navigating to", route.title);
    changePageTitle(route.title);

    const formattedParams = params ? `/${params.map((x) => encodeURIComponent(x)).join("/")}` : "";
    const destinationUrl = `${BASE_URL}${route.url}${formattedParams}${window.location.search}`;

    if (dontChangeState) {
      window.history.replaceState({}, "", destinationUrl);
    } else {
      window.history.pushState({}, "", destinationUrl);
    }

    setCurrentRoute({
      ...route,
      params,
    });

    window.scrollTo(0, 0);
    closeAllModals();
  }, [changePageTitle, closeAllModals]);

  const onPopState = useCallback(() => {
    navigate(
      getRouteFromWindowLocation(),
      getRouteParamsFromWindowLocation(),
      true,
    );
  }, [navigate]);

  const checkCurrentRoute = useCallback((route) => (
    currentRoute?.url === route.url
  ), [currentRoute]);

  useEffect(() => {
    navigate(
      getRouteFromWindowLocation(),
      getRouteParamsFromWindowLocation(),
    );
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [onPopState]);

  useEffect(() => {
    if (currentRoute === null) {
      return;
    }
    // console.log("current route", currentRoute.title);
    setHistory((prev) => {
      // console.log("history changed:", [...prev, currentRoute.url]);
      return [...prev, currentRoute.url];
    });
  }, [currentRoute]);

  const navigatorContextValue = useMemo(() => ({
    history,
    currentRoute,
    navigate,
    checkCurrentRoute,
    changePageTitle,
  }), [history, currentRoute, navigate, checkCurrentRoute, changePageTitle]);

  return (
    <NavigatorContext.Provider value={navigatorContextValue}>
      {children}
    </NavigatorContext.Provider>
  );
}

NavigatorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
NavigatorProvider.defaultProps = {};

function useNavigator() {
  const context = React.useContext(NavigatorContext);
  if (context === undefined) {
    throw new Error("useNavigator must be used within a NavigatorProvider");
  }
  return context;
}

export { NavigatorProvider, useNavigator, ROUTES };
