function ImagePopup(props) {

  const {card, onClose, isImagePopupOpen} = props;

  return (
    <div className={`popup popup_photo ${isImagePopupOpen ? 'popup_opened' : ''}`}>
      <div className="popup__photo-container">
        <button aria-label="Закрыть" className="popup__close-button popup__close-button_photo-close-button" onClick={onClose} type="button"></button>
        <img className="popup__image popup__content" src={`${card.link}`} alt={card.name} />
        <h2 className="popup__image-text">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;