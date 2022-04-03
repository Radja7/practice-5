import AbstractComponent from './abstract-component.js';

const createFilmsListEmptyTemplate = (message) => {
  return (
    `<section class="films">
      <section class="films-list">
         <h2 class="films-list__title">${message}</h2>
      </section>
    </section>`
  );
};

export default class FilmsListEmptyComponent extends AbstractComponent {
  constructor(message) {
    super();

    this._message = message;
  }

  getTemplate() {
    return createFilmsListEmptyTemplate(this._message);
  }
}
