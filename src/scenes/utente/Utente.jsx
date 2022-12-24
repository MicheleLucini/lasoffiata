import React, { useState, useCallback, useEffect } from "react";
import { useNavigator } from "@contexts/NavigatorContext";
import * as apiPublic from "@api/public";
// import { getConstantDescriptionByValue, ACCOUNT_TYPE } from "@logic/constants";
// import Button from '@components/button';
// import SelectYear from "@templates/selectYear";
// import TextInput from '@components/textInput';
// import styles from "./PersonalInfo.module.css";

const Utente = () => {
  const { currentRoute } = useNavigator();
  // const { openDialog } = useDialogs();
  // const user = useSelector(selectUser);
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
      <span>{JSON.stringify(utente)}</span>
    </>
  );
};

export default Utente;
