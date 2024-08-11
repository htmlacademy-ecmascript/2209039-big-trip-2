import { render } from '../framework/render.js';
// import CreateFormView from '../view/create-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointModel from '../model/point-model.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../util.js';

export default class TripPresenter {
  #tripList = new TripListView();
  #container;
  #pointModel;
  #pointPresenters = new Map();
  #points;
  #destinations;
  #offers;

  constructor ({ container, pointModel = new PointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init () {
    this.#pointModel.init();
    this.#points = this.#pointModel.points;
    this.#destinations = this.#pointModel.destinations;
    this.#offers = this.#pointModel.offers;
    // const defaultPoint = this.#pointModel.defaultPoint;

    render(new SortingView, this.#container);
    render(this.#tripList, this.#container);
    if (this.#points.length === 0) {
      render(new ListEmptyView, this.#container);
    }

    // render(new CreateFormView(defaultPoint[0], destinations, offers), this.#tripList.element);

    this.#points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));

  }

  #handleFavStatusChange = (updatedPoint, destination = this.#destinations, offer = this.#offers) => {
    debugger
    this.#points = updateItem(this.#points, updatedPoint.points);
    this.#pointPresenters.get(updatedPoint.points.id).init(updatedPoint.points, destination, offer);

  };

  #renderPoint(point, destination, offer) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList,
      onStatusChange: this.#handleFavStatusChange });

    pointPresenter.init(point, destination, offer);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
