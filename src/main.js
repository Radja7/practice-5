import {createProfileTemplate} from './components/profile.js';
import {createNavTemplate} from './components/nav.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {generateNav, generateNavAdditional} from './mock/nav';
import {generateFilmCards} from './mock/film-card';

const FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EXTRA_FILMS_COUNT = 2;


const renderOLD = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const nav = generateNav();
const navAdditional = generateNavAdditional();
const filmCards = generateFilmCards(FILMS_COUNT);

renderOLD(siteHeaderElement, createProfileTemplate());
renderOLD(siteMainElement, createNavTemplate(nav, navAdditional));
renderOLD(siteMainElement, createSortTemplate());
renderOLD(siteMainElement, createFilmsContainerTemplate());

const filmsContainerElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsContainerElement.querySelector('.films-list__container');
const filmsExtraListElements = filmsContainerElement.querySelectorAll('.films-list--extra');

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

for (let i = 0; i < showingFilmsCount; i++) {
  renderOLD(filmsListElement, createFilmCardTemplate(filmCards[i]));
}

renderOLD(filmsListElement, createShowMoreButtonTemplate(), 'afterEnd');

const loadMoreButton = filmsContainerElement.querySelector('.films-list__show-more');

loadMoreButton.addEventListener('click', () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  filmCards.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderOLD(filmsListElement, createFilmCardTemplate(film)));

  if(showingFilmsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

const extraFilmCards = generateFilmCards(filmsExtraListElements.length * EXTRA_FILMS_COUNT);
let extraFilmCardsCount = 0;

for (let i = 0; i < filmsExtraListElements.length; i++) {
  for (let k = 0; k < EXTRA_FILMS_COUNT; k++) {
    const filmsExtraListInnerContainerElement = filmsExtraListElements[i].querySelector('.films-list__container');
    renderOLD(filmsExtraListInnerContainerElement, createFilmCardTemplate(filmCards[extraFilmCardsCount]));
    extraFilmCardsCount++;
  }
}

//render(siteFooterElement, createFilmPopupTemplate(filmCards[0]), 'afterEnd');

