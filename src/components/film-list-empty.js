import {createElement} from '../utils/render.js';

const createFilmsListEmptyTemplate = (message) => {
  return (
    `<section class="films">
      <section class="films-list">
         <h2 class="films-list__title">${message}</h2>
      </section>
    </section>`
  );
};

export default class FilmsListEmptyComponent {
  constructor(message) {
    this._message = message;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListEmptyTemplate(this._message);
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
