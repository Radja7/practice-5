import AbstractComponent from './abstract-component.js';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more" type="button">Show more</button>'
);

export default class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }
}
