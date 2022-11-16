import React, { useEffect, useState } from "react";
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';

function Login (props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {handleLogin, loginUser} = props;
 
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
      e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    const data = {password, email};
    console.log(data);
      loginUser(data);
      handleLogin();
    }
  
  return(
     <div className='sign__background'>
      <div className="sign__container">
        <p className="sign__title">
          Вход
        </p>
        <form onSubmit={handleSubmit} className="sign__form-container">
          <input required id="emailLogin" name="email" placeholder="E-mail" type="text" value={email} onChange={e => setEmail(e.target.value)} className="sign__input"/>
          <span className="input-emailLogin-error popup__input-error"> </span>
          <input required id="passwordLogin" name="password" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} className="sign__input" />
          <span className="input-passwordLogin-error popup__input-error"> </span>
          <button type="submit" className="sign__button">Войти</button>
        </form>
      </div>  
    </div>
  )
}

export default Login;