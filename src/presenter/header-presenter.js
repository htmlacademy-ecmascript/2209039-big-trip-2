import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import PointModel from '../model/point-model.js';

export default class HeaderPresenter {
  #pointModel;
  #container;

  constructor ({ container, pointModel = new PointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  initInfo () {
    render (new TripInfoView, this.#container, RenderPosition.AFTERBEGIN);
  }

  // initFilters () {
  //   this.#pointModel.init();
  //   const points = this.#pointModel.points;
  //   render(new FiltersView(points), this.#container);
  // }
}
