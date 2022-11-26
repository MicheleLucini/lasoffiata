import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import TextInput from '@components/textInput';
import Button from '@components/button';
import styles from './Register.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = useCallback((email, password) => {
    setLoading(true);
    setFormErrors(null);
    dispatch(logicUser.register({ email, password }))
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

  const onRegisterClick = useCallback(() => {
    registerUser(formEmail, formPassword);
  }, [registerUser, formEmail, formPassword]);

  const onHoGiàUnAccountClick = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  return (
    <>
      <span>Registrati</span>
      <TextInput
        label="Email"
        value={formEmail}
        setValue={setFormEmail}
        onKeyPressEnter={onRegisterClick}
        disabled={loading}
      />
      <TextInput
        label="Password"
        value={formPassword}
        setValue={setFormPassword}
        onKeyPressEnter={onRegisterClick}
        disabled={loading}
        type="password"
      />
      <Button
        text="Accedi"
        onClick={onRegisterClick}
        disabled={loading}
        className={styles.button}
      />
      <Button
        type="text"
        text="Hai già un account? Accedi!"
        onClick={onHoGiàUnAccountClick}
        disabled={loading}
        className={styles.button}
      />
      {formErrors && <span className={styles.error}>{formErrors}</span>}
    </>
  );
};

export default Register;
