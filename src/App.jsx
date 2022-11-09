import React from "react";
import { NavigatorProvider } from "./contexts/NavigatorContext";
import Navigator from "./scenes/navigator";
import "./App.css";

const App = () => {
  return (
    <NavigatorProvider>
      <Navigator />
    </NavigatorProvider>
  );
};

export default App;
