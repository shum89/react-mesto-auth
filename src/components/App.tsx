import React, { useCallback } from 'react';
import {
  withRouter, Route, Switch, useHistory,
} from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Spinner from './Spinner';
import Page404 from './Page404';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import {CurrentUserInterface} from "../interfaces/CurrentUserInterface";
import {CardInterface} from "../interfaces/CardInterface";
import {UserUpdate} from "../interfaces/props/EditProfileProps";
import {EditAvatar} from "../interfaces/props/EditAvatarProps";
import {AddPlaceUpdate} from "../interfaces/props/AddPlaceProps";
import {InputValuesInterface} from "../interfaces/FormInterface";

/**
 * Create an app from the components
 * @returns {JSX.Element} - HTML-markup
 */
function App() {
  const history = useHistory();
  /**
     * logged in state
     */
  const [loggedIn, setLoggedIn] = React.useState(false);
  /**
     * tooltip state
      */
  const [isTooltipOpen, setTooltipPopup] = React.useState(false);
  /**
     * tooltip message state
      */
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  /**
     * open or closed mobile menu
     */
  const [isMobileMenuOpen, setMobileMenu] = React.useState(false);
  /**
     * Current User State
     *
     */
  const [currentUser, setUserInfo] = React.useState<CurrentUserInterface>({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    login:{
      email:'',
      _id:'',
    },
  });
    /**
     * Cards state
     */
  const [cards, setCards] = React.useState<Array<CardInterface>>([]);

  /**
State for waiting while loading data
 */
  const [isSubmitting, setSubmiting] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  /**
     * Popup with form states
     */
  const [isEditProfileOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopup] = React.useState(false);

  /**
     * Popup with image state
     */
  const [selectedCard, setSelectedCardPopup] = React.useState<CardInterface | null>(null);
  const [selectedDeleteCard, setSelectedCard] = React.useState<CardInterface | null>(null);

  /**
     * closes all popups
     */
  const closeAllPopups = () => {
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setSelectedCardPopup(null);
    setDeletePopup(false);
    setTooltipPopup(false);
  };

  /**
     * handler for Esc key
     */
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }, []);

  /**
     * array of popup state
     * @type {[boolean|object]}
     */
  const popupStates = [
    isEditProfileOpen, isAddPlacePopupOpen,
    isEditAvatarPopupOpen, isDeletePopupOpen,
    selectedCard, isTooltipOpen];

  /**
     * mounts/unmounts eventListener for Escape key
     */
  React.useEffect(() => {
    if (popupStates.some((el) => el === true || (typeof el === 'object'))) {
      window.addEventListener('keyup', handleEsc);
    } else {
      window.removeEventListener('keyup', handleEsc);
    }
  }, [handleEsc, popupStates]);

  /**
     *  handles user click on a card
     * @param {Object} card - card object that corresponds to a card that user clicked on
     */
  const handleCardClick = (card:CardInterface) => {
    setSelectedCardPopup(card);
  };
    /**
     * handles user click on avatar
     */
  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };
    /**
     * handles user click on profile edit button
     */
  const handleEditProfileClick = () => {
    setEditProfilePopup(true);

  };

  /**
     * handles user click on add place button
     */
  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const handleDeletePopupClick = (card:CardInterface) => {
    setDeletePopup(true);
    setSelectedCard(card);
  };

  /**
     * open or close mobile menu
     */
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenuOpen);
  };

  /**
     * update user info
     * @param data {object}
     */
  const handleUpdateUser = (data:UserUpdate) => {
    setSubmiting(true);
    api.updateUserInfo(data).then((result) => {
      setUserInfo((prevState) => {
        const newUser = { ...prevState, ...result };
        return newUser;
      });
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      closeAllPopups();
      setSubmiting(false);
    });
  };

  /**
     * update user avatar
     * @param data {object}
     */
  const handleUpdateAvatar = (data:EditAvatar) => {
    setSubmiting(true);
    api.updateUserAvatar(data).then((result) => {
      setUserInfo((prevState) => {
        const newUser = { ...prevState, ...result };
        return newUser;
      });
    }).catch((err) => {
      console.log(err);
      setTooltipPopup(true);
      setTooltipMessage('Что-то пошло не так!\n'
          + 'Попробуйте ещё раз.');
    }).finally(() => {
      setEditAvatarPopup(false);
      setSubmiting(false);
    });
  };

  /**
     * handle card likes
     * @param card {object}
     */
  const handleCardLike = (card:CardInterface) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.setLike(card._id, isLiked).then((newCard) => {
        const newCards = cards.map((c) => (c?._id === card._id ? newCard : c));
        setCards(newCards);

    }).catch((err) => {
      console.log(err);
    })
  }
  /**
     * handle card delete
     * @param card {object}
     */

  const handleDeleteCard = (card:CardInterface) => {
    setSubmiting(true);
    api.deleteCard(card!._id).then(() => {
      if (cards !== null){
        const newCards = cards.filter((i) => i?._id !== card!._id);
        setCards(newCards);
      }
    }).catch((err) => {
      setTooltipPopup(true);
      setTooltipMessage('Что-то пошло не так!\n'
          + 'Попробуйте ещё раз.');
      console.log(err);
    }).finally(() => {
      setSubmiting(false);
      setDeletePopup(false);
    });
  };

  /**
     * handle add card
     * @param data {object}
     */
  const handleAddPlaceSubmit = (data:AddPlaceUpdate) => {
    setSubmiting(true);
    api.postNewCard(data).then((newCard:CardInterface) => {
      setCards([newCard, ...cards]);
    }).catch((err) => {
      console.log(err);
      setTooltipPopup(true);
      setTooltipMessage('Что-то пошло не так!\n'
          + 'Попробуйте ещё раз.');
    }).finally(() => {
      setSubmiting(false);
      setAddPlacePopup(false);
    });
  };
  const handleRegister = ({ email, password }:InputValuesInterface) => {
    setSubmiting(true);
    auth.register(email, password).then((res) => {
      setTooltipPopup(true);
      if (res) {
        history.push('/sign-in');
        setTooltipMessage('Вы успешно зарегистрировались!');
      } else {
        setTooltipMessage('Что-то пошло не так!\n'
                    + 'Попробуйте ещё раз.');
      }
    }).finally(() => setSubmiting(false));
  };
  /**
     * handle Login
     * @param email {string}
     * @param password  {string}
     */
  const handleLogin = ({ email, password }:InputValuesInterface) => {
    setSubmiting(true);
    auth.authorize(email, password).then((data) => {
      if (data) {
        history.push('/');
        setLoggedIn(true);
      } else {
        setTooltipPopup(true);
        setTooltipMessage('Что-то пошло не так!\n'
                    + 'Попробуйте ещё раз.');
      }
    }).finally(() => setSubmiting(false));
  };
  /**
     * handle logout and remove token
     */
  const handleLogout = () => {
    setLoggedIn(false);
    setMobileMenu(false);
    localStorage.removeItem('token');
  };

  /**
     * Set current user values and initial cards
     */
  React.useEffect(() => {
    /**
         * handle token check
         */
    const handleTokenCheck = () => {
      const token = localStorage.getItem('token');
      if (token) {
        auth.checkToken(token).then((data) => {
          setUserInfo((prevState) => {
            const newUser = { ...prevState, login: { ...data } };
            return newUser;
          });
          setLoggedIn(true);
          history.push('/');
        });
      }
    };
    handleTokenCheck();

    /**
         * if user loggedIn load cards and user info
         */
    if (loggedIn) {
      setLoading(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, initialCards]) => {
        setUserInfo((prevState) => {
          const newUser = { ...prevState, ...userData };
          return newUser;
        });
        setCards(initialCards);
      }).catch((err) => {
        setTooltipPopup(true);
        setTooltipMessage('Что-то пошло не так!\n'
            + 'Попробуйте ещё раз.');
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenu={handleMobileMenu}
        />
        <Switch>
          {!loggedIn && (
            <Route path="/sign-in">
              <Login isSubmitting={isSubmitting} onLogin={handleLogin} />
            </Route>
          ) }
          {!loggedIn && (
            <Route path="/sign-up">
              <Register isSubmitting={isSubmitting} onRegister={handleRegister} />
            </Route>
          ) }
          <ProtectedRoute
            path="/"
            component={() => (isLoading ? <Spinner />
              :
                (<Main
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  cardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onDeletePopup={handleDeletePopupClick}
                />
              ))}
            loggedIn={loggedIn}
          />

          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        <Footer />
        { (
          <InfoTooltip
            name="info-tooltip"
            message={tooltipMessage}
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
          />
        )}
        {loggedIn && (
          <>
            <ConfirmDeletePopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onDeleteSubmit={handleDeleteCard}
              card={selectedDeleteCard}
              isSubmitting={isSubmitting}
            />

            <EditProfilePopup
              isOpen={isEditProfileOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isSubmitting={isSubmitting}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isSubmitting={isSubmitting}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isSubmitting={isSubmitting}
            />

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
            />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
