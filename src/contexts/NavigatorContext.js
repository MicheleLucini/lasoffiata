import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const NavigatorContext = React.createContext();

const ROUTES = {
  ANNUNCIO: {
    title: "Annuncio",
    url: "/annuncio",
  },
  HOME: {
    title: "Home",
    url: "/",
  },
  LOGIN: {
    title: "Accedi",
    url: "/login",
  },
  PERSONALINFO: {
    title: "Informazioni personali",
    url: "/personal-info",
  },
  REGISTER: {
    title: "Registrati",
    url: "/register",
  },
  ADMIN: {
    title: "Amministrazione",
    url: "/amministrazione",
  },
  ADMIN_VALIDAZIONE_ANNUNCI: {
    title: "Amministrazione - Validazione annunci",
    url: "/amministrazione-validazione-annunci",
  },
  ADMIN_PAGAMENTI: {
    title: "Amministrazione - Gestione pagamenti",
    url: "/amministrazione-gestione-pagamenti",
  },
  ADMIN_UTENTI: {
    title: "Amministrazione - Gestione utenti",
    url: "/amministrazione-gestione-utenti",
  },
  ADMIN_EDIZIONI: {
    title: "Amministrazione - Gestione edizioni",
    url: "/amministrazione-gestione-edizioni",
  },
  ADMIN_CATEGORIE: {
    title: "Amministrazione - Gestione categorie",
    url: "/amministrazione-gestione-categorie",
  },
  ADMIN_ESPORTA_ANNUNCI: {
    title: "Amministrazione - Esporta annunci",
    url: "/amministrazione-esporta-annunci",
  }
};

const BASE_URL = window.location.host === "michelelucini.github.io" ? "/lasoffiata" : "";

function getStandardizedWindowLocationPathname() {
  return window.location.pathname.toLowerCase().replace("/lasoffiata", "");
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
  const routeUrl = getRouteUrlFromWindowLocation();
  const paramsString = routeUrl ? standardizedPathname.replace(routeUrl + "/", "") : "";
  if (paramsString === "" || paramsString === "/") {
    return null;
  }
  return paramsString.split("/");
}

function getRouteFromWindowLocation(defaultRoute = ROUTES.HOME) {
  const routeUrlFromWindowLocation = getRouteUrlFromWindowLocation();
  const validRoute = Object.values(ROUTES).find((x) => x.url === routeUrlFromWindowLocation);
  return validRoute || defaultRoute;
}

function NavigatorProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);

  const navigate = useCallback((route, params = null, dontChangeState) => {
    // console.log("navigating to", route.title);
    document.title = route.title;

    const formattedParams = params ? `/${params.map((x) => encodeURIComponent(x)).join("/")}` : "";
    const destinationUrl = `${BASE_URL}${route.url}${formattedParams}`;

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
  }, []);

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

  const navigatorContextValue = useMemo(() => ({
    history,
    currentRoute,
    navigate,
    checkCurrentRoute,
  }), [history, currentRoute, navigate, checkCurrentRoute]);

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
