import React from "react";
import logo from "../images/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ email, isLogged, handleLogOut }) {
  const location = useLocation();

  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const PathName = location.pathname === "/sign-in" ? "Регистрация" : "Войти";

  return (
    <header className="header">
      <img className="logo" src={logo} alt="лого" />
      {isLogged ? (
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button className="header__button" type="button" onClick={handleLogOut}>
            Выйти
          </button>
        </div>
      ) : (
        <Link className="header__link" to={path}>
          {PathName}
        </Link>
      )}
    </header>
  );
}