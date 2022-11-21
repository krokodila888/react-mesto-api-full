import React, { useEffect, useState, useContext } from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const {onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards} = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-hover">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} src="<%=require('./images/kusto.svg')%>" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__username">{currentUser.name}</h1>
            <button aria-label="Редактировать" className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button aria-label="Добавить" className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <div key={item._id}>
            <Card 
              card = {item}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
            />
          </div>)
        )}
      </section>
    </main>
  );
}  

export default Main; 