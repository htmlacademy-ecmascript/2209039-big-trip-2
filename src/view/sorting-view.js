import { SortingType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { capitalize } from '../util.js';

const createSortingElement = (sortingType) => `
  <div class="trip-sort__item  trip-sort__item--${sortingType}">
    <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}"
      data-sort-type="${sortingType}"
    ${sortingType === 'event' ? 'disabled' : ''}
    ${sortingType === 'offers' ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sortingType}">${capitalize(sortingType)}</label>
  </div>`;

const createSortingTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortingType).map((sortingType) => createSortingElement(sortingType)).join('')}
  </form>`;

export default class SortingView extends AbstractView{
  #handleSortTypeChange;
  #currentSoringType;

  constructor ({currentSoringType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
    this.#currentSoringType = currentSoringType;
  }

  get template () {
    return createSortingTemplate();
  }

  #checkChosenAttribute(currentElement) {
    currentElement.setAttribute('checked', '');
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
    evt.target.setAttribute('checked', '');
  };
}
