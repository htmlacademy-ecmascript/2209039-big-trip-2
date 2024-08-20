import { render } from '../framework/render.js';
// import CreateFormView from '../view/create-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointModel from '../model/point-model.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortPointsByDay, findSortingDuration } from '../util.js';
import { SortingTypes } from '../const.js';


export default class TripPresenter {
  #tripList = new TripListView();
  #container;
  #pointModel;
  #pointPresenters = new Map();
  #points;
  #destinations;
  #offers;
  #sortingComponent;
  #currentSortingType = SortingTypes.PRICE;
  #sourcedPointsOrder = [];

  constructor ({ container, pointModel = new PointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init () {
    this.#pointModel.init();
    this.#points = this.#pointModel.points;
    this.#destinations = this.#pointModel.destinations;
    this.#offers = this.#pointModel.offers;
    this.#sourcedPointsOrder = this.#pointModel.points;
    // const defaultPoint = this.#pointModel.defaultPoint;

    this.#renderSorting();

    render(this.#tripList, this.#container);
    if (this.#points.length === 0) {
      render(new ListEmptyView, this.#container);
    }

    // render(new CreateFormView(defaultPoint[0], destinations, offers), this.#tripList.element);

    this.#points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));

  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetPointView());
  };

  #handleFavStatusChange = (updatedPoint, destination = this.#destinations, offer = this.#offers) => {
    this.#points = updateItem(this.#points, updatedPoint.points);
    this.#sourcedPointsOrder = updateItem(this.#sourcedPointsOrder, updatedPoint.points);
    this.#pointPresenters.get(updatedPoint.points.id).init(updatedPoint.points, destination, offer);

  };

  #sortPoints(sortingType) {
    switch (sortingType) {
      case SortingTypes.DAY:
        this.#points.sort(sortPointsByDay);
        break;
      case SortingTypes.PRICE:
        this.#points.sort((pointA, pointB) => pointA.basePrice - pointB.basePrice);
        break;
      case SortingTypes.TIME:

        this.#points.sort((pointA, pointB) => findSortingDuration(pointA) - findSortingDuration(pointB));
        break;
      default:
        this.#points = [...this.#sourcedPointsOrder];
    }
    this.#currentSortingType = sortingType;
  }

  #handleSortingTypeChange(sortingType) {
    if (this.#currentSortingType === sortingType) {
      return;
    }
    this.#sortPoints(sortingType);
    this.#clearPointList();
    this.#renderSorting();

    this.#points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: (sortingType) => this.#handleSortingTypeChange(sortingType),
    });

    render(this.#sortingComponent, this.#container);
  }

  #renderPoint(point, destination, offer) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList,
      onStatusChange: this.#handleFavStatusChange,
      onModeChange: this.#handleModeChange });

    pointPresenter.init(point, destination, offer);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
