import * as logicUser from "@logic/user";
import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import TextInput from '@components/textInput';
import { selectUser } from '@store/userSlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSnackbars } from "@contexts/SnackbarsContext";

const PersonallInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

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

  useEffect(() => {
    setValues(user);
  }, [user])

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>I tuoi dati utente pubblici</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Username" value={values.advertisementName} setValue={(val) => onFormValueChange("advertisementName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Email" value={values.email} setValue={(val) => onFormValueChange("email", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Cellulare" value={values.cel} setValue={(val) => onFormValueChange("cel", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Telefono" value={values.tel} setValue={(val) => onFormValueChange("tel", val)} disabled={loading} />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col col-flex-center'>
          <Button
            color="primary"
            disabled={loading}
            // fullWidth
            // icon="save"
            onClick={onSave}
            text="Salva"
          />
        </div>
      </div>
    </>
  );
};

export default PersonallInfo;
