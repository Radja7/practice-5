import { createElement } from '../utils/render.js';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more" type="button">Show more</button>'
);

export default class ShowMoreButtonComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate())
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
