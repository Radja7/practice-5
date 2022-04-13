import ProfileComponent from './components/profile.js';
import NavComponent from './components/nav.js';
import FilmsStatisticsComponent from './components/films-statistics';
import {generateFilmCards} from './mock/film-card.js';
import {generateNav, generateNavAdditional} from './mock/nav.js';
import {render, RenderPosition} from './utils/render.js';
import PageController from './controllers/page.js';

const FILMS_COUNT = 9;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const nav = generateNav();
const navAdditional = generateNavAdditional();
const filmCards = generateFilmCards(FILMS_COUNT);

const pageController = new PageController(siteMainElement);


render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavComponent(nav, navAdditional).getElement(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsStatisticsComponent(filmCards.length).getElement(), RenderPosition.BEFOREEND);

pageController.init(filmCards);



//
// if(FILMS_COUNT > 0) {
//   render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
//
//   console.log( new SortComponent().getElement());
//
//   const pageContainer = new FilmsContainerComponent();
//   const pageController = new PageController(pageContainer);
//   render(siteMainElement, pageContainer.getElement(), RenderPosition.BEFOREEND);
//   pageController.render(filmCards);
//
//   const filmsExtraListElements = document.querySelector('.main').querySelector('.films').querySelectorAll('.films-list--extra');
//   for (let i = 0; i < filmsExtraListElements.length; i++) {
//     let extraFilmCards = generateFilmCards(EXTRA_FILMS_COUNT);
//     pageController.render(extraFilmCards, i);
//   }
// } else {
//
// }














