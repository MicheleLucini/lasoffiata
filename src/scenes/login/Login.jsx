import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import * as logicUser from "@logic/user";
import Button from '@components/button';
import InlineAlert from '@components/inlineAlert';
import TextInput from '@components/textInput';

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

  const onNonHoUnAccountClick = useCallback(() => {
    navigate(ROUTES.REGISTER);
  }, [navigate]);

  return (
    <>
    <br></br>
    <div className='row'>
      <div className='col'>
        <span className='page-title'>Accedi</span>
      </div>
    </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Email"
            value={formEmail}
            setValue={setFormEmail}
            onKeyPressEnter={onAccediClick}
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
            onKeyPressEnter={onAccediClick}
            disabled={loading}
            type="password"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            disabled={loading}
            fullWidth
            onClick={onAccediClick}
            text="Accedi"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            disabled={loading}
            fullWidth
            onClick={onNonHoUnAccountClick}
            text="Non hai un account? Registrati!"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <InlineAlert type="error" text={formErrors} />
        </div>
      </div>
    </>
  );
};

export default Login;
