/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from '../ImagePopup/ImagePopup';
import React, { useState, useEffect } from "react";
import { Route, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Api from '../utils/Api';
import { TranslationContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import Auth from '../utils/Auth';
import InformMessagePopup from '../InformMessagePopup/InformMessagePopup';
import Authorization from '../Authorization/Authorization';

import { NODE_ENV } from '../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isDeleteCard, setIsDeleteCard] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isUpdateCards, setIsUpdateCards] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOpenPopupMessage, setIsOpenPopupMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const history = useHistory();
  const [isRegister, setIsRegister] = useState(false);
  const [isValidFormRegister, setIsValidFormRegister] = useState(true);


  const createdHeaders = () => {
    let basicHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    if (NODE_ENV !== 'production') {
      return basicHeaders = {
        ...basicHeaders,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      };
    } else {
      return basicHeaders;
    }
  }

  const api = new Api({
    headers: createdHeaders(),
    NODE_ENV: NODE_ENV,
  });

  const auth = new Auth({
    headers: createdHeaders(),
    NODE_ENV: NODE_ENV,
  });

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isConfirmDeletePopupOpen ||
    isOpenPopupMessage

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt || NODE_ENV === 'production') {
      auth
        .checkToken()
        .then(({ user }) => {
          setIsEmail(user.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          err.then(({ message }) => {
            console.log(message)
          })
        })
    }
  }

  const handleExit = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      history.push('/sign-in ');
    } else {
      auth
        .deleteToken()
        .then(() => {
          setIsLoggedIn(false);
          history.push('/sign-in');
        })
        .catch((err) => {
          err.then(({ message }) => {
            console.log(message);
          })
        })
    }
  }

  useEffect(() => {
    handleTokenCheck();
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([{ user }, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          err.then(({ message }) => {
            alert(message)
          })
        })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          err.then(({ message }) => {
            alert(message)
          })
        })
    }
  }, [isUpdateCards])

  useEffect(() => {
    function closeByEscape(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleOverlay(event) {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__image-cross')) {
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", handleOverlay);
    return () => document.removeEventListener("mousedown", handleOverlay);
  }, [isOpen]);

  const handleEditAvatarClick = () => {
    setIsButtonDisabled(false);
    setIsEditAvatarPopupOpen(true);
    setIsValidFormRegister(false);
  };

  const handleEditProfileClick = () => {
    setIsButtonDisabled(false)
    setIsEditProfilePopupOpen(true);
    setIsValidFormRegister(false);
  };

  const handleAddPlaceClick = () => {
    setIsButtonDisabled(false)
    setIsAddPlacePopupOpen(true);
    setIsValidFormRegister(false);
  };

  const handleDeleteCardClick = () => {
    setIsButtonDisabled(false)
    setIsConfirmDeletePopupOpen(true);
    setIsValidFormRegister(false);
  };

  const updateDeleteCard = (card) => {
    setIsButtonDisabled(false)
    setIsDeleteCard(card);
    handleDeleteCardClick();
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setIsOpenPopupMessage(false)
    setIsValidFormRegister(true);
  };

  const handleUpdateUser = (name, about) => {
    setIsDownload(true);
    api
      .editUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message);
        });
      })
      .finally(() => setIsDownload(false));
  };

  const handleEditAvatar = ({ avatar }) => {
    setIsDownload(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        err.then(({ message }) => {
          alert(message);
        });
      })
      .finally(() => setIsDownload(false));
  };

  function handleCardLike(card) {
    const isLiked = card.likes
      .some(like => like === currentUser._id);
    const changeLikeCardStatus =
      !isLiked
        ? api.addLike(card._id)
        : api.deleteLike(card._id);
    changeLikeCardStatus
      .then((newCard) => {
        setCards((state) => state
          .map((c) =>
            c._id === card._id
              ? newCard
              : c
          ));
      })
      .catch((err) => {
        err.then(({ message }) => {
          alert(message);
        });
      });
  };

  function handleCardDelete(card) {
    setIsDownload(true);
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setIsUpdateCards(!isUpdateCards);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message);
        });
      })
      .finally(() => setIsDownload(false));
  }

  const handleAddPlaceSubmit = (name, link) => {
    setIsDownload(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsUpdateCards(!isUpdateCards);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message);
        });
      })
      .finally(() => setIsDownload(false));
  };

  const onSubmitRegister = (password, email) => {
    setIsDownload(true);
    auth
      .register(password, email)
      .then((data) => {
        setIsButtonDisabled(false);
        setIsOpenPopupMessage(true);
        setIsEmail(data.email);
        history.push('/sign-in');
        setIsRegister(true);
      })
      .catch((err) => {
        err.then(({ message }) => {
          setIsButtonDisabled(false)
          setIsOpenPopupMessage(true);
          setIsRegister(false);
          alert(message);
        })
      })
      .finally(() => setIsDownload(false))
  }

  const onSubmitLogin = (password, email) => {
    setIsDownload(true);
    auth
      .authorize(password, email)
      .then((data) => {
        const { token } = data;
        if (token) {
          localStorage.setItem("jwt", token);
        };
        setIsButtonDisabled(false);
        history.push('/');
        setIsLoggedIn(true);
      })
      .catch((err) => {
        err.then(({ message }) => {
          setIsButtonDisabled(false);
          setIsOpenPopupMessage(true);
          setIsLoggedIn(false);
          setIsRegister(false);
          alert(message);
        });
      })
      .finally(() => setIsDownload(false));
  }

  return (
    <TranslationContext.Provider value={currentUser}>

      <Header
        email={isEmail}
        isLoggedIn={isLoggedIn}
        handleExit={handleExit}
      />

      <Route exact path="/">

        <ProtectedRoute
          exact
          path="/"
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={updateDeleteCard}
          isLoggedIn={isLoggedIn}
        />

      </Route>

      <Route path="/sign-up">

        <Authorization
          title='Регистрация'
          name='register'
          buttonText={`${!isDownload
            ? 'Зарегистрироваться'
            : 'Регистрирую...'}`}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
          onSubmit={onSubmitRegister}
          isEmail={isEmail}
          setIsEmail={setIsEmail}
          isValidFormRegister={isValidFormRegister}
        />

      </Route>

      <Route path="/sign-in">

        <Authorization
          title='Вход'
          name='login'
          buttonText={`${!isDownload
            ? 'Войти'
            : 'Проверяю...'}`}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
          isEmail={isEmail}
          setIsEmail={setIsEmail}
          onSubmit={onSubmitLogin}
          isValidFormRegister={isValidFormRegister}
        />

      </Route>

      {isLoggedIn && <Footer />}

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <EditAvatarPopup
        onUpdateAvatar={handleEditAvatar}
        isOpen={isEditAvatarPopupOpen}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        card={isDeleteCard}
        isConfirm={handleCardDelete}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <ImagePopup card={selectedCard} />

      <InformMessagePopup
        isOpenPopupMessage={isOpenPopupMessage}
        isRegister={isRegister}
        isLoggedIn={isLoggedIn}
      />

    </TranslationContext.Provider >
  );
}

export default App;
