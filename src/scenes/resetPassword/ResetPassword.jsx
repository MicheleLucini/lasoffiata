import * as logicUser from "@logic/user";
import Button from '@components/button';
import InlineAlert from '@components/inlineAlert';
import React, { useState, useCallback } from "react";
import TextInput from '@components/textInput';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formPassword, setFormPassword] = useState("");
  const [formRepeatPassword, setFormRepeatPassword] = useState("");
  // const [formSuccess, setFormSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

  const dispatch = useDispatch();
  const { currentRoute, navigate } = useNavigator();

  const resetPassword = useCallback((userToken, token, newPassword, repeatNewPassword) => {
    setLoading(true);
    setFormErrors(null);
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
  }, [dispatch, navigate]);

  const onSaveClick = useCallback(() => {
    const userToken = currentRoute.params ? decodeURIComponent(currentRoute.params[0]) : null;
    const token = currentRoute.params ? decodeURIComponent(currentRoute.params[1]) : null;
    resetPassword(userToken, token, formPassword, formRepeatPassword,);
  }, [resetPassword, currentRoute.params, formPassword, formRepeatPassword]);

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
            disabled={loading}
            label="Nuova password"
            onKeyPressEnter={onSaveClick}
            setValue={setFormPassword}
            type="password"
            value={formPassword}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            disabled={loading}
            label="Ripeti"
            onKeyPressEnter={onSaveClick}
            setValue={setFormRepeatPassword}
            type="password"
            value={formRepeatPassword}
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
