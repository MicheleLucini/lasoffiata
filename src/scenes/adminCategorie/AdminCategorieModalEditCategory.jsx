import * as apiAdministration from "@api/administration";
import Button from '@components/button';
import React, { useState, useMemo, useCallback, useEffect } from "react";
import TextInput from '@components/textInput';
import { useSnackbars } from "@contexts/SnackbarsContext";
import Select from "@components/select";
import styles from "./AdminCategorie.module.css";
import { getSelectOptionsFromConstant, ACCOUNT_TYPE } from "@logic/constants";

const generateUuid = () => "new" + Math.floor(Math.random() * 9999);

const AdminCategorieModalEditCategory = ({ categories, category, onEditCallback }) => {
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  const onFormValueChange = useCallback((fieldName, newValue) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  }, []);

  const onFormPriceValueChange = useCallback((priceId, fieldName, newValue) => {
    setValues((prev) => {
      const p = {
        ...prev.categoryPrices.find((x) => x.id === priceId),
        [fieldName]: newValue,
      };
      return {
        ...prev,
        categoryPrices: [
          ...prev.categoryPrices.filter((x) => x.id !== priceId),
          p,
        ],
      };
    });
  }, []);

  const onSave = useCallback(() => {
    setLoading(true);
    apiAdministration.EditCategory({
      categoryId: category.id,
      name: values.name,
      parentCategoryId: values.parentCategoryId,
    })
      .then(() => {
        openSnackbar("Dati aggiornati ✔️");
        onEditCallback();
      })
      .catch((e) => {
        openSnackbar("Qualcosa è andato storto ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category.id, onEditCallback, openSnackbar, values.name, values.parentCategoryId]);

  const onDelete = useCallback(() => {
    setLoading(true);
    apiAdministration.DeleteCategory({ categoryId: category.id, })
      .then(() => {
        openSnackbar("Eliminato ✔️");
        onEditCallback();
      })
      .catch((e) => {
        openSnackbar("Qualcosa è andato storto ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category.id, onEditCallback, openSnackbar]);

  const onDeleteCategoryPriceClick = useCallback(() => { }, []);

  const createCategoryPrice = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      categoryPrices: [
        ...prev.categoryPrices,
        { id: generateUuid() },
      ],
    }))
  }, []);

  // Category form

  const parentCategoryOptions = useMemo(() => (
    categories.map((x) => ({
      value: x.id,
      description: x.id + " - " + x.name,
    }))
  ), [categories]);

  const onParentCategorySelection = useCallback((newValue) => {
    onFormValueChange("parentCategoryId", newValue || null);
  }, [onFormValueChange]);

  // Category price form

  const onPriceAccountTypeSelection = useCallback((id, newValue) => {
    onFormPriceValueChange(id, "accountType", newValue);
  }, [onFormPriceValueChange]);

  // 

  useEffect(() => {
    setValues({
      parentCategoryId: category.parentCategoryId,
      name: category.name,
      categoryPrices: category.categoryPrices,
    });
  }, [category])

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <Select
            label="Categoria padre"
            options={parentCategoryOptions}
            value={values.parentCategoryId}
            setValue={onParentCategorySelection}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            disabled={loading}
            label="Nome"
            setValue={(val) => onFormValueChange("name", val)}
            value={values.name}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <span>Prezzi</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className={styles.tablePrezzi}>
            <span>Id</span>
            <span>Tipo account</span>
            <span>Tipo servizio</span>
            <span>Prezzo</span>
            <span>Soglia gratuità</span>
            <span></span>
            {values.categoryPrices?.map((x) => (
              <React.Fragment key={x.id}>
                <span>{x.id}</span>
                <Select
                  clearable={false}
                  disabled={loading}
                  options={getSelectOptionsFromConstant(ACCOUNT_TYPE)}
                  setValue={(val) => onPriceAccountTypeSelection(x.id, val)}
                  value={x.accountType}
                />
                <span>{x.serviceType}</span>
                <TextInput
                  disabled={loading}
                  setValue={(val) => onFormPriceValueChange(x.id, "price", val)}
                  value={x.price}
                />
                <TextInput
                  disabled={loading}
                  setValue={(val) => onFormPriceValueChange(x.id, "freeThreshold", val)}
                  value={x.freeThreshold}
                />
                <Button
                  disabled={loading}
                  onClick={() => onDeleteCategoryPriceClick(x)}
                  icon="delete"
                  size="mini"
                />
              </React.Fragment>
            ))}
            <div className={styles.btnCrea}>
              <Button
                disabled={loading}
                fullWidth
                onClick={createCategoryPrice}
                text="Crea nuovo prezzo categoria"
                size="mini"
              />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <div className='col col-flex-between'>
          <Button
            color="secondary"
            disabled={loading}
            onClick={onDelete}
            text="Elimina"
          />
          <Button
            color="primary"
            disabled={loading}
            onClick={onSave}
            text="Salva"
          />
        </div>
      </div>
    </>
  );
};

export default AdminCategorieModalEditCategory;
