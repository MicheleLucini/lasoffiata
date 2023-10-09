import * as logicUser from "@logic/user";
import Button from '@components/button';
import React, { useState, useCallback } from "react";
import TextInput from '@components/textInput';
import { selectUser } from '@store/userSlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSnackbars } from "@contexts/SnackbarsContext";

const PersonalBillinglInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    // userId
    userId: user.id,
    // name
    name: user.name,
    // lastName
    lastName: user.lastName,
    // street
    street: user.street,
    // civic
    civic: user.civic,
    // city
    city: user.city,
    // zipCode
    zipCode: user.zipCode,
    // province
    province: user.province,
    // country
    country: user.country,
    // codiceFiscale
    codiceFiscale: user.codiceFiscale,
    // businessName
    businessName: user.businessName,
    // partitaIva
    partitaIva: user.partitaIva,
    // pec
    pec: null,
    // icfCode
    icfCode: null,
  });

  const onFormValueChange = useCallback((fieldName, newValue) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  }, []);

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(logicUser.editUserBillingData(values))
      .then(() => {
        openSnackbar("Dati aggiornati ✔️");
      })
      .catch((e) => {
        openSnackbar("Qualcosa è andato storto ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, openSnackbar, values]);

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
          <TextInput label="name" value={values.name} setValue={(val) => onFormValueChange("name", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="lastName" value={values.lastName} setValue={(val) => onFormValueChange("lastName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="codiceFiscale" value={values.codiceFiscale} setValue={(val) => onFormValueChange("codiceFiscale", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="businessName" value={values.businessName} setValue={(val) => onFormValueChange("businessName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="partitaIva" value={values.partitaIva} setValue={(val) => onFormValueChange("partitaIva", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="pec" value={values.pec} setValue={(val) => onFormValueChange("pec", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="icfCode" value={values.icfCode} setValue={(val) => onFormValueChange("icfCode", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <label>Informazioni di indirizzo</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="country" value={values.country} setValue={(val) => onFormValueChange("country", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="province" value={values.province} setValue={(val) => onFormValueChange("province", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="zipCode" value={values.zipCode} setValue={(val) => onFormValueChange("zipCode", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="city" value={values.city} setValue={(val) => onFormValueChange("city", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="street" value={values.street} setValue={(val) => onFormValueChange("street", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="civic" value={values.civic} setValue={(val) => onFormValueChange("civic", val)} disabled={loading} />
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
