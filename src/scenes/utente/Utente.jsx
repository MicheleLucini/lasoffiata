import * as apiPublic from "@api/public";
import React, { useState, useCallback, useEffect } from "react";
import TextInput from '@components/textInput';
import { useNavigator } from "@contexts/NavigatorContext";

const Utente = () => {
  const { currentRoute } = useNavigator();
  
  const [utente, setUtente] = useState(null);

  const loadUtente = useCallback(async () => {
    const data = await apiPublic.GetUser({ userId: currentRoute.params[0] });
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
        <span className='page-title'>Profilo utente di {utente.advertisementName}</span>
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <TextInput label="Username" value={utente.advertisementName} disabled />
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <TextInput label="Email" value={utente.email} disabled />
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <TextInput label="Cellulare" value={utente.cel} disabled />
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <TextInput label="Telefono" value={utente.tel} disabled />
      </div>
    </div>
    </>
  );
};

export default Utente;

