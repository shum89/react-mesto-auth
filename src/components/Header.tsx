import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import logo from '../images/Vector.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Burger from './Burger';
import {HeaderProps} from "../interfaces/props/HeaderProps";
import {CurrentUserInterface} from "../interfaces/CurrentUserInterface";

/**
 * @return {JSX.Element}
 */
function Header({
  loggedIn, onLogout, isMobileMenuOpen, onMobileMenu,
}:HeaderProps) {
  const currentUser:CurrentUserInterface = React.useContext(CurrentUserContext);
  const location = useLocation();
  const path = `${location.pathname === '/sign-up' ? 'sign-in' : 'sign-up'}`;
  const title = `${location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}`;
  const nodeRef = React.useRef(null);
  return (
    <header className="header">
      <CSSTransition
        nodeRef={nodeRef}
        in={isMobileMenuOpen}
        unmountOnExit
        timeout={500}
        classNames="header__login-container_mobile"
      >
        <div ref={nodeRef} className="header__login-container header__login-container_mobile">
          <p className="header__email">{currentUser.login.email}</p>
          <button
            className="header__button-auth"
            type="button"
            onClick={onLogout}
          >
            Выйти
          </button>
        </div>
      </CSSTransition>
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип" />
        {loggedIn
          ? (
            <>
              <div className="header__login-container header__login-container_desktop">
                <p className="header__email">{currentUser.login.email}</p>
                <button className="header__button-auth" type="button" onClick={onLogout}>Выйти</button>
              </div>
              <Burger isMobileMenuOpened={isMobileMenuOpen} onMobileMenu={onMobileMenu} />
            </>
          )
          : <NavLink to={path} className="nav-link nav-link_type_header">{title}</NavLink>}
      </div>
    </header>
  );
}

export default Header;
