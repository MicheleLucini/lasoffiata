import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as logicUser from "@logic/user";
import Button from '@components/button';
import InlineAlert from '@components/inlineAlert';
import TextInput from '@components/textInput';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [formPassword, setFormPassword] = useState("");
  const [formRepeatPassword, setFormRepeatPassword] = useState("");
  // const [formSuccess, setFormSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentRoute, navigate } = useNavigator();

  
  const resetPassword = useCallback((newPassword, repeatNewPassword) => {
    
    setLoading(true);
    setFormErrors(null);

    const userToken = currentRoute.params ? decodeURIComponent(currentRoute.params[0]) : null;
    const token = currentRoute.params ? decodeURIComponent(currentRoute.params[1]) : null;

    dispatch(logicUser.resetPassword({ userToken, token, newPassword, repeatNewPassword }))
      .then(() => {
        navigate(ROUTES.LOGIN);
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [dispatch, currentRoute.params, navigate]);

  const onSaveClick = useCallback(() => {
    resetPassword(formPassword, formRepeatPassword);
  }, [resetPassword, formPassword, formRepeatPassword]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Recupera password</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Nuova password"
            value={formPassword}
            setValue={setFormPassword}
            onKeyPressEnter={onSaveClick}
            disabled={loading}
            type="password"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Ripeti"
            value={formRepeatPassword}
            setValue={setFormRepeatPassword}
            onKeyPressEnter={onSaveClick}
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
            onClick={onSaveClick}
            text="Salva"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <InlineAlert type="error" text={formErrors} />
          {/* <InlineAlert type="success" text={formSuccess} /> */}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
