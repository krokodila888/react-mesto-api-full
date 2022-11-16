import React, { useEffect, useState } from "react";
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const {isOpen, onClose, onUpdateUser} = props;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  },  [isOpen, currentUser]); 

  function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  } 
 
  return (
    <PopupWithForm 
        isOpen = {isOpen}
        onClose = {onClose}
        popupSelector = {'popup_profile'} 
        name = {`profile`} 
        title = {'Редактировать профиль'} 
        buttonText = {'Сохранить'}
        onSubmit={handleSubmit}
        children = {
          <>
            <input className="popup__input popup__input_username" placeholder="Имя" required id="input-username" name = "name" type="text" minLength="2" maxLength="40" value={name} onChange={e => setName(e.target.value)} />
            <span className="input-username-error popup__input-error"> </span>
            <input className="popup__input popup__input_status" placeholder="Описание" required id="input-status" name = "about" type="text" minLength="2" maxLength="200" value={description} onChange={e => setDescription(e.target.value)} />
            <span className="input-status-error popup__input-error"> </span>
           </>
        } />
  )
}

export default EditProfilePopup;  