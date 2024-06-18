import { render, RenderPosition } from '../render.js';
import Filters from '../view/filters.js';
import TripInfo from '../view/trip-info.js';

export default class HeaderPresenter {
  constructor ({ container }) {
    this.container = container;
  }

  initInfo () {
    render (new TripInfo, this.container, RenderPosition.AFTERBEGIN);
  }

  initFilters () {
    render(new Filters, this.container);
  }
}
