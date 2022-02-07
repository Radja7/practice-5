import {SORTS} from '../const';
import { createElement } from '../utils/render.js';

const createSortMarkup = (name, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? 'sort__button--active' : ''}">${name}</a></li>`
  );
};

const createSortTemplate = () => {
  const sortMarkup = SORTS.map((it, i) => createSortMarkup(it, i === 0)).join('\n');
  return `<ul class="sort">
      ${sortMarkup}
    </ul>`
};

export default class SortComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
