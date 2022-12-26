import React, { useState, useCallback, useEffect } from "react";
import { useNavigator } from "@contexts/NavigatorContext";
import * as apiPublic from "@api/public";
import { getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
import TextInput from '@components/textInput';

const Utente = () => {
  const { currentRoute } = useNavigator();
  const [utente, setUtente] = useState(null);

  const loadUtente = useCallback(async () => {
    const data = await apiPublic.GetUser({ id: currentRoute.params[0] });
    setUtente(data);
  }, [currentRoute])

  useEffect(() => {
    loadUtente();
  }, [loadUtente]);

  if (!utente) {
    return null;
  }

  return (
    <>
      <span>Utente</span>
      <fieldset>
        <legend>Informazioni speciali</legend>
        <TextInput label="id" value={utente.id} disabled />
        <TextInput label="isAdmin" value={utente.isAdmin} disabled />
      </fieldset>
      <fieldset>
        <legend>Informazioni di base</legend>
        <TextInput label="accountType" value={getConstantDescriptionByValue(ACCOUNT_TYPE, utente.accountType)} disabled />
        <TextInput label="lastName" value={utente.lastName} disabled />
        <TextInput label="name" value={utente.name} disabled />
        <TextInput label="advertisementName" value={utente.advertisementName} disabled />
        <TextInput label="businessName" value={utente.businessName} disabled />
        <TextInput label="yearBirth" value={utente.yearBirth} disabled />
        <TextInput label="codiceFiscale" value={utente.codiceFiscale} disabled />
        <TextInput label="partitaIva" value={utente.partitaIva} disabled />
      </fieldset>
      <fieldset>
        <legend>Informazioni di indirizzo</legend>
        <TextInput label="country" value={utente.country} disabled />
        <TextInput label="province" value={utente.province} disabled />
        <TextInput label="zipCode" value={utente.zipCode} disabled />
        <TextInput label="city" value={utente.city} disabled />
        <TextInput label="street" value={utente.street} disabled />
        <TextInput label="civic" value={utente.civic} disabled />
      </fieldset>
      <fieldset>
        <legend>Informazioni di contatto</legend>
        <TextInput label="cel" value={utente.cel} disabled />
        <TextInput label="email" value={utente.email} disabled />
        <TextInput label="tel" value={utente.tel} disabled />
        <TextInput label="website" value={utente.website} disabled />
      </fieldset>
    </>
  );
};

export default Utente;
