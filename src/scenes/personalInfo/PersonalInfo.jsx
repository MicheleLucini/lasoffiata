import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from '@store/userSlice';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useDialogs } from "@contexts/DialogsContext";
import * as logicUser from "@logic/user";
import { getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
import Button from '@components/button';
import SelectYear from "@templates/selectYear";
import TextInput from '@components/textInput';
import styles from "./PersonalInfo.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const { openDialog } = useDialogs();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(user);

  const logout = useCallback(() => {
    setLoading(true);
    dispatch(logicUser.logout())
      .then(() => {
        navigate(ROUTES.HOME);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [dispatch, navigate]);

  const onLogoutClick = useCallback(() => {
    openDialog({
      title: "Sei sicuro di fare il logout?",
      body: "Se fai il logout dovrai reinserire username e password per rientrare.",
      confirmButtonText: "Logout",
      confirmButtonAction: logout,
    });
  }, [openDialog, logout]);

  const onFormValueChange = useCallback((fieldName, newValue) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  }, []);

  useEffect(() => {
    setValues(user);
  }, [user]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span>Informazioni personali</span>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <label>Informazioni speciali</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="id" value={values.id} setValue={(val) => onFormValueChange("id", val)} disabled={true} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="isAdmin" value={values.isAdmin} setValue={(val) => onFormValueChange("isAdmin", val)} disabled={true} />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <label>Informazioni di base</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="accountType" value={getConstantDescriptionByValue(ACCOUNT_TYPE, values.accountType)} setValue={(val) => onFormValueChange("accountType", val)} disabled={true} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="lastName" value={values.lastName} setValue={(val) => onFormValueChange("lastName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="name" value={values.name} setValue={(val) => onFormValueChange("name", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="advertisementName" value={values.advertisementName} setValue={(val) => onFormValueChange("advertisementName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="businessName" value={values.businessName} setValue={(val) => onFormValueChange("businessName", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <SelectYear label="yearBirth" value={values.yearBirth} setValue={(val) => onFormValueChange("yearBirth", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="codiceFiscale" value={values.codiceFiscale} setValue={(val) => onFormValueChange("codiceFiscale", val)} disabled={loading} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="partitaIva" value={values.partitaIva} setValue={(val) => onFormValueChange("partitaIva", val)} disabled={loading} />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <label>Informazioni di indirizzo</label>
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
          <label>Informazioni di contatto</label>
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
      <div className='row'>
        <div className='col'>
          <TextInput label="website" value={values.website} setValue={(val) => onFormValueChange("website", val)} disabled={loading} />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            disabled={loading}
            fullWidth
            onClick={() => { }}
            text="salva"
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='row'>
        <div className='col'>
          <Button
            disabled={loading}
            fullWidth
            icon="logout"
            onClick={onLogoutClick}
            text="Logout"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
