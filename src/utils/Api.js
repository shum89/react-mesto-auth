import  {urlPath, baseUrl, headers} from './constants';

/**
 *  Api for mesto
 *  @param {string} baseUrl
 *  @param {object} headers
 */
 class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
    }

    /**
     * Basic method for fetching data
     * @param path {string} - path for an api request
     * @param params {Object} - object with headers, methods and body
     * @returns {Promise<Response>} - returns promise if request is successful
     */
    _fetchData(path, params) {
        return fetch(`${this._url}${path}`, params).then(res => {
            if (res.ok) {
                return res.json();
            }
           return Promise.reject(new Error(`Ошибка: ${res.status}`))
        })
    }

    /**
     * Get User info
     * @returns {Promise<Response>} - object with user info
     */
    getUserInfo() {
        return this._fetchData(urlPath.userInfo, {headers: this._headers})
    }

    /**
     * update user info
     * @param {object} data
     * @return {Promise<Response>}
     */
    updateUserInfo(data) {
        return this._fetchData(urlPath.userInfo, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }

    /**
     * update user avatar
     * @param {object} data
     * @return {Promise<Response>}
     */
    updateUserAvatar(data) {
        return this._fetchData(`${urlPath.userInfo}${urlPath.avatar}`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }

    /**
     * Gets initial cards
     * @returns {Promise<Response>} - array of objects with cards info
     */
    getInitialCards() {
        return this._fetchData(urlPath.cards, {headers: this._headers})
    }

    /**
     * post new card
     * @param {object} data
     * @return {Promise<Response>}
     */
    postNewCard(data) {
        return this._fetchData(urlPath.cards, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    /**
     * delete card
     * @param id {string} card id
     * @return {Promise<Response>}
     */
    deleteCard(id) {
        return this._fetchData(`${urlPath.cards}${id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    /**
     * set like
     * @param id {string} id card id
     * @param  isLiked {boolean} isLiked
     * @return {Promise<Response>}
     */
    setLike(id, isLiked) {
        let method;
        if (isLiked) {
            method = 'DELETE';
        } else {
            method = 'PUT';
        }
        return this._fetchData(`${urlPath.cards}${urlPath.likes}${id}`, {
            method: method,
            headers: this._headers,
        });
    }
}


export const api = new Api({baseUrl, headers});
