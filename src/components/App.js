import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api.js";
import "../pages/index.css";
import InfoTooltip from "./InfoTooltip.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { auth } from "../utils/auth.js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

//Доделать APP

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isCardOpen, setCardOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [card, setCard] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const [isLogged, setIsLogged] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCard(card);
      })
      .catch((err) => console.log(err));
  }, []);

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

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setIsLogged(true);
          navigate("/");
        })
        .catch(console.error);
    }
  }, [navigate]);

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLogged(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={isLogged}
          userEmail={userEmail}
          onSignOut={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLogged}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  card={card}
                  email={userEmail}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="*"
            element={
              isLogged ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
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
        <InfoTooltip onClickClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
