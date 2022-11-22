import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import AppTopBar from "./AppTopBar";
import AppRouting from "./AppRouting";
import AppFooter from "./AppFooter";
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
        <AppFooter />
      </div>
    </NavigatorProvider>
  );
};

export default App;
