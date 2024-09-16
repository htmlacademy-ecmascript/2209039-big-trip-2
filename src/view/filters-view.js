import AbstractView from '../framework/view/abstract-view.js';
// import { checkPastPoints, checkPresentPoints } from '../util.js';

// ${filterType === FilterType.PRESENT ? checkPresentPoints(points) : ''}
// ${filterType === FilterType.PAST ? checkPastPoints(points) : ''}

const createFilterElement = (filterType, currentFilterType) => `
  <div class="trip-filters__filter">
    <input id="filter-${filterType.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.name.toLowerCase()}"
    ${filterType === currentFilterType ? 'checked' : ''}>

    <label class="trip-filters__filter-label" for="filter-${filterType.name.toLowerCase()}">${filterType.name}</label>
  </div>`;


const createFilterTemplate = (filtersType, currentFilterType) => {
  const filterItemsTemplate = filtersType.filters.map((filter) => createFilterElement(filter, currentFilterType)).join('');

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

  constructor (filters, currentFilterType, onFilterTypeChange) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template () {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
