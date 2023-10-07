import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CategoriesProvider } from "@contexts/CategoriesContext";
import { ModalsProvider } from "@contexts/ModalsContext";
import { DialogsProvider } from "@contexts/DialogsContext";
import { SnackbarsProvider } from "@contexts/SnackbarsContext";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import Snackbars from "@templates/snackbars";
import Modals from "@templates/modals";
import Dialogs from "@templates/dialogs";
import AppTopBar from "./AppTopBar";
import AppNavBar from "./AppNavBar";
import AppRouting from "./AppRouting";
import AppFooter from "./AppFooter";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logicUser.restoreSignIn());
  }, [dispatch]);

  return (
    <ModalsProvider>
      <CategoriesProvider>
        <NavigatorProvider>
          <SnackbarsProvider>
            <DialogsProvider>
              <AppNavBar />
              <div className={styles.page}>
                <AppTopBar />
                <div className={styles.body}>
                  <AppRouting />
                </div>
                <AppFooter />
              </div>
              <Modals />
              <Dialogs />
              <Snackbars />
            </DialogsProvider>
          </SnackbarsProvider>
        </NavigatorProvider>
      </CategoriesProvider>
    </ModalsProvider>
  );
};

export default App;
