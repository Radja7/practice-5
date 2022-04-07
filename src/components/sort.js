import AbstractComponent from './abstract-component.js';
import {SORTS, SORTS_TYPE} from '../const';


const createSortMarkup = (name, sortType, isActive) => {
  return (
    `<li><a href="#" data-sort-type="${sortType}" class="sort__button ${isActive ? 'sort__button--active' : ''}">${name}</a></li>`
  );
};

const createSortTemplate = () => {
  const sortMarkup = SORTS.map((it, i) => createSortMarkup(it, SORTS_TYPE[i], i === 0)).join('\n');

  return `<ul class="sort">
            ${sortMarkup}
          </ul>`
};

export default class SortComponent extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
