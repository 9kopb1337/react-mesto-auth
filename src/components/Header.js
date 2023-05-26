import React from "react";
import logo from "../images/icons/logo.svg";
import { Link, Route } from "react-router-dom";

export default function Header({ userEmail, loggedIn, onSignOut }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="лого" />
      {!loggedIn ? (
        <nav>
          <Route path="/sign-up">
            <Link className="header__link">Регистрация</Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__link">Вход</Link>
          </Route>
        </nav>
      ) : (
        <div className="header__info">
          <p className="header__email">{userEmail}</p>
          <button
            className="header__button"
            type="button"
            onClick={onSignOut}
          ></button>
        </div>
      )}
    </header>
  );
}
