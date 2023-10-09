import * as logicUser from "@logic/user";
import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import TextInput from '@components/textInput';
import { checkConstant, getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
import { selectUser } from '@store/userSlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSnackbars } from "@contexts/SnackbarsContext";

const PersonalBillinglInfo = () => {
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
    dispatch(logicUser.editUserBillingData({
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
          <span className='page-title'>I tuoi dati di fatturazione</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <label>Informazioni di contatto</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Tipo account" value={getConstantDescriptionByValue(ACCOUNT_TYPE, values.accountType)} setValue={(val) => onFormValueChange("accountType", val)} disabled={true} />
        </div>
      </div>
      {checkConstant(ACCOUNT_TYPE.PRIVATO, values.accountType) ? (
        <>
          <div className='row'>
            <div className='col'>
              <TextInput label="Cognome" value={values.lastName} setValue={(val) => onFormValueChange("lastName", val)} disabled={loading} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <TextInput label="Nome" value={values.name} setValue={(val) => onFormValueChange("name", val)} disabled={loading} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <TextInput label="Codice fiscale" value={values.codiceFiscale} setValue={(val) => onFormValueChange("codiceFiscale", val)} disabled={loading} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='row'>
            <div className='col'>
              <TextInput label="Ragione sociale" value={values.businessName} setValue={(val) => onFormValueChange("businessName", val)} disabled={loading} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <TextInput label="Partita IVA" value={values.partitaIva} setValue={(val) => onFormValueChange("partitaIva", val)} disabled={loading} />
            </div>
          </div>
        </>
      )}
      <div className='row'>
        <div className='col'>
          <label>Informazioni di indirizzo</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Stato" value={values.country} setValue={(val) => onFormValueChange("country", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Provincia" value={values.province} setValue={(val) => onFormValueChange("province", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="CAP" value={values.zipCode} setValue={(val) => onFormValueChange("zipCode", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Comune" value={values.city} setValue={(val) => onFormValueChange("city", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Via" value={values.street} setValue={(val) => onFormValueChange("street", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="Civico" value={values.civic} setValue={(val) => onFormValueChange("civic", val)} disabled={loading} />
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

export default PersonalBillinglInfo;
