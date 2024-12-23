import * as logicAnnuncio from "@logic/annuncio";
import Button from "@components/button";
import ImageInput from '@components/imageInput';
import InlineAlert from '@components/inlineAlert';
import React, { useState, useCallback } from "react";
import SelectCategory from "@templates/selectCategory";
import SelectProvince from "@templates/selectProvince";
import TextInput from '@components/textInput';
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import { useDispatch } from "react-redux";
import { useSnackbars } from "@contexts/SnackbarsContext";

const fromFileInputToBlobPromise = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

const AnnuncioCrea = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigator();
  const { openSnackbar } = useSnackbars();

  const [loading, setLoading] = useState(false);
  const [formCategory, setFormCategory] = useState(null);
  const [formProvince, setFormProvince] = useState(null);
  const [formTitolo, setFormTitolo] = useState("");
  const [formCitta, setFormCitta] = useState("");
  const [formDescrizione, setFormDescrizione] = useState("");
  const [formImages, setFormImages] = useState([]);
  const [formErrors, setFormErrors] = useState(null);

  const onCreaClick = useCallback(async () => {
    setLoading(true);
    setFormErrors(null);

    const filePromises = formImages.map(fromFileInputToBlobPromise);
    const filesBlobs = await Promise.all(filePromises);

    dispatch(logicAnnuncio.createAdvertisement({
      title: formTitolo,
      description: formDescrizione,
      categoryId: formCategory,
      province: formProvince,
      city: formCitta,
      imagesBlobs: filesBlobs,
    }))
      .then(() => {
        openSnackbar("✨ Annuncio creato!");
        navigate(ROUTES.HOME);
      })
      .catch((e) => {
        openSnackbar("❌ " + e.message);
        setFormErrors(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formImages, dispatch, formTitolo, formDescrizione, formCategory, formProvince, formCitta, openSnackbar, navigate]);

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Crea annuncio</span>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <SelectCategory
            value={formCategory}
            setValue={setFormCategory}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Titolo"
            value={formTitolo}
            setValue={setFormTitolo}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <SelectProvince
            label="Provincia"
            value={formProvince}
            setValue={setFormProvince}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Luogo"
            value={formCitta}
            setValue={setFormCitta}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TextInput
            label="Descrizione"
            value={formDescrizione}
            setValue={setFormDescrizione}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <ImageInput
            label="Foto"
            buttonText="Aggiungi foto"
            setValue={setFormImages}
            disabled={loading}
          />
        </div>
      </div>
      <br />
      <br />
      <div className='row'>
        <div className='col col-flex-center'>
          <Button
            color="primary"
            // icon="save"
            onClick={onCreaClick}
            text="Salva"
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <InlineAlert type="error" text={formErrors} />
        </div>
      </div>
    </>
  );
};

export default AnnuncioCrea;
