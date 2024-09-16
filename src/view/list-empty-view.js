import AbstractView from '../framework/view/abstract-view.js';

const Messages = {
  ERROR: 'Something went wrong. We\'re on it right now',
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no past events now',
  PRESENT: 'There are no present events now',
  PAST:'There are no future events now'
};

const createEmptyListMessageTemplate = (filterType) => {
  const message = Messages[filterType];

  return `<p class="trip-events__msg">${message}</p>`;
};

export default class ListEmptyView extends AbstractView {
  #filterType;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListMessageTemplate(this.#filterType);
  }
}
