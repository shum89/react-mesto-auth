/**
 * paths for requests
 * @type {{userInfo: string, cards: string, avatar: string, likes: string}}
 */
export const urlPath = {
  userInfo: 'users/me/',
  cards: 'cards/',
  avatar: 'avatar',
  likes: 'likes/',
};
/**
 * url for mesto api requests
 * @type {string}
 */
export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-12/';

/**
 *  headers with authorisation token
 * @type {{authorization: string, "Content-Type": string}}
 */
export const headers = {
  authorization: 'd2854785-f942-4a21-9d80-03fbc6fb281b',
  'Content-Type': 'application/json',
};

/**
 * base url for giphy api
 * @type {string}
 */
export const giphyUrl = 'https://api.giphy.com/v1/gifs/random?tag=dogs&rating=g&api_key=xZXsHMfcYYAZ8rEhdSEGmIGqudaSbeg7';
