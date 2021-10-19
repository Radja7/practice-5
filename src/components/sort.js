const createSortMarkup = (name, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? 'sort__button--active' : ''}">${name}</a></li>`
  );
};

export const createSortTemplate = (sorts) => {
  const sortMarkup = sorts.map((it, i) => createSortMarkup(it, i === 0)).join('\n');
  return `<ul class="sort">
      ${sortMarkup}
    </ul>`
};
