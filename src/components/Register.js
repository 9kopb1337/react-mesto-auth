import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handleUserPasswordChange(e) {
    setUserPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister(userEmail, userPassword);
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          name="email"
          className="login__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleUserEmailChange}
          value={userEmail}
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
          onChange={handleUserPasswordChange}
          value={userPassword}
          autoComplete="on"
        />
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text"><Link className="login__link" to="./sign-in">Уже зарегистрированы? Войти</Link></p>
    </div>
  );
}
