import { bazeUrl } from './constants.js';

export class Sign {
  constructor({bazeUrl}) {
    this._bazeUrl = bazeUrl;
  }
  
  _handleResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  signIn(email, password) {
    return fetch(`${bazeUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password })
      })
      .then(this._handleResult)
  } 

  signUp(data) {
    return fetch(`${bazeUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        'password': data.password,
        'email': data.email })
      })
      .then(this._handleResult)
  } 

  signOut() {
    return fetch(`${bazeUrl}/signout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
  }

  checkToken() {
    return fetch(`${bazeUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._handleResult)
  }
}

export const sign = new Sign({ bazeUrl });
