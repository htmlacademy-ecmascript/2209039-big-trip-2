import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripPointView from '../view/trip-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDateEqual } from '../util.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #tripPoint = null;
  #editTripForm = null;
  #tripList;
  #handleDataChange;
  #handleModeChange;
  #mode = Mode.DEFAULT;

  constructor({tripList, onDataChange, onModeChange}){
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destination, offer) {
    const prevTripPoint = this.#tripPoint;
    const prevEditTripForm = this.#editTripForm;

    this.#tripPoint = new TripPointView(point, destination, offer,
      {
        onEditClick: () => {
          this.#replacePointToForm();
          document.addEventListener('keydown', this.#escKeyDownHanlder);
        },
        onFavoriteClick: this.#handleFavoriteClick }
    );

    this.#editTripForm = new EditFormView(point, destination, offer,
      {
        onEditClick: () => {
          this.#replaceFormToPoint();
        },
        onFormSubmit: (newPoint) => {
          this.#handleFormSubmit(newPoint);
        }

      }
    );

    if (prevTripPoint === null || prevEditTripForm === null) {
      render(this.#tripPoint, this.#tripList.element);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#tripPoint, prevTripPoint);
      return;
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#tripPoint, prevEditTripForm);
      this.#mode = Mode.DEFAULT;
      return;
    }

    remove(prevTripPoint);
    remove(prevEditTripForm);

    render(this.#tripPoint, this.#tripList.element);
  }

  #escKeyDownHanlder = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#editTripForm, this.#tripPoint);
    document.addEventListener('keydown', this.#escKeyDownHanlder);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint(point = this.#tripPoint) {
    replace(point, this.#editTripForm);
    document.removeEventListener('keydown', this.#escKeyDownHanlder);
    this.#mode = Mode.DEFAULT;
  }


  destroy() {
    remove(this.#tripPoint);
    remove(this.#editTripForm);
  }

  resetPointView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#tripPoint.points, points: {...this.#tripPoint.points, isFavorite: !this.#tripPoint.points.isFavorite}}.points);
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDateEqual(this.#tripPoint.dateFrom);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
