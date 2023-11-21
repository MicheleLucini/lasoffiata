import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as logicUser from "@logic/user";
import Button from '@components/button';
import InlineAlert from '@components/inlineAlert';
import TextInput from '@components/textInput';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [formEmail, setFormEmail] = useState("");
  const [formSuccess, setFormSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const sendResetPasswordEmail = useCallback((email) => {
    setLoading(true);
    setFormErrors(null);
    dispatch(logicUser.sendResetPasswordEmail({ email }))
      .then(() => {
        setFormSuccess("Ti abbiamo inviato una email per ripristinare la password");
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const onSendClick = useCallback(() => {
    sendResetPasswordEmail(formEmail);
  }, [sendResetPasswordEmail, formEmail]);

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
            label="Email"
            value={formEmail}
            setValue={setFormEmail}
            onKeyPressEnter={onSendClick}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            disabled={loading}
            fullWidth
            onClick={onSendClick}
            text="Invia E-mail di recupero password"
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

export default ForgotPassword;
