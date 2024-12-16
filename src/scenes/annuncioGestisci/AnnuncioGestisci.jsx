// import * as logicAnnuncio from "@logic/annuncio";
// import SelectCategory from "@templates/selectCategory";
// import SelectProvince from "@templates/selectProvince";
// import TextInput from '@components/textInput';
// import { useDispatch } from "react-redux";
import * as apiPublic from "@api/public";
import * as apiUser from "@api/user";
import AnnuncioPreview from '@templates/annunci/AnnuncioPreview';
import Button from "@components/button";
import Card from "@components/card";
import Icon from "@components/icon";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import moment from 'moment';
import styles from "./AnnuncioGestisci.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { getStatoAnnuncio } from "@logic/annuncio";
import { useModals } from "@contexts/ModalsContext";
import { useSnackbars } from "@contexts/SnackbarsContext";

const AnnuncioGestisci = () => {
  // const dispatch = useDispatch();
  const { navigate, currentRoute } = useNavigator();
  const { openModal, closeAllModals } = useModals();
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [annuncio, setAnnuncio] = useState(null);


  const idAnnuncio = useMemo(() => currentRoute.params[0], [currentRoute.params]);

  const statoAnnuncio = useMemo(() => getStatoAnnuncio(annuncio), [annuncio]);

  const loadAnnuncio = useCallback(() => {
    setLoading(true);
    apiPublic.GetAdvertisement({ advertisementId: idAnnuncio })
      .then((data) => setAnnuncio(data))
      .finally(() => setLoading(false));
  }, [idAnnuncio])

  const deleteAdvertisement = useCallback(() => {
    setLoading(true);
    apiUser.DeleteAdvertisement({ advertisementId: idAnnuncio })
      .then(() => navigate(ROUTES.I_MIEI_ANNUNCI))
      .finally(() => setLoading(false));
  }, [idAnnuncio, navigate])

  const askDeleteAdvertisement = useCallback((category) => {
    openModal({
      title: "Elimina annuncio",
      children: <>
        <div className='row'>
          <div className='col'>
            <span>Confermi l'eliminazione dell'annuncio '{annuncio?.title}'?</span>
          </div>
        </div>
        <div className='row'>
          <div className='col col-flex-center'>
            <Button
              color="primary"
              icon="delete"
              onClick={deleteAdvertisement}
              text="Conferma eliminazione"
            />
            <Button
              color="secondary"
              onClick={closeAllModals}
              text="Annulla"
            />
          </div>
        </div>
      </>,
    });
  }, [annuncio?.title, closeAllModals, deleteAdvertisement, openModal]);

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
                {!statoAnnuncio.isRifiutato && (
                  <Button
                    color="secondary"
                    icon="edit"
                    onClick={() => navigate(ROUTES.ANNUNCIO_MODIFICA, [annuncio.id])}
                    text="Modifica"
                  />
                )}
              </AnnuncioPreview>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Card>
                <div className='row'>
                  <div className='col'>
                    <span className='page-section'>Annuncio {statoAnnuncio.text}!</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className={styles.statoWrapper}>
                      <Icon
                        className={styles.icon + " " + (statoAnnuncio.error ? styles.error : "") + " " + (statoAnnuncio.warning ? styles.warning : "")}
                        fill={0}
                        grade={0}
                        name={statoAnnuncio.icon}
                        opticalSize={40}
                        size={40}
                        weight={400}
                      />
                      {statoAnnuncio.isRifiutato ? (
                        <span>Il tuo annuncio è stato rifiutato.</span>
                      ) : (
                        <>
                          <span>Il tuo annuncio è visibile online sulla soffiata!</span>
                          <span>{`Annuncio pubblicato il ${moment(annuncio.publishDate).format("D MMMM YYYY")}`}</span>
                          <span>{`L'annuncio scadrà il ${moment(annuncio.expirationDate).format("D MMMM YYYY")}`}</span>
                          <span>{`${moment(annuncio.expirationDate).diff(annuncio.publishDate, 'days')} giorni restanti`}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col col-flex-center'>
                    {statoAnnuncio.isRifiutato && (
                      <Button
                        color="primary"
                        onClick={askDeleteAdvertisement}
                        size="mini"
                        text="Elimina annuncio"
                      />
                    )}
                    {!statoAnnuncio.isRifiutato && (
                      <Button
                        color="primary"
                        onClick={() => openSnackbar("TODO hehe ✨")}
                        size="mini"
                        text="Estendi"
                      />
                    )}
                    {!statoAnnuncio.isRifiutato && (
                      <Button
                        color="secondary"
                        icon="delete"
                        onClick={askDeleteAdvertisement}
                        size="mini"
                        text="Elimina annuncio"
                      />
                    )}
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
