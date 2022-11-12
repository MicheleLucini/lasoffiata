import React from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import AppTopBar from "./AppTopBar";
import AppRouting from "./AppRouting";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <NavigatorProvider>
        <div className="page">
          <AppTopBar />
          <div className="body">
            <AppRouting />
          </div>
        </div>
        <div className="footer"></div>
      </NavigatorProvider>
    </Provider>
  );
};

export default App;
