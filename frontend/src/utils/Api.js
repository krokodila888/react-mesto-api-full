import { bazeUrl } from './constants.js';

export class Api {
  constructor(bazeUrl) {
    this._bazeUrl = bazeUrl;
  }

  _handleResult(res) {
    if (res.ok) {
        return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  getInitialCards() {
    this._initialCards = fetch(`${this._bazeUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then(this._handleResult);
    return this._initialCards;
  }

  getProfileInfo() {
    this._profileInfo = fetch(`${this._bazeUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(this._handleResult);
    return this._profileInfo;
  }

  editUserInfo({ name, about }) {
    this._newProfile = fetch(`${this._bazeUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._handleResult);
    return this._newProfile;
  }

  postNewCard({ name, url }) {
    this._newCards = fetch(`${this._bazeUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name, link: url})
      }).then(this._handleResult);
      return this._newCards;  
  }

  removeCard(cardID) {
    this._removedCard = fetch(`${this._bazeUrl}/cards/${cardID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this._handleResult);
    return this._removedCard;
  }
  
  likeCard(cardID) {
    this._like = fetch(`${this._bazeUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this._handleResult);
    return this._like;
  }

  dislikeCard(cardID) {
    this._dislike = fetch(`${this._bazeUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this._handleResult);
    return this._dislike;
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (!isLiked) return (api.likeCard(cardID));
    if (isLiked) return (api.dislikeCard(cardID));
  }

  changeAvatar(data) {
    this._changedAvatar = fetch(`${this._bazeUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar: data})
    }).then(this._handleResult);
    return this._changedAvatar
  }

  signout() {
    return fetch(`${this._bazeUrl}/signout`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResponse);
  }
}

export const api = new Api(bazeUrl);
