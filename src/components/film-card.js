import AbstractComponent from './abstract-component.js';
import {trimText} from '../utils/common.js';

const createFilmCardTemplate = (filmCard) => {
  const {posterURL, name, rating, year, duration, genre, description, commentsCount, isWatchlist, isWatched, isFavorite} = filmCard;

  const activeClass = 'film-card__controls-item--active';
  const watchlistControlActiveClass = isWatchlist ? activeClass : '';
  const watchedControlActiveClass = isWatched ? activeClass : '';
  const favoriteControlActiveClass = isFavorite ? activeClass : '';

  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="${posterURL}" alt="" class="film-card__poster">
          <p class="film-card__description">${trimText(description, 140)}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistControlActiveClass}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedControlActiveClass}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteControlActiveClass}" type="button">Mark as favorite</button>
          </div>
    </article> `
};

export default class FilmCardComponent extends AbstractComponent {

  constructor(filmCard) {
    super();

    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  setCommentClickHandler(handler) {
    this.getElement().querySelector('.film-card__comments')
      .addEventListener('click', handler);
  }

}
