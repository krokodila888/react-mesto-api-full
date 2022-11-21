import React, { useEffect, useState } from "react";
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const {isOpen, onClose, onUpdateCards} = props;
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeUrl(evt) {
    setUrl(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCards({
      name,
      url
    });
  }

  useEffect(() => {
    setName('');
    setUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm 
        isOpen = {isOpen}
        onClose = {onClose}
        popupSelector = {'popup_mesto'} 
        name = {`mesto`} 
        title = {'Новое место'} 
        buttonText = {'Создать'}
        onSubmit={handleSubmit}
        children = {
          <>
              <input /*ref={titleRef} */className="popup__input popup__input_photo-name" required onChange={handleChangeName} id="input-photo-name" name="name" type="text" placeholder="Название" minLength="2" maxLength="30" />
              <span className="input-photo-name-error popup__input-error"> </span>
              <input /*ref={linkRef} */className="popup__input popup__input_photo-link" required onChange={handleChangeUrl} id="input-photo-link" name="link" placeholder="Ссылка на изображение" type="url" />
              <span className="input-photo-link-error popup__input-error"> </span>
          </>
        } />
  )
}

export default AddPlacePopup;  
