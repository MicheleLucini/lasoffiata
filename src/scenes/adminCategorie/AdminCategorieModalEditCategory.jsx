import * as apiAdministration from "@api/administration";
import Button from '@components/button';
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Select from "@components/select";
import TextInput from '@components/textInput';
import styles from "./AdminCategorie.module.css";
import { ACCOUNT_TYPE, SERVICE_TYPE, getConstantDescriptionByValue, getSelectOptionsFromConstant } from "@logic/constants";
import { useSnackbars } from "@contexts/SnackbarsContext";

const pricesSortingFn = (a, b) => {
  if (a.accountType < b.accountType) return -1;
  if (a.accountType > b.accountType) return 1;
  if (a.serviceType < b.serviceType) return -1;
  if (a.serviceType > b.serviceType) return 1;
  return 0;
};

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

  const onFormPriceValueChange = useCallback((price, fieldName, newValue) => {
    const isSamePriceFn = (pa, pb) => pa.accountType === pb.accountType && pa.serviceType === pb.serviceType;
    setValues((prev) => {
      const p = {
        ...prev.prices.find((x) => isSamePriceFn(x, price)),
        [fieldName]: newValue,
      };
      return {
        ...prev,
        prices: [
          ...prev.prices.filter((x) => !isSamePriceFn(x, price)),
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
      parentCategoryId: values.parentCategoryId || 0,
      prices: values.prices.map((x) => ({
        accountType: x.accountType || 0,
        serviceType: x.serviceType || 0,
        price: Number(x.price) || 0,
      })),
    })
      .then(() => {
        openSnackbar("Dati aggiornati ✔️");
        onEditCallback();
      })
      .catch((e) => {
        openSnackbar("❌ " + e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category.id, onEditCallback, openSnackbar, values.name, values.parentCategoryId, values.prices]);

  const onDelete = useCallback(() => {
    setLoading(true);
    apiAdministration.DeleteCategory({ categoryId: category.id, })
      .then(() => {
        openSnackbar("Eliminato ✔️");
        onEditCallback();
      })
      .catch((e) => {
        openSnackbar("❌ " + e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category.id, onEditCallback, openSnackbar]);

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

  // 

  useEffect(() => {
    setValues({
      parentCategoryId: category.parentCategoryId,
      name: category.name,
      prices: getSelectOptionsFromConstant(ACCOUNT_TYPE).flatMap((at) => {
        return getSelectOptionsFromConstant(SERVICE_TYPE).map((st) => ({
          accountType: at.value,
          serviceType: st.value,
          price: category.categoryPrices?.find((x) => x.accountType === at.value && x.serviceType === st.value)?.price || 0,
        }))
      }),
    });
  }, [category])

  return (
    <>
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
          <div className={styles.tablePrezzi}>
            <label>Tipo account</label>
            <label>Tipo servizio</label>
            <label>Prezzo</label>
            {values.prices?.sort(pricesSortingFn).map((x) => (
              <React.Fragment key={x.accountType + "_" + x.serviceType}>
                <TextInput value={getConstantDescriptionByValue(ACCOUNT_TYPE, x.accountType)} disabled={true} />
                <TextInput value={getConstantDescriptionByValue(SERVICE_TYPE, x.serviceType)} disabled={true} />
                {/* <span>{getConstantDescriptionByValue(SERVICE_TYPE, x.serviceType)}</span> */}
                <TextInput value={x.price} setValue={(val) => onFormPriceValueChange(x, "price", val)} disabled={loading} />
                {/* <TextInput
                  disabled={loading}
                  setValue={(val) => onFormPriceValueChange(x.uuid, "freeThreshold", val)}
                  value={x.freeThreshold}
                /> */}
              </React.Fragment>
            ))}
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
