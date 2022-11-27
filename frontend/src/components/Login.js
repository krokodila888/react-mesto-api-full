import React, { useState } from "react";

function Login (props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {handleLogin, loginUser} = props;
 
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    loginUser(
      email,
      password
    );
    handleLogin();
  }
  
  return(
     <div className='sign__background'>
      <div className="sign__container">
        <p className="sign__title">
          Вход
        </p>
        <form onSubmit={handleSubmit} className="sign__form-container">
          <input required id="emailLogin" name="email" placeholder="E-mail" type="text" value={email} onChange={handleEmailChange} className="sign__input"/>
          <span className="input-emailLogin-error popup__input-error"> </span>
          <input required id="passwordLogin" name="password" type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} className="sign__input" />
          <span className="input-passwordLogin-error popup__input-error"> </span>
          <button type="submit" className="sign__button">Войти</button>
        </form>
      </div>  
    </div>
  )
}

export default Login;