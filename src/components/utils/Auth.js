class Auth {
  constructor({ headers, NODE_ENV }) {
    this._headers = headers;
    this._credentials = 'include';
    this._NODE_ENV = NODE_ENV;
  }

  _baseUrl = () => {
    let url = '';
    if (this._NODE_ENV === 'production') {
      url = 'https://api.server-mesto.ru';
    } else {
      url = 'http://localhost:3000';
    };
    return url;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(res.json())
  }

  register(password, email) {
    return fetch(`${this._baseUrl()}/signup`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
  };

  authorize(password, email) {
    return fetch(`${this._baseUrl()}/signin`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
  };

  checkToken() {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then(this._checkResponse);
  };

  deleteToken() {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then(this._checkResponse);
  };
}

export default Auth;
