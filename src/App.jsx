import React from "react";
import { NavigatorProvider } from "./contexts/NavigatorContext";
import Header from "./scenes/header";
import Navigator from "./scenes/navigator";
import "./App.css";

const App = () => {
  return (
    <NavigatorProvider>
      <div className="page">
        <Header />
        <div className="body">
          <Navigator />
        </div>
      </div>
      <div className="footer"></div>
    </NavigatorProvider>
  );
};

export default App;
