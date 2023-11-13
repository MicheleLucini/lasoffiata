import * as logicUser from "@logic/user";
import Badge from "@components/badge";
import Button from '@components/button';
import React, { useState, useMemo, useCallback, useEffect } from "react";
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

  const areDatiDiFatturazioneCompleti = useMemo(() => (
    logicUser.areUserBillingDataComplete(values)
  ), [values]);

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
          <span className='page-section'>Informazioni di contatto</span>
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
          <span className='page-section'>Informazioni di indirizzo</span>
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
        <div className='col col-flex-center'>
          {areDatiDiFatturazioneCompleti ? (
            <Badge
              icon="task_alt"
              text="Tutti i campi sono stati compilati"
              type="success"
            />
          ) : (
            <Badge
              icon="warning"
              text="Attento, non hai compilato tutti i campi"
              type="warning"
            />
          )}
        </div>
      </div>
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

export default PersonalBillinglInfo;
