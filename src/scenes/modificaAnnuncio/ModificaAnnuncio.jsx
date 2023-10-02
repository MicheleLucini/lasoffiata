import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as apiPublic from "@api/public";
import * as logicAnnuncio from "@logic/annuncio";
import { ROUTES, useNavigator } from "@contexts/NavigatorContext";
import Button from "@components/button";
import ImageInput, { FakeImageInput } from '@components/imageInput';
import InlineAlert from '@components/inlineAlert';
import TextInput from '@components/textInput';
import SelectCategory from "@templates/selectCategory";
import SelectProvince from "@templates/selectProvince";
import { getAdvertisementImageUrl } from "@logic/annuncio"

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

const ModificaAnnuncio = () => {
  const dispatch = useDispatch();
  const { navigate, currentRoute } = useNavigator();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [formCategory, setFormCategory] = useState(null);
  const [formProvince, setFormProvince] = useState(null);
  const [formTitolo, setFormTitolo] = useState("");
  const [formCitta, setFormCitta] = useState("");
  const [formDescrizione, setFormDescrizione] = useState("");
  const [formImages, setFormImages] = useState([]);
  const [formDeletedImages, setFormDeletedImages] = useState([]);
  const [formErrors, setFormErrors] = useState(null);

  const loadAnnuncio = useCallback(async () => {
    const data = await apiPublic.GetAdvertisement({ advertisementId: currentRoute.params[0] });
    setInitialValues(data);
    setFormCategory(data.categoryId); // 14
    setFormProvince(data.province); // "CR"
    setFormTitolo(data.title); // "test"
    setFormCitta(data.city); // "test"
    setFormDescrizione(data.description); // "test"
    setFormDeletedImages([]);
  }, [currentRoute])


  const onSalvaClick = useCallback(async () => {
    setLoading(true);
    setFormErrors(null);

    const filePromises = formImages.map(fromFileInputToBlobPromise);
    const filesBlobs = await Promise.all(filePromises);

    dispatch(logicAnnuncio.editAdvertisement({
      advertisementId: initialValues.id,
      title: formTitolo,
      description: formDescrizione,
      categoryId: formCategory,
      province: formProvince,
      city: formCitta,
      newImageBlob: filesBlobs.join("#"),
      deletedImageIds: formDeletedImages.join(";"),
    }))
      .then(() => {
        navigate(ROUTES.ANNUNCIO, [initialValues.id]);
      })
      .catch((e) => {
        setFormErrors(e.message);
        setLoading(false);
      });
  }, [formImages, dispatch, initialValues, formTitolo, formDescrizione, formCategory, formProvince, formCitta, formDeletedImages, navigate]);

  const removeImage = useCallback((id) => {
    setFormDeletedImages((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const immaginiAnnuncio = useMemo(() => {
    return initialValues?.images.map((x) => {
      if (formDeletedImages.includes(x.id)) {
        return null;
      }
      return getAdvertisementImageUrl({
        userId: initialValues.userId,
        advertisementId: initialValues.id,
        imageId: x.id,
      });
    });
  }, [formDeletedImages, initialValues]);

  useEffect(() => {
    loadAnnuncio();
  }, [loadAnnuncio])

  return (
    <>
      <br></br>
      <div className='row'>
        <div className='col'>
          <span className='page-title'>Modifica annuncio</span>
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
          <FakeImageInput
            images={immaginiAnnuncio}
            removeImage={removeImage}
            disabled={loading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <ImageInput
            setValue={setFormImages}
            disabled={loading}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='row'>
        <div className='col'>
          <Button
            text="Salva"
            icon="save"
            onClick={onSalvaClick}
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

export default ModificaAnnuncio;
