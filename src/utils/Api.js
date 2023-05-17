import { authorization, cohortId } from "./constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch({ url, method, body }) {
    return fetch(`${this._baseUrl}/${url}`, {
      method,
      headers: this._headers,
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
      url: `/users/me`,
      method: "GET",
    });
  }

  updateProfile(data) {
    return this._fetch({
      url: `/users/me`,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateProfileAvatar(data) {
    return this._fetch({
      url: `/users/me/avatar`,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._fetch({
      url: `/cards/${id}`,
      method: "DELETE",
    });
  }

  submitCard(data) {
    return this._fetch({
      url: `/cards`,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getAllCards() {
    return this._fetch({
      url: `/cards`,
      method: "GET",
    });
  }

  likeCard(id, isLiked) {
    return this._fetch({
      url: `/cards/${id}/likes`,
      method: isLiked ? "DELETE" : "PUT",
    });
  }
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/`,
  headers: {
    authorization,
    "Content-Type": "application/json",
  },
  cohortId,
});
