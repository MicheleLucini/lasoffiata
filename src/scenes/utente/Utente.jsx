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
      <br></br>
      <div className='row'>
        <div className='col'>
          <span>Utente</span>
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
          <TextInput label="id" value={utente.id} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="isAdmin" value={utente.isAdmin} disabled />
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
          <TextInput label="accountType" value={getConstantDescriptionByValue(ACCOUNT_TYPE, utente.accountType)} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="lastName" value={utente.lastName} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="name" value={utente.name} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="advertisementName" value={utente.advertisementName} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="businessName" value={utente.businessName} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="yearBirth" value={utente.yearBirth} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="codiceFiscale" value={utente.codiceFiscale} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="partitaIva" value={utente.partitaIva} disabled />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <label>Informazioni di indirizzo</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="country" value={utente.country} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="province" value={utente.province} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="zipCode" value={utente.zipCode} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="city" value={utente.city} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="street" value={utente.street} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="civic" value={utente.civic} disabled />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <label>Informazioni di contatto</label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="cel" value={utente.cel} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="email" value={utente.email} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="tel" value={utente.tel} disabled />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput label="website" value={utente.website} disabled />
        </div>
      </div>
    </>
  );
};

export default Utente;

