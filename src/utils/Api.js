import { authorization, cohortId } from "./constants";

export default class Api {
  constructor({ cohortId, authorization }) {
    this._cohortId = cohortId;
    this._authorization = authorization;
  }

  _fetch({ url, method, body }) {
    return fetch(url, {
      method,
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  me() {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/users/me`,
      method: "GET",
    });
  }

  updateProfile(data) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/users/me`,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateProfileAvatar(data) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/users/me/avatar`,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/cards/${id}`,
      method: "DELETE",
    });
  }

  submitCard(data) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/cards`,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getAllCards() {
    return this._fetch({
      url: `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`,
      method: "GET",
    });
  }

  likeCard(id, isLiked) {
    return this._fetch({
      url: `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      method: isLiked ? "DELETE" : "PUT",
    });
  }
}

export const api = new Api({
  cohortId,
  authorization,
});
