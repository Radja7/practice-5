import AbstractComponent from './abstract-component.js';
import {SORTS, SortType} from '../const';

const addActiveControlClass = (isActive) => {
  return isActive ? `sort__button--active` : '';
};

const createSortMarkup = (sortType, isActive) => {
  return `
    <li><a href="#" class="sort__button ${isActive}" data-sort-type="${sortType}">Sort by ${sortType}</a></li>
  `
};

const createSortTemplate = (currentSortType) => {
  const sortMarkup = Object.values(SortType)
    .map((sortType) => {
    return createSortMarkup(sortType, addActiveControlClass(sortType === currentSortType));
  })
  .join('\n');

  return `<ul class="sort">
            ${sortMarkup}
          </ul>`
};

export default class SortComponent extends AbstractComponent {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {

    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();

      if(evt.target.tagName !== 'A') {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType)
    });
  }
}
