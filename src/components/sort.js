import {SORTS} from '../const';

const createSortMarkup = (name, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? 'sort__button--active' : ''}">${name}</a></li>`
  );
};

export const createSortTemplate = () => {
  const sortMarkup = SORTS.map((it, i) => createSortMarkup(it, i === 0)).join('\n');
  return `<ul class="sort">
      ${sortMarkup}
    </ul>`
};
