import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as apiPublic from "@api/public";
// import * as logicAnnuncio from "@logic/annuncio";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Button from "@components/button";
// import TextInput from '@components/textInput';
// import SelectCategory from "@templates/selectCategory";
// import SelectProvince from "@templates/selectProvince";
import AnnuncioPreview from '@templates/annunci/AnnuncioPreview';

const AnnuncioGestisci = () => {
  const [loading, setLoading] = useState(false);
  const [annuncio, setAnnuncio] = useState(false);

  const dispatch = useDispatch();
  const { navigate, currentRoute } = useNavigator();

  const idAnnuncio = useMemo(()=> currentRoute.params[0],[currentRoute.params]);

  const loadAnnuncio = useCallback(() => {
    setLoading(true);
    apiPublic.GetAdvertisement({ advertisementId:idAnnuncio  })
      .then((data) => {
        setAnnuncio(data);
      })
      .finally(() => setLoading(false));
  }, [idAnnuncio])

  useEffect(() => {
    loadAnnuncio();
  }, [loadAnnuncio])

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Gestisci annuncio</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <AnnuncioPreview
            annuncio={annuncio}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default AnnuncioGestisci;
