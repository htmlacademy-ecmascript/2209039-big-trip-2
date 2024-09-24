import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class HeaderPresenter {
  #pointsModel;
  #container;

  constructor ({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  initInfo () {
    render (new TripInfoView, this.#container, RenderPosition.AFTERBEGIN);
  }
}
