import React, { useEffect, useState } from "react";
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

function Register(props) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {registerUser} = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = {password, email};
    registerUser(data);
  }
  
  return (
    <>
      <div className='sign__background'>
        <div className="sign__container">
          <p className="sign__title">
            Регистрация
          </p>
          <form onSubmit={handleSubmit} className="sign__form-container">
            <input className="sign__input" id="emailRegister" name="email" type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            <span className="input-emailRegister-error popup__input-error"> </span>
            <input className="sign__input" id="passwordRegister" name="password" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            <span className="input-emailLRegister-error popup__input-error"> </span>
            <button type="submit" onSubmit={handleSubmit} className="sign__button">Зарегистрироваться</button>
          </form>
          <div className="sign__link-container">
            <p className="sign__text">Уже зарегистрированы? </p>
            <Link to="/sign-in" className="sign__link sign__text"> Войти</Link>
          </div>
        </div>  
      </div>
    </>
  );
}

export default Register;
