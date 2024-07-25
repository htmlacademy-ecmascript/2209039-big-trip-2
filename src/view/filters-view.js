import AbstractView from '../framework/view/abstract-view.js';
import { checkPastPoints, checkPresentPoints } from '../util.js';

const filtersTypes = ['Everything', 'Future', 'Present', 'Past'];

const createFilterElement = (filterType, points) => `
  <div class="trip-filters__filter">
    <input id="filter-${filterType.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.toLowerCase()}"
    ${filterType === filtersTypes[0] ? 'checked' : ''}
    ${filterType === 'Present' ? checkPresentPoints(points) : ''}
    ${filterType === 'Past' ? checkPastPoints(points) : ''}>
    <label class="trip-filters__filter-label" for="filter-${filterType.toLowerCase()}">${filterType}</label>
  </div>`;


const createFilterTemplate = (points) => `
  <form class="trip-filters" action="#" method="get">
    ${filtersTypes.map((filterType) => createFilterElement(filterType, points)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {

  constructor (points) {
    super();
    this.points = points;
  }

  get template () {

    return createFilterTemplate(this.points);
  }
}
