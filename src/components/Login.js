import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [userLoggin, setUserLoggin] = useState({
    email: "",
    password: "",
  });

  const handleChangeUserLoggin = (e) => {
    const { name, value } = e.target;
    setUserLoggin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUserLoggin = (e) => {
    e.preventDefault();
    const { email, password } = userLoggin;
    onLogin(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmitUserLoggin}>
        <input
          name="email"
          className="login__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleChangeUserLoggin}
          value={userLoggin.email}
          autoComplete="on"
        />
        <input
          name="password"
          className="login__input"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="12"
          required
          onChange={handleChangeUserLoggin}
          value={userLoggin.password}
          autoComplete="on"
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
