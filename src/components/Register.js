import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [userReg, setUserReg] = useState({
    email: "",
    password: "",
  });

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserReg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUserData = (e) => {
    e.preventDefault();
    const { email, password } = userReg;
    onRegister(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmitUserData}>
        <input
          name="email"
          className="login__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleChangeUserData}
          value={userReg.email}
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
          onChange={handleChangeUserData}
          value={userReg.password}
          autoComplete="on"
        />
        <button
          className="login__button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">
        <Link className="login__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </p>
    </div>
  );
}
