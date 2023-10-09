import * as logicUser from "@logic/user";
import Button from '@components/button';
import React, { useState, useCallback } from "react";
import TextInput from '@components/textInput';
// import { getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
import { selectUser } from '@store/userSlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSnackbars } from "@contexts/SnackbarsContext";

const PersonallInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(user);

  const onFormValueChange = useCallback((fieldName, newValue) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  }, []);

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(logicUser.editUserPublicData({
      ...values,
      userId: user.id
    }))
      .then(() => {
        openSnackbar("Dati aggiornati ✔️");
      })
      .catch((e) => {
        openSnackbar("Qualcosa è andato storto ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, openSnackbar, user.id, values]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>I tuoi dati utente pubblici</span>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col'>
          <TextInput label="accountType" value={getConstantDescriptionByValue(ACCOUNT_TYPE, values.accountType)} setValue={(val) => onFormValueChange("accountType", val)} disabled={true} />
        </div>
      </div> */}
      <div className='row'>
        <div className='col'>
          <TextInput label="Username" value={values.advertisementName} setValue={(val) => onFormValueChange("advertisementName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="email" value={values.email} setValue={(val) => onFormValueChange("email", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="cel" value={values.cel} setValue={(val) => onFormValueChange("cel", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="tel" value={values.tel} setValue={(val) => onFormValueChange("tel", val)} disabled={loading} />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            disabled={loading}
            fullWidth
            onClick={onSave}
            text="salva"
          />
        </div>
      </div>
    </>
  );
};

export default PersonallInfo;
