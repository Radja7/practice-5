import {createProfileTemplate} from './components/profile.js';
import {createNavTemplate} from './components/nav.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {generateNav, generateNavAdditional} from "./mock/nav";
import {generateFilmCards} from "./mock/film-card";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;


const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const nav = generateNav();
const navAdditional = generateNavAdditional();
const filmCards = generateFilmCards(FILMS_COUNT);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavTemplate(nav, navAdditional));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmsContainerElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsContainerElement.querySelector('.films-list__container');
const filmsExtraListElements = filmsContainerElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListElement, createFilmCardTemplate(filmCards[i]));
}

render(filmsListElement, createShowMoreButtonTemplate(), 'afterEnd');

const extraFilmCards = generateFilmCards(filmsExtraListElements.length * EXTRA_FILMS_COUNT);
let extraFilmCardsCount = 0;

for (let i = 0; i < filmsExtraListElements.length; i++) {
  for (let k = 0; k < EXTRA_FILMS_COUNT; k++) {
    const filmsExtraListInnerContainerElement = filmsExtraListElements[i].querySelector('.films-list__container');
    console.log(extraFilmCardsCount);
    render(filmsExtraListInnerContainerElement, createFilmCardTemplate(filmCards[extraFilmCardsCount]));
    extraFilmCardsCount++;
  }
}

//render(siteFooterElement, createFilmPopupTemplate(), 'afterEnd');

