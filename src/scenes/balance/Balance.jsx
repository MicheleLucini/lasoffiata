import * as logicUser from "@logic/user";
import Badge from "@components/badge";
import BalanceModalAddCredits from "./BalanceModalAddCredits";
import Button from "@components/button";
import Card from "@components/card";
import DetailsGrid from '@components/detailsGrid';
import Icon from "@components/icon";
import React, { useState, useMemo, useCallback, useEffect } from "react";
// import TextInput from '@components/textInput';
import styles from "./Balance.module.css";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { checkConstant, getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
import { selectUser } from '@store/userSlice';
import { useDispatch } from "react-redux";
import { useModals } from "@contexts/ModalsContext";
import { useSelector } from "react-redux";
import InlineAlert from '@components/inlineAlert';
// import { useSnackbars } from "@contexts/SnackbarsContext";
import * as apiUser from "@api/user";
//import * as storeUser from "@store/userSlice";

const Balance = () => {
  const dispatch = useDispatch();
  // const { openSnackbar } = useSnackbars();

  const user = useSelector(selectUser);
  const { navigate } = useNavigator();
  const { openModal } = useModals();

  // const [formSuccess, setFormSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const datiDiFatturazione = useMemo(() => [
    {
      label: "Tipo account",
      value: getConstantDescriptionByValue(ACCOUNT_TYPE, user.accountType),
    },
    ...(checkConstant(ACCOUNT_TYPE.PRIVATO, user.accountType) ? [
      { label: "Cognome", value: user.lastName, },
      { label: "Nome", value: user.name, },
      { label: "Codice fiscale", value: user.codiceFiscale, }
    ] : [
      { label: "Ragione sociale", value: user.businessName, },
      { label: "Partita IVA", value: user.partitaIva, }
    ]),
    { label: "Stato", value: user.country },
    { label: "Provincia", value: user.province },
    { label: "CAP", value: user.zipCode },
    { label: "Comune", value: user.city },
    { label: "Via", value: user.street },
    { label: "Civico", value: user.civic },
  ].filter((x) => x), [user]);

  const areDatiDiFatturazioneCompleti = useMemo(() => (
    logicUser.areUserBillingDataComplete(user)
  ), [user]);

  const onAddCreditsClick = useCallback((annuncio) => {
    openModal({
      title: "Aggiungi crediti",
      children: <BalanceModalAddCredits />,
    });
  }, [openModal]);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const paymentID = urlParams.get("paymentId");
  //   const payerID = urlParams.get("PayerID");
  //   if(paymentID && payerID){
  //     setLoading(true);
  //     dispatch(async () => {
  //       return await apiUser.ExecutePayment({
  //         paymentID: paymentID,
  //         payerID: payerID
  //       });
  //     })
  //     .then((result) => {
  //       window.location.search = "";
  //     })
  //     .catch((e) => {
  //       setFormErrors(e.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   }
  // }, [dispatch]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Il tuo bilancio</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.credits}>
            <Icon
              name="savings"
              // name="credit_card"
              fill={0}
              weight={500}
              grade={0}
              opticalSize={40}
              size={40}
            />
            <span>{user.credits}</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col col-flex-center'>
          <Button
            color="primary"
            // icon="add_card"
            onClick={onAddCreditsClick}
            text="Aggiungi crediti"
            disabled={loading}
          />
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Card>
            <div className='row'>
              <div className='col'>
                <span className='page-section'>I tuoi dati di fatturazione</span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <DetailsGrid
                  labels={datiDiFatturazione.map((x) => x.label)}
                  values={datiDiFatturazione.map((x) => x.value)}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col col-flex' style={{ width: "auto", justifyContent: "space-between" }}>
                <Button
                  icon="edit"
                  onClick={() => navigate(ROUTES.PERSONAL_BILLING_INFO)}
                  size="mini"
                  text="Modifica dati"
                  disabled={loading}
                />
                {!areDatiDiFatturazioneCompleti && (
                  <Badge
                    icon="warning"
                    text="Dati non completi"
                    type="warning"
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <InlineAlert type="error" text={formErrors} />
          {/* <InlineAlert type="success" text={formSuccess} /> */}
        </div>
      </div>
    </>
  );
};

export default Balance;
