const createNavMarkup = (nav, isActive) => {
  const {text, name, count} = nav;
  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">${!!text ? text : name} ${!!count ? 
      `<span class="main-navigation__item-count">${count}</span>` 
      : ''} </a>`
  );
};

const createAdditionalMarkup = (name, isActive) => {
  return (
    `<a href="#${name}" class="main-navigation__additional ${isActive ? 'main-navigation__additional--active' : ''}">${name}</a>`
  );
};

export const createNavTemplate = (nav, navAdditional) => {
  const navMarkup = nav.map((it, i) =>
    createNavMarkup(it, i === 0)).join('\n');
  const navAdditionalMarkup = createAdditionalMarkup(navAdditional[0].name, false);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navMarkup}
      </div>
     ${navAdditionalMarkup}
    </nav>`
};
