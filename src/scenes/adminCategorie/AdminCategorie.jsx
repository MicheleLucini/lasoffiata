import React, { useState, useEffect } from "react";
import styles from "./AdminCategorie.module.css";
import { useDispatch } from "react-redux";
import * as apiPublic from "@api/public";
import * as apiAdministration from "@api/administration";
import InlineAlert from '@components/inlineAlert';
import TextInput from '@components/textInput';
import Button from '@components/button';

const AdminCategorie = () => {

  const dispatch = useDispatch();

  const [formIDCategoria, setFormIDCategoria] = useState("");
  const [formNomeCategoria, setFormNomeCategoria] = useState("");
  const [formIDCategoriaCartaceo, setFormIDCategoriaCartaceo] = useState("");
  const [formParentIDCategoria, setFormParentIDCategoria] = useState("");

  const [formIDPaperCategory, setFormIDPaperCategory] = useState("");
  const [formNomePaperCategory, setFormNomePaperCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [paperCategories, setPaperCategories] = useState([]);
  // const [formSuccess, setFormSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async () => {
      const categoriesData = await apiPublic.GetCategories();
      setCategories(categoriesData);

      const paperCategoriesData = await apiPublic.GetPaperCategories();
      setPaperCategories(paperCategoriesData);
    })
      .then(() => {
      })
      .catch((e) => {
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [dispatch]);

  const clearFormCategorie = () => {
    setFormIDCategoria("");
    setFormNomeCategoria("");
    setFormIDCategoriaCartaceo("");
    setFormParentIDCategoria("");
  }

  const clearFormPaperCategory = () => {
    setFormIDPaperCategory("");
    setFormNomePaperCategory("");
  }

  const handleCreateCategory = async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async ()=>{
      await apiAdministration.CreateCategory({
        name: "New Category",
        parentCategoryId: 0,
        paperCategoryId: 0,
      });

      clearFormCategorie();
      
      const updatedCategories = await apiPublic.GetCategories();
      setCategories(updatedCategories);
    })
    .then(() => {
    })
    .catch((e) => {
      setFormErrors(e.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleSaveCategory = async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async ()=>{
      await apiAdministration.EditCategory({
        categoryId: formIDCategoria,
        name: formNomeCategoria,
        parentCategoryId: formParentIDCategoria,
        paperCategoryId: formIDCategoriaCartaceo,
      });

      clearFormCategorie();
      
      const updatedCategories = await apiPublic.GetCategories();
      setCategories(updatedCategories);
    })
    .then(() => {
    })
    .catch((e) => {
      setFormErrors(e.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  
  const handleDeleteCategory = async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async ()=>{
      await apiAdministration.DeleteCategory({
        categoryId: formIDCategoria
      });

      clearFormCategorie();
      
      const updatedCategories = await apiPublic.GetCategories();
      setCategories(updatedCategories);
    })
    .then(() => {
    })
    .catch((e) => {
      setFormErrors(e.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleCreatePaperCategory = async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async ()=>{
      await apiAdministration.CreatePaperCategory({
        name: "New Category"
      });
      
      clearFormPaperCategory();

      const updatedPaperCategories = await apiPublic.GetPaperCategories();
      setPaperCategories(updatedPaperCategories);
    })
      .then(() => {
    })
    .catch((e) => {
      setFormErrors(e.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleSavePaperCategory = async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async ()=>{
      await apiAdministration.EditPaperCategory({
        paperCategoryId: formIDPaperCategory,
        name: formNomePaperCategory
      });

      clearFormPaperCategory();
      
      const updatedPaperCategories = await apiPublic.GetPaperCategories();
      setPaperCategories(updatedPaperCategories);
    })
    .then(() => {
    })
    .catch((e) => {
      setFormErrors(e.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  
  const handleDeletePaperCategory = async () => {
    setLoading(true);
    setFormErrors(null);
    dispatch(async ()=>{
      await apiAdministration.DeletePaperCategory({
        paperCategoryId: formIDPaperCategory
      });

      clearFormPaperCategory();
      
      const updatedPaperCategories = await apiPublic.GetPaperCategories();
      setPaperCategories(updatedPaperCategories);
    })
    .then(() => {
    })
    .catch((e) => {
      setFormErrors(e.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleOpenCategoria = async(id) => {
    const pickedCategory = categories.find((element) => element.id === id);
    setFormIDCategoria(pickedCategory.id);
    setFormNomeCategoria(pickedCategory.name);
    setFormIDCategoriaCartaceo(pickedCategory.paperCategoryId);
    setFormParentIDCategoria(pickedCategory.parentCategoryId);
  }

  const handleOpenPaperCategory = async(id) => {
    const pickedPaperCategory = paperCategories.find((element) => element.id === id);
    setFormIDPaperCategory(pickedPaperCategory.id);
    setFormNomePaperCategory(pickedPaperCategory.name);
  }

  return (
    <>
      <span>Gestione categorie</span>
      <div className={styles.wrapperAnnunci}>
        <h2>Categories</h2>
        <div className='row'>
          <div className='col'>
            <Button
                color="primary"
                disabled={loading}
                fullWidth
                onClick={handleCreateCategory}
                text="Create Category"
            />
          </div>
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleOpenCategoria(category.id)}>{category.name}</li>
          ))}
        </ul>
        
        <div className='row'>
          <div className='col'>
            <TextInput
              label="ID"
              value={formIDCategoria}
              setValue={setFormIDCategoria}
              disabled={true}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <TextInput
              label="Nome"
              value={formNomeCategoria}
              setValue={setFormNomeCategoria}
              disabled={loading}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <TextInput
              label="Parent ID"
              value={formParentIDCategoria}
              setValue={setFormParentIDCategoria}
              disabled={loading}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <TextInput
              label="Paper Category ID"
              value={formIDCategoriaCartaceo}
              setValue={setFormIDCategoriaCartaceo}
              disabled={loading}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Button
                color="primary"
                disabled={loading}
                fullWidth
                onClick={handleSaveCategory}
                text="Save Category"
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Button
                color="primary"
                disabled={loading}
                fullWidth
                onClick={handleDeleteCategory}
                text="Delete Category"
            />
          </div>
        </div>

        <h2>Paper Categories</h2>
        
        <div className='row'>
          <div className='col'>
            <Button
                color="primary"
                disabled={loading}
                fullWidth
                onClick={handleCreatePaperCategory}
                text="Create Paper Category"
            />
          </div>
        </div>
        <ul>
          {paperCategories.map((paperCategory) => (
            <li key={paperCategory.id} onClick={() => handleOpenPaperCategory(paperCategory.id)}>{paperCategory.name}</li>
          ))}
        </ul>

        <div className='row'>
          <div className='col'>
            <TextInput
              label="ID"
              value={formIDPaperCategory}
              setValue={setFormIDPaperCategory}
              disabled={true}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <TextInput
              label="Nome"
              value={formNomePaperCategory}
              setValue={setFormNomePaperCategory}
              disabled={loading}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Button
                color="primary"
                disabled={loading}
                fullWidth
                onClick={handleSavePaperCategory}
                text="Save Category"
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Button
                color="primary"
                disabled={loading}
                fullWidth
                onClick={handleDeletePaperCategory}
                text="Delete Category"
            />
          </div>
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

export default AdminCategorie;
