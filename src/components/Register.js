import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

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
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          name="email"
          className="auth__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleUserEmailChange}
          value={userEmail}
          autoComplete="on"
        />
        <input
          name="password"
          className="auth__input"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="12"
          required
          onChange={handleUserPasswordChange}
          value={userPassword}
          autoComplete="on"
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__text">
        Уже зарегистрированы?
        <Link className="auth__link" to="./sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}
