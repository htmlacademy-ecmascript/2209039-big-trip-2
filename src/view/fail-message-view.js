import AbstractView from '../framework/view/abstract-view.js';

const createFailMessageTemplate = () => `
  <p class="trip-events__msg">Failed to load latest route information</p>`;

export default class FailMessageView extends AbstractView {
  get template() {
    return createFailMessageTemplate();
  }
}
