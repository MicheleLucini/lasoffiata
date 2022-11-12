import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";

const Login = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const [loading, setLoading] = useState(false);

  const loginUser = useCallback((email, password) => {
    setLoading(true);
    dispatch(logicUser.login({ email, password }))
      .catch((e) => console.error("Login error", e.message))
      .finally(() => {
        setLoading(false);
        navigate(ROUTES.HOME);
      });
  }, [dispatch, navigate]);

  // useEffect(() => {
  //   loginUser("admin", "admin");
  // }, []);

  return (
    <>
      <span>Login</span>
      {loading && <span>Loading</span>}
    </>
  );
};

export default Login;
