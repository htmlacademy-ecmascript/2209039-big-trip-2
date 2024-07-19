import { render, RenderPosition } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';

export default class HeaderPresenter {
  constructor ({ container }) {
    this.container = container;
  }

  initInfo () {
    render (new TripInfoView, this.container, RenderPosition.AFTERBEGIN);
  }

  initFilters () {
    render(new FiltersView, this.container);
  }
}
