import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as logicAnnuncio from "@logic/annuncio";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Button from "@components/button";
import TextInput from '@components/textInput';
import SelectCategory from "@templates/selectCategory";
import SelectProvince from "@templates/selectProvince";
import styles from "./CreaAnnuncio.module.css";

const CreaAnnuncio = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const [loading, setLoading] = useState(false);
  const [formCategory, setFormCategory] = useState(null);
  const [formProvince, setFormProvince] = useState(null);
  const [formTitolo, setFormTitolo] = useState("");
  const [formCitta, setFormCitta] = useState("");
  const [formDescrizione, setFormDescrizione] = useState("");
  const [formErrors, setFormErrors] = useState(null);

  const onCreaClick = useCallback(async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(logicAnnuncio.createAdvertisement({
      title: formTitolo,
      description: formDescrizione,
      categoryId: formCategory,
      province: formProvince,
      city: formCitta,
      // imageBlob,
    }))
      .then(() => {
        navigate(ROUTES.HOME);
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, navigate, formCategory, formCitta, formDescrizione, formProvince, formTitolo]);

  return (
    <>
      <span>Crea annuncio</span>
      <SelectCategory
        value={formCategory}
        setValue={setFormCategory}
        disabled={loading}
      />
      <TextInput
        label="Titolo"
        value={formTitolo}
        setValue={setFormTitolo}
        disabled={loading}
      />
      <SelectProvince
        label="Provincia"
        value={formProvince}
        setValue={setFormProvince}
        disabled={loading}
      />
      <TextInput
        label="Luogo"
        value={formCitta}
        setValue={setFormCitta}
        disabled={loading}
      />
      <TextInput
        label="Descrizione"
        value={formDescrizione}
        setValue={setFormDescrizione}
        disabled={loading}
      />
      <Button
        text="Crea"
        icon="add"
        onClick={onCreaClick}
      />
      {formErrors && <span className={`${styles.formMessage} ${styles.error}`}>{formErrors}</span>}
    </>
  );
};

export default CreaAnnuncio;
