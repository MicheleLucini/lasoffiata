import React from "react";
import { useNavigator } from "../../contexts/NavigatorContext";
import "./home.css";

const Home = () => {
  const { navigate } = useNavigator();
  return <button onClick={() => navigate("/login")}>Vai al login</button>;
};

export default Home;
