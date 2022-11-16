import React, { useEffect, useState, useContext, useRef } from "react";
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const {isOpen, onClose, onUpdateAvatar} = props;
  const avatarRef = useRef(currentUser.avatar); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value
    );
  }
  
  return (
    <PopupWithForm 
        isOpen = {isOpen}
        onClose = {onClose}
        popupSelector = {'popup_avatar'} 
        name = {`avatar`} 
        title = {'Обновить аватар'} 
        buttonText = {'Сохранить'}
        onSubmit={handleSubmit}
        children = {
          <>
              <input ref={avatarRef} className="popup__input popup__input-avatar" placeholder="Ссылка на изображение" required id="input-avatar" name="avatar" type="url" />
              <span className="input-avatar-error popup__input-error"> </span>
          </>
        } />
  )
}

export default EditAvatarPopup;  