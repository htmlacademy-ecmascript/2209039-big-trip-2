import { render } from '../framework/render.js';
// import CreateFormView from '../view/create-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointModel from '../model/point-model.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripList = new TripListView();
  #container;
  #pointModel;
  #pointPresenters = new Map();

  constructor ({ container, pointModel = new PointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init () {
    this.#pointModel.init();
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    // const defaultPoint = this.#pointModel.defaultPoint;

    render(new SortingView, this.#container);
    render(this.#tripList, this.#container);
    if (points.length === 0) {
      render(new ListEmptyView, this.#container);
    }

    // render(new CreateFormView(defaultPoint[0], destinations, offers), this.#tripList.element);

    points.forEach((point) => this.#renderPoint(point, destinations, offers));

  }

  #renderPoint(point, destination, offer) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList });

    pointPresenter.init(point, destination, offer);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
