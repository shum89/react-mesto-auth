import React from "react";
import logo from "../images/Vector.svg";
import {NavLink, useLocation} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CSSTransition} from "react-transition-group";
import Burger from "./Burger";

/**
 * Header component
 * @return {JSX.Element}
 */
function Header({loggedIn, onLogout,isMobileMenuOpen, onMobileMenu}) {
        const currentUser = React.useContext(CurrentUserContext);
        const location = useLocation();
        const path = `${location.pathname === '/sign-up' ? 'sign-in' : 'sign-up'}`;
        const title = `${location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}`;
        return (
            <header className="header">
                    <CSSTransition
                     in={isMobileMenuOpen}
                     unmountOnExit timeout={500}
                     classNames={'header__login-container_mobile'}>
                <div className='header__login-container header__login-container_mobile'>
                            <p className='header__email'>{currentUser.login.email}</p>
                            <button className='header__button-auth'
                                    type={'button'}
                                    onClick={onLogout}>Выйти</button>
                    </div>
                    </CSSTransition>
                <div className="header__container">
                    <img className="header__logo" src={logo} alt="Логотип"/>
                        {loggedIn ?
                           <>
                              <div className='header__login-container header__login-container_desktop'>
                            <p className='header__email'>{currentUser.login.email}</p>
                            <button className='header__button-auth' type={'button'} onClick={onLogout}>Выйти</button>
                            </div>
                               <Burger isMobileMenuOpened={isMobileMenuOpen} onMobileMenu={onMobileMenu}/>
                            </>
                            :
                            <NavLink to={path} className='nav-link nav-link_type_header'>{title}</NavLink>
                        }
                </div>
                </header>
        )

}

export default Header;