import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class PointPresenter {
  #tripPoint = null;
  #editTripForm = null;
  #tripList;
  #handleStatusChange;

  constructor({tripList, onStatusChange}){
    this.#tripList = tripList;
    this.#handleStatusChange = onStatusChange;
  }

  init(point, destination, offer) {
    const prevTripPoint = this.#tripPoint;
    const prevEditTripForm = this.#editTripForm;

    const escKeyDownHanlder = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHanlder);
      }
    };

    this.#tripPoint = new TripPointView(point, destination, offer,
      {
        onEditClick: () => {
          this.#replacePointToForm();
          document.addEventListener('keydown', escKeyDownHanlder);
        }
      },
      { onFavoriteClick: this.#handleFavoriteClick }
    );

    this.#editTripForm = new EditFormView(point, destination, offer,
      {
        onEditClick: () => {
          this.#replaceFormToPoint();
        }
      },
      {
        onFormSubmit: () => {
          this.#replaceFormToPoint();
        }

      }
    );

    if (prevTripPoint === null || prevEditTripForm === null) {
      render(this.#tripPoint, this.#tripList.element);
      return;
    }

    if (this.#tripList.element.contains(prevTripPoint.element)) {
      replace(this.#tripPoint, prevTripPoint);
      return;
    }

    if (this.#tripList.element.contains(prevEditTripForm.element)) {
      replace(this.#tripPoint, prevEditTripForm);
      return;
    }

    remove(prevTripPoint);
    remove(prevEditTripForm);

    render(this.#tripPoint, this.#tripList.element);
  }

  #replacePointToForm() {
    replace(this.#editTripForm, this.#tripPoint);
  }

  #replaceFormToPoint() {
    replace(this.#tripPoint, this.#editTripForm);
  }


  destroy() {
    remove(this.#tripPoint);
    remove(this.#editTripForm);
  }

  #handleFavoriteClick = () => {
    this.#handleStatusChange({...this.#tripPoint, points: {...this.#tripPoint.points, isFavorite: !this.#tripPoint.points.isFavorite}});
  };
}


