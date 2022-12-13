import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import { getSelectOptionsFromConstant, ACCOUNT_TYPE } from "@logic/constants";
import Button from '@components/button';
import InlineAlert from '@components/inlineAlert';
import Select from "@components/select";
import TextInput from '@components/textInput';

const Register = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formAccountType, setFormAccountType] = useState(1);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = useCallback((email, password, accountType) => {
    setLoading(true);
    setFormErrors(null);
    dispatch(logicUser.register({ email, password, accountType }))
      .then(() => {
        setFormSuccess("Registrazione iniziata con successo!\nTi abbiamo inviato una mail di conferma account per completare la registrazione.\nControlla nella posta elettronica (anche nello spam!)");
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const onRegisterClick = useCallback(() => {
    registerUser(formEmail, formPassword, formAccountType);
  }, [registerUser, formEmail, formPassword, formAccountType]);

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
      <Select
        label="Tipo di account"
        options={getSelectOptionsFromConstant(ACCOUNT_TYPE)}
        value={formAccountType}
        setValue={setFormAccountType}
        disabled={loading}
        clearable={false}
      />
      <Button
        text="Registrati"
        onClick={onRegisterClick}
        disabled={loading}
        fullWidth
      />
      <Button
        type="text"
        text="Hai già un account? Accedi!"
        onClick={onHoGiàUnAccountClick}
        disabled={loading}
        fullWidth
      />
      <InlineAlert type="error" text={formErrors} />
      <InlineAlert type="success" text={formSuccess} />
    </>
  );
};

export default Register;
