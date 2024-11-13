import * as apiAdministration from "@api/administration";
import Button from '@components/button';
import React, { useState, useMemo, useCallback, useEffect } from "react";
import TextInput from '@components/textInput';
import { useSnackbars } from "@contexts/SnackbarsContext";
import Select from "@components/select";

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

  const parentCategoryOptions = useMemo(() => (
    categories.map((x) => ({
      value: x.id,
      description: x.id + " - " + x.name,
    }))
  ), [categories]);

  const onParentCategorySelection = useCallback((newValue) => {
    onFormValueChange("parentCategoryId", newValue || null);
  }, [onFormValueChange]);

  useEffect(() => {
    setValues({
      parentCategoryId: category.parentCategoryId,
      name: category.name,
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
      <br></br>
      <div className='row'>
        <div className='col col-flex-center'>
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
