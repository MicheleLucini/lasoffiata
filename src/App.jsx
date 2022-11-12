import React from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import AppTopBar from "./AppTopBar";
import AppRouting from "./AppRouting";
import styles from "./App.module.css";

const App = () => {
  return (
    <Provider store={store}>
      <NavigatorProvider>
        <div className={styles.page}>
          <AppTopBar />
          <div className={styles.body}>
            <AppRouting />
          </div>
        </div>
        <div className={styles.footer}></div>
      </NavigatorProvider>
    </Provider>
  );
};

export default App;
