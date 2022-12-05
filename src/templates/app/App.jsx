import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DialogsProvider } from "@contexts/DialogsContext";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import Dialogs from "@templates/dialogs";
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
      <DialogsProvider>
        <div className={styles.page}>
          <AppTopBar />
          <div className={styles.body}>
            <AppRouting />
          </div>
          <AppFooter />
        </div>
        <Dialogs />
      </DialogsProvider>
    </NavigatorProvider>
  );
};

export default App;
