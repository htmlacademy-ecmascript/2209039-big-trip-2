import { render, RenderPosition } from '../render.js';
import Filters from '../view/filters-view.js';
import TripInfo from '../view/trip-info-view.js';

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
