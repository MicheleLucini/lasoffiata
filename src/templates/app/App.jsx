import 'moment/locale/it';
import * as logicUser from "@logic/user";
import AppFooter from "./AppFooter";
import AppNavBar from "./AppNavBar";
import AppRouting from "./AppRouting";
import AppTopBar from "./AppTopBar";
import Dialogs from "@templates/dialogs";
import Modals from "@templates/modals";
import React, { useEffect } from "react";
import Snackbars from "@templates/snackbars";
import moment from "moment";
import styles from "./App.module.css";
import { CategoriesProvider } from "@contexts/CategoriesContext";
import { DialogsProvider } from "@contexts/DialogsContext";
import { ModalsProvider } from "@contexts/ModalsContext";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import { SnackbarsProvider } from "@contexts/SnackbarsContext";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('it');
    dispatch(logicUser.restoreSignIn());
  }, [dispatch]);

  return (
    <ModalsProvider>
      <CategoriesProvider>
        <NavigatorProvider>
          <SnackbarsProvider>
            <DialogsProvider>
              <div className={styles.page}>
                <AppNavBar />
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
