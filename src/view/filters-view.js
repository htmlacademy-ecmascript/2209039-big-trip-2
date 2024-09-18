import AbstractView from '../framework/view/abstract-view.js';
import { checkPastPoints, checkPresentPoints, checkFuturePoints } from '../util.js';


const createFilterElement = (filterType, currentFilterType, points) => `
  <div class="trip-filters__filter">
    <input id="filter-${filterType.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.name.toLowerCase()}"
    ${filterType.type === currentFilterType ? 'checked' : ''}
    ${filterType.type === 'present' ? checkPresentPoints(points) : ''}
    ${filterType.type === 'past' ? checkPastPoints(points) : ''}
    ${filterType.type === 'future' ? checkFuturePoints(points) : ''}>
    <label class="trip-filters__filter-label" for="filter-${filterType.name.toLowerCase()}">${filterType.name}</label>
  </div>`;


const createFilterTemplate = (filtersType, currentFilterType, points) => {
  const filterItemsTemplate = filtersType.map((filter) => createFilterElement(filter, currentFilterType, points)).join('');

  return `
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class FiltersView extends AbstractView {
  #currentFilter;
  #handleFilterTypeChange;
  #filters;
  #points;

  constructor (points, {filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.#points = points;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template () {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#points);
  }

  #filterTypeChangeHandler = (evt) => {
    this.#handleFilterTypeChange(evt.target.value);
  };
}
