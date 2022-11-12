import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import { getLocal } from "@logic/localStorage";
import AppTopBar from "./AppTopBar";
import AppRouting from "./AppRouting";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = getLocal("user", "token");
    dispatch(logicUser.restoreSignIn({ id: userToken.id }));
  }, [dispatch]);

  return (
    <NavigatorProvider>
      <div className={styles.page}>
        <AppTopBar />
        <div className={styles.body}>
          <AppRouting />
        </div>
      </div>
      <div className={styles.footer}></div>
    </NavigatorProvider>
  );
};

export default App;
