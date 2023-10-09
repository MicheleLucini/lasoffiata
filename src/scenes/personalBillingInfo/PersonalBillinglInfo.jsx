import Button from '@components/button';
import React, { useState, useCallback, useEffect } from "react";
import TextInput from '@components/textInput';
import { selectUser } from '@store/userSlice';
import { useSelector } from "react-redux";
import { useSnackbars } from "@contexts/SnackbarsContext";

const PersonalBillinglInfo = () => {
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

  // const onSave = useCallback(() => {
  //   setLoading(true);
  //   dispatch(logicAnnuncio.createAdvertisement({
  //     title: formTitolo,
  //     description: formDescrizione,
  //     categoryId: formCategory,
  //     province: formProvince,
  //     city: formCitta,
  //     imageBlob: filesBlobs.join("#"),
  //   }))
  //     .then(() => {
  //       navigate(ROUTES.HOME);
  //     })
  //     .catch((e) => {
  //       setFormErrors(e.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setValues(user);
  }, [user]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>I tuoi dati di fatturazione</span>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col'>
          <label>Informazioni speciali</label>
        </div>
      </div> */}
      {/* <div className='row'>
        <div className='col'>
          <TextInput label="accountType" value={getConstantDescriptionByValue(ACCOUNT_TYPE, values.accountType)} setValue={(val) => onFormValueChange("accountType", val)} disabled={true} />
        </div>
      </div> */}
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
            onClick={() => openSnackbar("Non implementato")}
            text="salva"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalBillinglInfo;
