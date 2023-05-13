import React, { useMemo } from "react";
import { useNavigator } from "@contexts/NavigatorContext";
import AppTopBarAdministration from "./AppTopBarAdministration";
import AppTopBarUser from "./AppTopBarUser";

const AppTopBar = () => {
  const { currentRoute } = useNavigator();

  const showAdminTopBar = useMemo(() => currentRoute?.isAdmin, [currentRoute]);

  return (
    <>
      {showAdminTopBar ? (
        <AppTopBarAdministration />
      ) : (
        <AppTopBarUser />
      )}
    </>
  );
};

export default AppTopBar;
