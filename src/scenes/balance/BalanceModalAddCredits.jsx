// import * as logicUser from "@logic/user";
import Button from "@components/button";
import Checkbox from "@components/checkbox";
// import Card from "@components/card";
// import DetailsGrid from '@components/detailsGrid';
// import Icon from "@components/icon";
import React, { useState, /*useMemo, useCallback, useEffect */ } from "react";
// import TextInput from '@components/textInput';
// import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
// import { checkConstant, getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
// import { selectUser } from '@store/userSlice';
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
//import { useSnackbars } from "@contexts/SnackbarsContext";
import styles from "./Balance.module.css";
import * as apiUser from "@api/user";

const Balance = () => {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const { navigate } = useNavigator();
  //const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [check10, setCheck10] = useState(false);
  const [check25, setCheck25] = useState(false);
  const [check50, setCheck50] = useState(false);
  const [check100, setCheck100] = useState(false);

  const resetCheckboxes = () => {
    setCheck10(false); setCheck25(false); setCheck50(false); setCheck100(false);
  };

  const onCheck10Change = () => { resetCheckboxes(); setCheck10(true); };
  const onCheck25Change = () => { resetCheckboxes(); setCheck25(true); };
  const onCheck50Change = () => { resetCheckboxes(); setCheck50(true); };
  const onCheck100Change = () => { resetCheckboxes(); setCheck100(true); };

  const onClickAcquista = () => {
    setLoading(true);

    let quantity;

    if (check10) quantity = 10;
    if (check25) quantity = 25;
    if (check50) quantity = 50;
    if (check100) quantity = 100;

    // dispatch(() => {
    //   return apiUser.CreatePayment({
    //     service: 1, // Crediti
    //     quantity: quantity
    //   });
    // })
    //   .then((result) => {
    //     window.location = result.links[1].href;
    //   })
    //   .catch((e) => {
    //     //setFormErrors(e.message);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span>I crediti servono per comprare annunci e servizi su La Soffiata. Quanti ne vuoi acquistare?</span>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <div className={styles.option + (check10 ? " " + styles.selected : "")} onClick={onCheck10Change}>
            <Checkbox value={check10} setValue={onCheck10Change} />
            <span>5</span>
          </div>
          <div className={styles.option + (check10 ? " " + styles.selected : "")} onClick={onCheck10Change}>
            <Checkbox value={check10} setValue={onCheck10Change} />
            <span>10</span>
          </div>
          <div className={styles.option + (check10 ? " " + styles.selected : "")} onClick={onCheck10Change}>
            <Checkbox value={check10} setValue={onCheck10Change} />
            <span>15</span>
          </div>
          <div className={styles.option + (check10 ? " " + styles.selected : "")} onClick={onCheck10Change}>
            <Checkbox value={check10} setValue={onCheck10Change} />
            <span>20</span>
          </div>
          <div className={styles.option + (check25 ? " " + styles.selected : "")} onClick={onCheck25Change}>
            <Checkbox value={check25} setValue={onCheck25Change} />
            <span>25</span>
          </div>
          <div className={styles.option + (check50 ? " " + styles.selected : "")} onClick={onCheck50Change}>
            <Checkbox value={check50} setValue={onCheck50Change} />
            <span>50</span>
          </div>
          <div className={styles.option + (check100 ? " " + styles.selected : "")} onClick={onCheck100Change}>
            <Checkbox value={check100} setValue={onCheck100Change} />
            <span>100</span>
          </div>
          <div className={styles.option + (check100 ? " " + styles.selected : "")} onClick={onCheck100Change}>
            <Checkbox value={check100} setValue={onCheck100Change} />
            <span>500</span>
          </div>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Button
            color="primary"
            disabled={loading || (!check10 && !check25 && !check50 && !check100)}
            fullWidth
            onClick={onClickAcquista}
            text="Acquista"
          />
        </div>
      </div>
    </>
  );
};

export default Balance;
