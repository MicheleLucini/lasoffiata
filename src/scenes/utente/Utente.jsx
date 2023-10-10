import * as apiPublic from "@api/public";
import DetailsGrid from '@components/detailsGrid';
import React, { useState, useCallback, useEffect } from "react";
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
          <DetailsGrid
            labels={["Username", "Email", "Cellulare", "Telefono"]}
            values={[utente.advertisementName, utente.email, utente.cel, utente.tel]}
          />
        </div>
      </div>
    </>
  );
};

export default Utente;

