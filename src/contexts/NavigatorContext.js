import React, { useState, useEffect, useMemo } from "react";
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

function getRouteByUrl(url) {
  return Object.values(ROUTES).find((x) => x.url === url);
}

function getValidRoute(route, defaultRoute = ROUTES.HOME) {
  const newRoute = route.toLowerCase();
  const validRoute = getRouteByUrl(newRoute) || defaultRoute;
  return validRoute.url;
}

function NavigatorProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);

  useEffect(() => {
    console.log("current route", currentRoute);
    if (currentRoute === null) return;
    setHistory((prev) => {
      console.log("history changed:", [...prev, currentRoute]);
      return [...prev, currentRoute];
    });
  }, [currentRoute]);

  useEffect(() => {
    navigate(getValidRoute(window.location.pathname));
  }, []);

  const navigate = (route, dontChangeState) => {
    console.log("navigating to", route);
    document.title = getRouteByUrl(route).title;
    if (dontChangeState) {
      window.history.replaceState({}, "", route);
    } else {
      window.history.pushState({}, "", route);
    }
    setCurrentRoute(route);
  };

  const onPopState = () => {
    const newRoute = getValidRoute(window.location.pathname);
    console.log("popstate:", newRoute);
    navigate(newRoute, true);
  };

  useEffect(() => {
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigatorContextValue = useMemo(
    () => ({
      history,
      currentRoute,
      navigate,
    }),
    [history, currentRoute, navigate]
  );

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
