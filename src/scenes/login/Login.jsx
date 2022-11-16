import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import TextInput from '@components/textInput';
import Button from '@components/button';
import styles from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = useCallback((email, password) => {
    setLoading(true);
    setFormErrors(null);
    dispatch(logicUser.login({ email, password }))
      .then(() => {
        navigate(ROUTES.HOME);
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, navigate]);

  const onAccediClick = useCallback(() => {
    loginUser(formEmail, formPassword);
  }, [loginUser, formEmail, formPassword]);

  return (
    <>
      <span>Accedi</span>
      <TextInput
        label="Email"
        value={formEmail}
        setValue={setFormEmail}
        onKeyPressEnter={onAccediClick}
        disabled={loading}
      />
      <TextInput
        label="Password"
        value={formPassword}
        setValue={setFormPassword}
        onKeyPressEnter={onAccediClick}
        disabled={loading}
        type="password"
      />
      <Button
        text="Accedi"
        onClick={onAccediClick}
        disabled={loading}
        className={styles.button}
      />
      {formErrors && <span className={styles.error}>{formErrors}</span>}
    </>
  );
};

export default Login;
