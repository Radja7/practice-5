import AbstractComponent from './abstract-component.js';

const createFilmsStatisticsTemplate = (count) => {
  return `<p>${count} movies inside</p>`;
};

export default class FilmsStatisticsComponent extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFilmsStatisticsTemplate(this._count);
  }
}
