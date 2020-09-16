import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


/**
 * card component
 * @param onCardClick {function}  handles click on card and opens modal window with card image
 * @param onCardLike {function}  handles click on like, toggles like and setting new like count
 * @param onCardDelete  {function}  handles card delete
 * @param card  {Object}  card object
 * @returns {JSX.Element} Component Template
 */
function Card ({onCardClick, onCardLike, onCardDelete, card}) {
    /**
     * destructured card prop
     */
    const {name = '', link = '', likes = []} = card;

    /**
     * Current user context
     * @type {object}
     */

    const currentUser = React.useContext(CurrentUserContext);
    /**
     * checks if card owner id corresponds with user id
     * @type {boolean}
     */
    const isOwn = card.owner._id === currentUser._id;

    /**
     * state for an like counter animation
     */
    const [counterAnimation, setCounterAnimation] = React.useState(false);

    /**
     * class for a delete button
     * @type {string}
     */
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    /**
     * checks if user liked a card
     * @type {boolean}
     */
    const isLiked = likes.some((like) => like._id === currentUser._id);

    /**
     * card like button class
     * @type {string}
     */
    const cardLikeButtonClass = (`card__like ${isLiked ? 'card__like_active' : null}`);

    /**
     * card like counter class
     * @type {string}
     */
    const likeCounterClass = (`card__like-counter ${counterAnimation ? 'card__like-counter_animation' : null}`)

    /**
     * @method handleCardClick
     * @description handles click on a card
     */
    const handleCardClick = () => {
        onCardClick(card);
    };

    /**
     * @method handleLikeClick
     * @description handles click on like and sets and removes counter animation
     */
    const handleLikeClick = () => {
        setCounterAnimation(true);
        // setTimeout(() => {
        //     setCounterAnimation(false);
        // },500);
        onCardLike(card);
    };

    /**
     * @method handleDeleteCard
     * @description handles card delete
     */
    const handleDeleteCard = () => {
        onCardDelete(card);
    };

        return (
            <li className="card">
                <img
                    className="card__photo"
                    alt={name}
                    src={link}
                    onClick={handleCardClick}
                />
                <button className={cardDeleteButtonClassName} onClick={handleDeleteCard}/>
                <div className="card__info-container">
                    <h2 className="card__title">{name}</h2>
                    <div className="card__like-container">
                        <button className={cardLikeButtonClass} onClick={handleLikeClick} type="button"/>
                        <p className={likeCounterClass}>{likes.length}</p>
                    </div>
                </div>
            </li>
        )
}

export default Card