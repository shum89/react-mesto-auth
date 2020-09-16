import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

/**
 * main component
 * @param {object} props
 * @param {function} props.onEditAvatar - handles click on avatar and opens edit avatar popup
 * @param {function} props.onEditProfile - handles click on profile button and opens edit profile popup
 * @param {function} props.onAddPlace - handles click on addPlace button and opens add place popup
 * @param {function} props.cardClick - handles click on card image and opens image popup
 */
function Main ({cards, cardClick, onAddPlace, onEditProfile, onEditAvatar, onCardLike, onDeletePopup}) {
    /**
     * current user context
     * @type {object}
     */
    const currentUser = React.useContext(CurrentUserContext);
    const {name, about, avatar} = currentUser;

        return (
            <main className="content">

                <section className="profile">
                    <div className="profile__wrap">
                        <div className="profile__avatar"  onClick={onEditAvatar}>
                            <img className="profile__avatar-image" alt="Аватар" src={avatar}/>
                        </div>
                        <div className="profile__info">
                            <div className="profile__text-container">
                                <h2 className="profile__title">{name}</h2>
                                <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
                            </div>
                            <p className="profile__subtitle">{about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" onClick={onAddPlace}/>
                </section>

                    <ul className="cards">
                    {cards.map((card) => <Card card={card} key={card._id} onCardClick={cardClick} onCardLike={onCardLike} onCardDelete={onDeletePopup}/>)}
                </ul>

            </main>
        )

}

export default Main