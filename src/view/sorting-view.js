import { SortingTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { capitalize } from '../util.js';

const findCheckedElement = (element) => element === 'price' ? 'checked' : '';

const createSortingElement = (sortingType) => `
  <div class="trip-sort__item  trip-sort__item--${sortingType}">
    <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}" ${findCheckedElement(sortingType)}
      data-sort-type="${sortingType}"
    ${sortingType === 'event' ? 'disabled' : ''}
    ${sortingType === 'offers' ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sortingType}">${capitalize(sortingType)}</label>
  </div>`;

const createSortingTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortingTypes).map((sortingType) => createSortingElement(sortingType)).join('')}
  </form>`;

export default class SortingView extends AbstractView{
  #handleSortTypeChange;

  constructor ({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template () {
    return createSortingTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
