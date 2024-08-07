import AbstractView from '../framework/view/abstract-view.js';

const createLoadingMessageTemplate = () => `
  <p class="trip-events__msg">Loading...</p>`;

export default class LoadingListView extends AbstractView {
  get template() {
    return createLoadingMessageTemplate();
  }
}

