import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const NavigatorContext = React.createContext();

const ROUTES = {
  HOME: {
    title: "Home",
    url: "/",
  },
  LOGIN: {
    title: "Accedi",
    url: "/login",
  },
};

function getValidRouteByUrl(url, defaultRoute = ROUTES.HOME) {
  const standardizedUrl = url.toLowerCase().replace("/lasoffiata", "");
  const validRoute = Object.values(ROUTES).find((x) => x.url === standardizedUrl);
  return validRoute || defaultRoute;
}

function NavigatorProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);

  const navigate = useCallback((route, dontChangeState) => {
    // console.log("navigating to", route.title);
    document.title = route.title;

    const baseUrl = window.location.host === "michelelucini.github.io" ? "/lasoffiata" : "";
    if (dontChangeState) {
      window.history.replaceState({}, "", baseUrl + route.url);
    } else {
      window.history.pushState({}, "", baseUrl + route.url);
    }
    setCurrentRoute(route);
  }, []);

  const onPopState = useCallback(() => {
    const newRoute = getValidRouteByUrl(window.location.pathname);
    // console.log("popstate:", newRoute.title);
    navigate(newRoute, true);
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
    navigate(getValidRouteByUrl(window.location.pathname));
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
