import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';
import { api } from './../utils/Api';
import { sign } from '../utils/Sign';
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ok from '../images/ok.svg';
import notOk from '../images/notOk.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);  
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);  
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoImage, setInfoImage] = useState('');
  const [infoTitle, setInfoTitle] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState({
    avatar: '',
    name: '',
    about: '',
  });
  
  useEffect(() => {
    if (loggedIn){
      api
        .getProfileInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err))
      }}, [loggedIn])

  function openEditProfile() {
    {return setIsEditProfilePopupOpen(true)}
  }
  
  function openPopupAvatar() {
    {return setIsEditAvatarPopupOpen(true)}
  }
    
  function openPopupMesto() {
    {return setIsAddPlacePopupOpen(true)}
  }

  function openInfoTooltip() {
    {return setIsInfoTooltipOpen(true)}
  }

  function handleCardClick(data) {
    return setIsImagePopupOpen(true), 
    setSelectedCard(data);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data1) => {
        setCurrentUser(data1);
        closeAllPopups()
    })
  }

  function handleLoginUser(data) {
    sign
      .signIn(data)
      .then((res) => {
        setEmail(data.email);
        navigate("/");
      })
      .catch((err) => 
      {console.log(err);
      setInfoImage(notOk);
      setInfoTitle("Что-то пошло не так! Попробуйте ещё раз.");
      openInfoTooltip();
      })
   }

  function handleRegisterUser(data) {
    sign
      .signUp(data)
      .then((data) => {
        setInfoImage(ok);
        setInfoTitle("Вы успешно зарегистрировались!");
        openInfoTooltip();
        navigate("/sign-in");        
      })
      .catch((err) => {
        console.log(err);
        setInfoImage(notOk);
        setInfoTitle("Что-то пошло не так! Попробуйте ещё раз.");
        openInfoTooltip();
      })
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((data1) => {
        setCurrentUser(data1);
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loggedIn){
      api.getInitialCards()
        .then((card) => {
          setCards([...cards, ...card])
      })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => console.log(err))
  } 

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) return api.removeCard(card._id)
      .then(() => {
        const newCard = cards.filter((item) => item._id !== card._id);
        setCards(newCard);
      })
      .catch((err) => console.log(err))
  } 

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  function handleLogin() {
    //e.preventDefault(); //эта часть под вопросом пока
    return setLoggedIn(true)
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/sign-in");
    setEmail('');
  }

  function handleTokenCheck(){
    console.log(localStorage);
    const jwt = localStorage.token;
    console.log(jwt);
    if (jwt){
      sign.headerCheck(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
      })
      .catch((err) => console.log(`Ошибка ${err}`));
    }
  };
      
  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
          email={email}
          exitProfile={handleLogOut}
          />
          <Routes>
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} loginUser = {handleLoginUser}/>}>
            </Route>
            <Route path="/sign-up" element={<Register registerUser={handleRegisterUser}/>}>
            </Route>
            <Route exact path="/" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main 
                onEditProfile = {openEditProfile} 
                onEditAvatar = {openPopupAvatar} 
                onAddPlace = {openPopupMesto} 
                onClose = {closeAllPopups}
                onCardClick = {handleCardClick} 
                cards = {cards}
                onCardLike = {handleCardLike}
                onCardDelete = {handleCardDelete} />
              <Footer />
            </ProtectedRoute>}>      
            </Route>
          </Routes>
      
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateCards={handleAddPlaceSubmit}/>
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}/>
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} /> 
          <PopupWithForm 
            onClose = {closeAllPopups}
            popupSelector = {'popup_remove'} 
            name = {`remove`} 
            title = {'Вы уверены?'} 
            buttonText = {'Да'}
          />
          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            onClose = {closeAllPopups}
            title = {infoTitle}
            image = {infoImage}
          />
          <ImagePopup 
            onClose = {closeAllPopups}
            card = {selectedCard}
            isImagePopupOpen={isImagePopupOpen}
          />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
