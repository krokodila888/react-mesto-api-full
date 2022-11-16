import React from 'react';

function InfoTooltip(props) {
 
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container 'popup__content'}`}>
        <button  className="popup__close-button" onClick={props.onClose} type="button"></button>
        <div className={`popup__form-container`}>
          <img src={props.image} alt="Результат запроса" className="info__image" />
          <h2 className="popup__title info__title">{props.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;  