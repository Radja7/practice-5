const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

import {createProfileTemplate} from './components/profile.js';
import {createNavTemplate} from './components/nav.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmPopupTemplate} from './components/film-popup.js';


const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmsContainerElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsContainerElement.querySelector('.films-list__container');
const filmsExtraListElements = filmsContainerElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListElement, createFilmCardTemplate());
}
render(filmsListElement, createShowMoreButtonTemplate(), 'afterEnd');

for (let i = 0; i < filmsExtraListElements.length; i++) {
  for (let k = 0; k < EXTRA_FILMS_COUNT; k++) {
    const filmsExtraListInnerContainerElement = filmsExtraListElements[i].querySelector('.films-list__container');
    render(filmsExtraListInnerContainerElement, createFilmCardTemplate());
  }
}

render(siteFooterElement, createFilmPopupTemplate(), 'afterEnd');

