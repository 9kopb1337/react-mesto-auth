import React from "react";
import logo from "../images/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ userEmail, isLogged, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="logo" src={logo} alt="лого" />
      {location.pathname === "/sign-up" && (
        <Link className="header__link">Регистрация</Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link className="header__link">Вход</Link>
      )}
      {isLogged && (
        <nav className="header__info">
          <p className="header__email">{userEmail}</p>
          <button className="header__button" type="button" onClick={onSignOut}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
}
