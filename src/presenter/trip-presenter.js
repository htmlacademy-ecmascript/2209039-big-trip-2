import { render, remove, RenderPosition } from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingListView from '../view/loading-list-view.js';
import { sortPointsByDay, findSortingDuration, filter } from '../util.js';
import { FilterType, SortingType, UpdateType, UserAction } from '../const.js';


export default class TripPresenter {
  #tripList = new TripListView();
  #loadingComponent = new LoadingListView();
  #container;
  #pointsModel;
  #pointPresenters = new Map();
  #points;
  #destinations;
  #offers;
  #sortingComponent;
  #currentSortingType = SortingType.DAY;
  #sourcedPointsOrder = [];
  #filterModel;
  #filterType;
  #noPointsComponent;
  #newPointPresenter = null;
  #defaultPoint = null;

  #isLoading = true;

  constructor ({ container, pointsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      tripList: this.#tripList,
      onDataChange: this.#handleViewAction,
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
    this.#defaultPoint = this.#pointsModel.defaultPoint[0];
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortingType) {
      case SortingType.DAY:
        return filteredPoints.sort(sortPointsByDay);
      case SortingType.PRICE:
        return filteredPoints.sort((pointA, pointB) => pointA.basePrice - pointB.basePrice);
      case SortingType.TIME:
        return filteredPoints.sort((pointA, pointB) => findSortingDuration(pointA) - findSortingDuration(pointB));
    }

    return filteredPoints;
  }

  init () {
    this.#renderList();
    // this.#createPoint();
  }

  createPoint() {
    this.#currentSortingType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.#defaultPoint, this.#destinations, this.#offers);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetPointView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortingType) {
    switch (sortingType) {
      case SortingType.DAY:
        this.points.sort(sortPointsByDay);
        break;
      case SortingType.PRICE:
        this.points.sort((pointA, pointB) => pointA.basePrice - pointB.basePrice);
        break;
      case SortingType.TIME:

        this.points.sort((pointA, pointB) => findSortingDuration(pointA) - findSortingDuration(pointB));
        break;
      default:
        this.points = [...this.#sourcedPointsOrder];
    }
    this.#currentSortingType = sortingType;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#destinations, this.#offers);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({ resetSortingType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
  };

  #handleSortingTypeChange(sortingType) {
    if (this.#currentSortingType === sortingType) {
      return;
    }
    this.#sortPoints(sortingType);
    this.#clearList();
    this.#renderList();
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      currentSoringType: this.#currentSortingType,
      onSortTypeChange: (sortingType) => this.#handleSortingTypeChange(sortingType),
    });

    render(this.#sortingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destination, offer) {

    const pointPresenter = new PointPresenter({
      tripList: this.#tripList,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange });

    pointPresenter.init(point, destination, offer);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderNoPointsComponent () {
    this.#noPointsComponent = new ListEmptyView({
      filterType: this.#filterType
    });
  }

  #renderList() {
    const points = this.points;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSorting();
    render(this.#tripList, this.#container);
    if (this.points.length === 0) {
      return render(new ListEmptyView({
        filterType: this.#filterType
      }), this.#container);
    }

    points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #clearList({ resetSortingType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortingType) {
      this.#currentSortingType = SortingType.DAY;
    }
  }
}
