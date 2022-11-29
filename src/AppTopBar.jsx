import React, { useMemo } from "react";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import AppTopBarAdministration from "./AppTopBarAdministration";
import AppTopBarUser from "./AppTopBarUser";

const AppTopBar = () => {
  const { checkCurrentRoute } = useNavigator();

  const showAdminTopBar = useMemo(() => (
    checkCurrentRoute(ROUTES.ADMIN) ||
    checkCurrentRoute(ROUTES.ADMIN_VALIDAZIONE_ANNUNCI) ||
    checkCurrentRoute(ROUTES.ADMIN_PAGAMENTI) ||
    checkCurrentRoute(ROUTES.ADMIN_UTENTI) ||
    checkCurrentRoute(ROUTES.ADMIN_EDIZIONI) ||
    checkCurrentRoute(ROUTES.ADMIN_CATEGORIE) ||
    checkCurrentRoute(ROUTES.ADMIN_ESPORTA_ANNUNCI)
  ), [checkCurrentRoute]);

  return (
    <>
    {showAdminTopBar && (
      <AppTopBarAdministration></AppTopBarAdministration>
    )}
    {!showAdminTopBar && (
      <AppTopBarUser></AppTopBarUser>
    )}
    </>
  );
};

export default AppTopBar;
