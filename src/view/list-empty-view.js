import AbstractView from '../framework/view/abstract-view.js';

const Messages = {
  ERROR: 'Something went wrong. We\'re on it right now',
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no past events now',
  PRESENT: 'There are no present events now',
  PAST:'There are no future events now'
};

const messageFinder = () => {
  const checkedInputValue = document.querySelector('.trip-filters__filter-input:checked').value;
  const keyNeeded = Object.keys(Messages).find((key) => key.toLowerCase() === checkedInputValue);
  return Messages[keyNeeded] || Messages.ERROR;
};

const createEmptyListMessageTemplate = () => `
  <p class="trip-events__msg">${messageFinder()}</p>`;

export default class ListEmptyView extends AbstractView {
  get template() {
    return createEmptyListMessageTemplate();
  }
}
