import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DialogsProvider } from "@contexts/DialogsContext";
import { SnackbarsProvider } from "@contexts/SnackbarsContext";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import Snackbars from "@templates/snackbars";
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
      <SnackbarsProvider>
        <DialogsProvider>
          <div className={styles.page}>
            <AppTopBar />
            <div className={styles.body}>
              <AppRouting />
            </div>
            <AppFooter />
          </div>
          <Dialogs />
          <Snackbars />
        </DialogsProvider>
      </SnackbarsProvider>
    </NavigatorProvider>
  );
};

export default App;
