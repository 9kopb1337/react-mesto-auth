class Auth {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    } 

    _checkRes(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}.`);
      }

    register({password, email}) {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password, email})
        })
        .then((res) => this._checkRes(res));
      };

    authorize({password, email}) {
        return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password, email})
        })
        .then((res) => this._checkRes(res));
      };
      
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((res) => this._checkRes(res));
      }
}

export const auth = new Auth('https://auth.nomoreparties.co/');
