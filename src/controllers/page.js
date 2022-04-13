import {generateFilmCards} from '../mock/film-card.js';

import {SortType, ExtraFilmsTitle, MessagesNoFilms} from '../const.js';
import NoFilms from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsListInnerContainerComponent from '../components/films-list-inner-container.js';
import FilmsListExtraComponent from '../components/films-list-extra.js';

import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmPopupComponent from '../components/film-popup.js';
import SortComponent from '../components/sort.js';
import {render, remove, RenderPosition} from '../utils/render.js';


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRA_FILMS_COUNT = 2;


const renderFilmCard = (cardListElement, card) => {
  const cardComponent = new FilmCardComponent(card);
  const cardPopupComponent = new FilmPopupComponent(card);
  const body = document.body;

  const appendPopup = () => {
      body.appendChild(cardPopupComponent.getElement());
    };
  const removePopup = () => {
      body.removeChild(cardPopupComponent.getElement());
    };
  const onEscKeyDown = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        body.classList.remove('hide-overlow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

  cardComponent.setCommentClickHandler(() => {
      appendPopup();
      body.classList.add('hide-overlow');
      document.addEventListener('keydown', onEscKeyDown);
    });
  cardPopupComponent.setCloseButtonClickHandler(() => {
      removePopup();
      body.classList.remove('hide-overlow');
      document.removeEventListener('keydown', onEscKeyDown);
    });

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmCards = (cardListElement, cards) => {
  cards.forEach((card) => {
    renderFilmCard(cardListElement, card);
  });
};



export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmsContainer = new FilmsContainerComponent();
    this._filmsList = new FilmsListComponent();
    this._filmsListInnerContainer = new FilmsListInnerContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._currentSortType = SortType.DEFAULT;
    this._cards = [];
    this._sourcedCards = [];
    this._renderedCardsCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortingListComponent = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(cards) {
    this._cards = cards.slice();
    this._sourcedCards = cards.slice();

    this._renderFilmBoard();
  }

  _renderFilmBoard() {

    if(this._cards.length === 0) {
      render(this._container, new NoFilms(MessagesNoFilms.DATABASE).getElement(), RenderPosition.BEFOREEND);

      return;
    }


    this._renderSortingList();

    render(this._container, this._filmsContainer.getElement(), RenderPosition.BEFOREEND);
    render(this._filmsContainer.getElement(), this._filmsList.getElement(), RenderPosition.BEFOREEND);
    render(this._filmsList.getElement(), this._filmsListInnerContainer.getElement(), RenderPosition.BEFOREEND);

    this._renderFilmsList();
    this._renderExtraFilms(ExtraFilmsTitle.TOP_RATED, generateFilmCards(EXTRA_FILMS_COUNT));
    this._renderExtraFilms(ExtraFilmsTitle.MOST_COMMENTED, generateFilmCards(EXTRA_FILMS_COUNT));

  }

  _renderFilmsList() {
    renderFilmCards(this._filmsListInnerContainer.getElement(), this._cards.slice(0, Math.min(this._cards.length, SHOWING_FILMS_COUNT_ON_START)));

    if (this._cards.length > SHOWING_FILMS_COUNT_ON_START) {
      this._renderLoadMoreButton();
    }
  }

  _renderExtraFilms(title, cards) {

    const filmsListExtraComponent = new FilmsListExtraComponent(title);
    const extraFilmsListInnerContainer = new FilmsListInnerContainerComponent();

    render(this._filmsContainer.getElement(), filmsListExtraComponent.getElement(), RenderPosition.BEFOREEND);
    render(filmsListExtraComponent.getElement(), extraFilmsListInnerContainer.getElement(), RenderPosition.BEFOREEND);
    renderFilmCards(extraFilmsListInnerContainer.getElement(), cards);
  }

  _renderLoadMoreButton() {
    render(this._filmsList.getElement(), this._showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();

      const prevFilmsCount = this._renderedCardsCount;
      this._renderedCardsCount = this._renderedCardsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      this._cards.slice(prevFilmsCount, this._renderedCardsCount)
        .forEach((card) => renderFilmCard(this._filmsListInnerContainer.getElement(), card));

      if(this._renderedCardsCount >= this._cards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderSortingList() {
    if(this._sortingListComponent !== null) {
      remove(this._sortingListComponent);
      this._sortingListComponent = null;
    }

    this._sortingListComponent = new SortComponent(this._currentSortType);

    render(this._filmsContainer.getElement(), this._sortingListComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._sortingListComponent.setSortTypeChangeHandler(this._handleSortTypeChange); ////
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _sortFilms(sortType) {
    switch(sortType) {
      case SortType.DATE:
        this._cards.sort((a,b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        this._cards.sort((a, b) => b.rating - a.rating);
        break;
      default:
        this._cards = this._sourcedCards.slice();
    }

    this._currentSortType = sortType;
    this._renderSortingList();
  }

  _clearFilmsList() {
    this._filmsListInnerContainer.getElement().innerHTML = '';

    this._renderedCardsCount = SHOWING_FILMS_COUNT_ON_START;

    remove(this._showMoreButtonComponent);
  }
}

