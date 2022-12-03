import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from '@store/userSlice';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useDialogs } from "@contexts/DialogsContext";
import * as logicUser from "@logic/user";
import { ACCOUNT_TYPES } from "@logic/constants";
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
      <span>Informazioni personali</span>
      <fieldset>
        <legend>Informazioni speciali</legend>
        <TextInput label="id" value={values.id} setValue={(val) => onFormValueChange("id", val)} disabled={true} />
        <TextInput label="isAdmin" value={values.isAdmin} setValue={(val) => onFormValueChange("isAdmin", val)} disabled={true} />
      </fieldset>
      <fieldset>
        <legend>Informazioni di base</legend>
        <TextInput label="accountType" value={ACCOUNT_TYPES[values.accountType]} setValue={(val) => onFormValueChange("accountType", val)} disabled={true} />
        <TextInput label="lastName" value={values.lastName} setValue={(val) => onFormValueChange("lastName", val)} disabled={loading} />
        <TextInput label="name" value={values.name} setValue={(val) => onFormValueChange("name", val)} disabled={loading} />
        <TextInput label="advertisementName" value={values.advertisementName} setValue={(val) => onFormValueChange("advertisementName", val)} disabled={loading} />
        <TextInput label="businessName" value={values.businessName} setValue={(val) => onFormValueChange("businessName", val)} disabled={loading} />
        <SelectYear label="yearBirth" value={values.yearBirth} setValue={(val) => onFormValueChange("yearBirth", val)} disabled={loading} />
        <TextInput label="codiceFiscale" value={values.codiceFiscale} setValue={(val) => onFormValueChange("codiceFiscale", val)} disabled={loading} />
        <TextInput label="partitaIva" value={values.partitaIva} setValue={(val) => onFormValueChange("partitaIva", val)} disabled={loading} />
      </fieldset>
      <fieldset>
        <legend>Informazioni di indirizzo</legend>
        <TextInput label="country" value={values.country} setValue={(val) => onFormValueChange("country", val)} disabled={loading} />
        <TextInput label="province" value={values.province} setValue={(val) => onFormValueChange("province", val)} disabled={loading} />
        <TextInput label="zipCode" value={values.zipCode} setValue={(val) => onFormValueChange("zipCode", val)} disabled={loading} />
        <TextInput label="city" value={values.city} setValue={(val) => onFormValueChange("city", val)} disabled={loading} />
        <TextInput label="street" value={values.street} setValue={(val) => onFormValueChange("street", val)} disabled={loading} />
        <TextInput label="civic" value={values.civic} setValue={(val) => onFormValueChange("civic", val)} disabled={loading} />
      </fieldset>
      <fieldset>
        <legend>Informazioni di contatto</legend>
        <TextInput label="email" value={values.email} setValue={(val) => onFormValueChange("email", val)} disabled={loading} />
        <TextInput label="cel" value={values.cel} setValue={(val) => onFormValueChange("cel", val)} disabled={loading} />
        <TextInput label="tel" value={values.tel} setValue={(val) => onFormValueChange("tel", val)} disabled={loading} />
        <TextInput label="website" value={values.website} setValue={(val) => onFormValueChange("website", val)} disabled={loading} />
      </fieldset>
      <Button
        text="salva"
        onClick={() => { }}
        disabled={loading}
        className={styles.button}
        fullWidth
      />
      <br />
      <br />
      <br />
      <Button
        icon="logout"
        text="Logout"
        onClick={onLogoutClick}
        disabled={loading}
        className={styles.button}
      />
    </>
  );
};

export default Home;
