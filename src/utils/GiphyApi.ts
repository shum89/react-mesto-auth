import { giphyUrl } from './constants';

/**
 * class for giphy api
 * @param {string} baseUrl
 */
class GiphyApi {
  private _url: string;
  constructor(baseUrl :string) {
    this._url = baseUrl;
  }

  /**
     * fetch random gif
     * @return {Promise<Response>}
     */
  fetchData() {
    return fetch(`${this._url}`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
}

export const giphy = new GiphyApi(
  giphyUrl,
);
