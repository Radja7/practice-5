import ProfileComponent from './components/profile.js';
import NavComponent from './components/nav.js';
import SortComponent from './components/sort.js';
import FilmsContainerComponent from './components/films-container.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmPopupComponent from './components/film-popup.js';
import {generateNav, generateNavAdditional} from './mock/nav';
import {generateFilmCards} from './mock/film-card';
import {render, RenderPosition} from './utils/render.js';

const FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EXTRA_FILMS_COUNT = 2;


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const nav = generateNav();
const navAdditional = generateNavAdditional();
const filmCards = generateFilmCards(FILMS_COUNT);

render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavComponent(nav, navAdditional).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);


const filmsContainerElement = siteMainElement.querySelector('.films');
const filmsList = filmsContainerElement.querySelector('.films-list');
const filmsListElement = filmsContainerElement.querySelector('.films-list__container');
const filmsExtraListElements = filmsContainerElement.querySelectorAll('.films-list--extra');

const renderFilmCard = (cardListElement, card) => {
  const cardComponent = new FilmCardComponent(card);
  const cardPopupComponent = new FilmPopupComponent(card);
  const body = document.body;

  const appendPopup = () => {
    cardListElement.appendChild(cardPopupComponent.getElement());
  };
  const removePopup = () => {
    cardListElement.removeChild(cardPopupComponent.getElement());
  };
  const onEscKeyDown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      removePopup();
      body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  cardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    appendPopup();
    body.classList.add('hide-overlow');
    document.addEventListener('keydown', onEscKeyDown);
  });
  cardPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    removePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};


for (let i = 0; i < Math.min(filmCards.length, SHOWING_FILMS_COUNT_ON_START); i++) {
  renderFilmCard(filmsListElement, filmCards[i]);
}

if(filmCards.length > SHOWING_FILMS_COUNT_ON_START) {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsContainerElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    filmCards.slice(prevFilmsCount, showingFilmsCount)
      .forEach((card) => renderFilmCard(filmsListElement, card));

    if(showingFilmsCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}


const extraFilmCards = generateFilmCards(filmsExtraListElements.length * EXTRA_FILMS_COUNT);
let extraFilmCardsCount = 0;

for (let i = 0; i < filmsExtraListElements.length; i++) {
  for (let k = 0; k < EXTRA_FILMS_COUNT; k++) {
    const filmsExtraListInnerContainerElement = filmsExtraListElements[i].querySelector('.films-list__container');
    //render(filmsExtraListInnerContainerElement, createFilmCardTemplate(filmCards[extraFilmCardsCount]));
    renderFilmCard(filmsExtraListInnerContainerElement, filmCards[extraFilmCardsCount]);
    extraFilmCardsCount++;
  }
}

