import AbstractView from '../framework/view/abstract-view.js';

const sortingTypes = ['Day', 'Event', 'Time', 'Price', 'Offers'];

const findCheckedElement = (element) => element === 'Price' ? 'checked' : '';

const createSortingElement = (sortingType) => `
  <div class="trip-sort__item  trip-sort__item--${sortingType}">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}" ${findCheckedElement(sortingType)}>
    <label class="trip-sort__btn" for="sort-day">${sortingType}</label>
  </div>`;

const createSortingTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortingTypes.map((sortingType) => createSortingElement(sortingType)).join('')}
  </form>`;

export default class SortingView extends AbstractView{
  get template () {
    return createSortingTemplate();
  }
}
