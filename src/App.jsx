import React from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import { NavigatorProvider } from "@contexts/NavigatorContext";
import Header from "@scenes/header";
import Navigator from "@scenes/navigator";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <NavigatorProvider>
        <div className="page">
          <Header />
          <div className="body">
            <Navigator />
          </div>
        </div>
        <div className="footer"></div>
      </NavigatorProvider>
    </Provider>
  );
};

export default App;
