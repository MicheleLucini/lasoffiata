// import * as logicAnnuncio from "@logic/annuncio";
// import SelectCategory from "@templates/selectCategory";
// import SelectProvince from "@templates/selectProvince";
// import TextInput from '@components/textInput';
// import { useDispatch } from "react-redux";
import * as apiPublic from "@api/public";
import AnnuncioPreview from '@templates/annunci/AnnuncioPreview';
import Button from "@components/button";
import Card from "@components/card";
import Icon from "@components/icon";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import moment from 'moment';
import styles from "./AnnuncioGestisci.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useSnackbars } from "@contexts/SnackbarsContext";

const AnnuncioGestisci = () => {
  const [loading, setLoading] = useState(false);
  const [annuncio, setAnnuncio] = useState(null);

  // const dispatch = useDispatch();
  const { navigate, currentRoute } = useNavigator();
  const { openSnackbar } = useSnackbars();

  const idAnnuncio = useMemo(() => currentRoute.params[0], [currentRoute.params]);

  const loadAnnuncio = useCallback(() => {
    setLoading(true);
    apiPublic.GetAdvertisement({ advertisementId: idAnnuncio })
      .then((data) => setAnnuncio(data))
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
      {annuncio && (
        <>
          <div className='row'>
            <div className='col'>
              <AnnuncioPreview
                annuncio={annuncio}
                loading={loading}
                suppressNavigation
              >
                <Button
                  color="secondary"
                  icon="edit"
                  onClick={() => navigate(ROUTES.ANNUNCIO_MODIFICA, [annuncio.id])}
                  // size="mini"
                  text="Modifica"
                />
              </AnnuncioPreview>
            </div>
          </div>
          {/* <div className='row'>
        <div className='col col-flex-center'>
          <Button
            color="secondary"
            icon="edit"
            onClick={() => navigate(ROUTES.ANNUNCIO_MODIFICA, [annuncio.id])}
            text="Modifica"
          // size="mini"
          />
        </div>
      </div> */}
          {/* <br></br> */}
          <div className='row'>
            <div className='col'>
              <Card>
                <div className='row'>
                  <div className='col'>
                    <span className='page-section'>Annuncio online!</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className={styles.onlineWrapper}>
                      <Icon
                        fill={0}
                        grade={0}
                        name="public"
                        opticalSize={40}
                        size={40}
                        weight={400}
                        className={styles.icon}
                      />
                      <span>Il tuo annuncio è visibile online sulla soffiata!</span>
                      <span>{`Annuncio pubblicato il ${moment(annuncio.publishDate).format("D MMMM YYYY")}`}</span>
                      <span>{`L'annuncio scadrà il ${moment(annuncio.expirationDate).format("D MMMM YYYY")}`}</span>
                      <span>{`${moment(annuncio.expirationDate).diff(annuncio.publishDate, 'days')} giorni restanti`}</span>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col col-flex-center'>
                    <Button
                      color="primary"
                      onClick={() => openSnackbar("TODO hehe ✨")}
                      text="Estendi"
                      size="mini"
                    />
                    <Button
                      color="secondary"
                      onClick={() => openSnackbar("TODO hehe ✨")}
                      text="Rimuovi"
                      size="mini"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnnuncioGestisci;
