import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import AppTopBar from "./AppTopBar";
import AppRouting from "./AppRouting";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logicUser.restoreSignIn());
  }, [dispatch]);

  return (
    <NavigatorProvider>
      <div className={styles.page}>
        <AppTopBar />
        <div className={styles.body}>
          <AppRouting />
        </div>
        <div className={styles.footer}></div>
      </div>
    </NavigatorProvider>
  );
};

export default App;
