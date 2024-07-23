import { render, replace } from '../framework/render.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import PointModel from '../model/point-model.js';

export default class TripPresenter {
  #tripList = new TripListView();
  #container;
  #pointModel;

  constructor ({ container, pointModel = new PointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init () {
    this.#pointModel.init();
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    const defaultPoint = this.#pointModel.defaultPoint;

    render(new SortingView, this.#container);
    render(this.#tripList, this.#container);
    render(new CreateFormView(defaultPoint[0], destinations, offers), this.#tripList.element);
    points.forEach((point) => this.#renderPoint(point, destinations, offers));

  }

  #renderPoint(point, destination, offer) {
    const escKeyDownHanlder = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHanlder);
      }
    };

    const tripPoint = new TripPointView(point, destination, offer,
      { onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHanlder);
      } }
    );

    const editTripForm = new EditFormView(point, destination, offer,
      { onEditClick: () => {
        replaceFormToPoint();
      } },
      { onFormSubmit: () => {
        replaceFormToPoint();
      }

      }
    );

    function replacePointToForm() {
      replace(editTripForm, tripPoint);
    }

    function replaceFormToPoint() {
      replace(tripPoint, editTripForm);
    }

    render(tripPoint, this.#tripList.element);
  }
}
