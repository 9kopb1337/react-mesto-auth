import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api.js";
import * as auth from "../utils/auth.js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../pages/index.css";

//Доделать APP

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isCardOpen, setCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [card, setCard] = useState([]);

  const [email, setEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [succes, setSucces] = useState(false);

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setCardOpen(false);
    setInfoTooltip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setCardOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCard((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(value) {
    api
      .patchProfileInfo(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(value) {
    api
      .patchAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(card) {
    api
      .postNewCard(card)
      .then((newCard) => {
        setCard((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      console.log("jwt => ", jwt);
      auth
        .checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setIsLogged(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setSucces(true);
        setInfoTooltip(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setSucces(false);
        setInfoTooltip(true);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsLogged(true);
          localStorage.setItem("jwt", res.token);
          navigate("/");
          setEmail(email);
        }
      })
      .catch((err) => {
        setSucces(false);
        setInfoTooltip(true);
        console.log(err);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLogged(false);
  }

  useEffect(() => {
    if (isLogged) {
      Promise.all([api.getProfileInfo(), api.getCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCard(card);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogged={isLogged} email={email} handleLogOut={handleLogOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLogged={isLogged}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                card={card}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClickClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          name="place"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClickClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClickClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardOpen}
          onClickClose={closeAllPopups}
        />
        <InfoTooltip
          onClickClose={closeAllPopups}
          succes={succes}
          isOpen={infoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
