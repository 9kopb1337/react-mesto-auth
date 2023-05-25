import React from "react";
import logo from "../images/icons/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="лого" />
    </header>
  );
}
