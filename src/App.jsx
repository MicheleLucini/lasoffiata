import React from "react";
import { NavigatorProvider } from "./contexts/NavigatorContext";
import Header from "./scenes/header";
import Navigator from "./scenes/navigator";
import "./App.css";

const App = () => {
  return (
    <NavigatorProvider>
      <Header />
      <Navigator />
    </NavigatorProvider>
  );
};

export default App;
