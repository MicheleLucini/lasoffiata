import React from "react";
// import { useNavigator } from "../../contexts/NavigatorContext";
import "./home.css";

const Home = () => {
  // const { navigate } = useNavigator();
  return (
    <div className="home">
      <div className="search-form-wrapper">
        <div className="header">
          <span className="material-symbols-rounded">search</span>
          <span className="title">Cosa stai cercando?</span>
        </div>
      </div>
      <span>Benvenuto nella home del sito!</span>
    </div>
  );
};

export default Home;
