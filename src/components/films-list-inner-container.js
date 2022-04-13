import AbstractComponent from './abstract-component.js';

const createFilmsListInnerContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsListInnerContainerComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsListInnerContainerTemplate();
  }
}
