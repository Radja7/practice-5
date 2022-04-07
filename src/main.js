import {MESSAGES_NO_FILMS} from './const.js';
import FilmsListEmptyComponent from './components/film-list-empty.js';
import ProfileComponent from './components/profile.js';
import NavComponent from './components/nav.js';
import SortComponent from './components/sort.js';
import FilmsContainerComponent from './components/films-container.js';
import {generateFilmCards} from './mock/film-card.js';
import {generateNav, generateNavAdditional} from './mock/nav.js';
import {render, RenderPosition} from './utils/render.js';
import PageController from './controllers/page.js';

const FILMS_COUNT = 20;
const EXTRA_FILMS_COUNT = 2;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const nav = generateNav();
const navAdditional = generateNavAdditional();
const filmCards = generateFilmCards(FILMS_COUNT);


render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavComponent(nav, navAdditional).getElement(), RenderPosition.BEFOREEND);


if(FILMS_COUNT > 0) {
  render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

  const pageContainer = new FilmsContainerComponent();
  const pageController = new PageController(pageContainer);
  render(siteMainElement, pageContainer.getElement(), RenderPosition.BEFOREEND);
  pageController.render(filmCards);

  const filmsExtraListElements = document.querySelector('.main').querySelector('.films').querySelectorAll('.films-list--extra');
  for (let i = 0; i < filmsExtraListElements.length; i++) {
    let extraFilmCards = generateFilmCards(EXTRA_FILMS_COUNT);
    pageController.render(extraFilmCards, i);
  }
} else {
  render(siteMainElement, new FilmsListEmptyComponent(MESSAGES_NO_FILMS[0]).getElement(), RenderPosition.BEFOREEND);
}














