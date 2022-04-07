import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmPopupComponent from '../components/film-popup.js';
import SortComponent from '../components/sort.js';
import {render, remove, RenderPosition} from '../utils/render.js';


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


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
    this.container = container;

    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(cards, isExtraIndex) {
    const renderLoadMoreButton = () => {
      if(showingFilmsCount >= cards.length) {
        return;
      }

      render(filmsList, this._showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler((evt) => {
        evt.preventDefault();

        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        cards.slice(prevFilmsCount, showingFilmsCount)
          .forEach((card) => renderFilmCard(filmsListElement, card));

        if(showingFilmsCount >= cards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const filmsContainerElement = document.querySelector('.main').querySelector('.films');
    const filmsList = filmsContainerElement.querySelector('.films-list');
    const filmsListElement = filmsContainerElement.querySelector('.films-list__container');
    const filmsExtraListElements = filmsContainerElement.querySelectorAll('.films-list--extra');

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    if( typeof isExtraIndex === 'number') {
        renderFilmCards(filmsExtraListElements[isExtraIndex].querySelector('.films-list__container'), cards);
    } else {
      renderFilmCards(filmsListElement, cards.slice(0, SHOWING_FILMS_COUNT_ON_START));
      renderLoadMoreButton();
    }
  }
}
