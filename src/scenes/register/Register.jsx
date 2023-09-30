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
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Iscriviti</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Email"
            value={formEmail}
            setValue={setFormEmail}
            onKeyPressEnter={onRegisterClick}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Password"
            value={formPassword}
            setValue={setFormPassword}
            onKeyPressEnter={onRegisterClick}
            disabled={loading}
            type="password"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Select
            label="Tipo di account"
            options={getSelectOptionsFromConstant(ACCOUNT_TYPE)}
            value={formAccountType}
            setValue={setFormAccountType}
            disabled={loading}
            clearable={false}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            disabled={loading}
            fullWidth
            onClick={onRegisterClick}
            text="Iscriviti"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            disabled={loading}
            fullWidth
            onClick={onHoGiàUnAccountClick}
            text="Hai già un account? Accedi!"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <InlineAlert type="error" text={formErrors} />
          <InlineAlert type="success" text={formSuccess} />
        </div>
      </div>
    </>
  );
};

export default Register;
