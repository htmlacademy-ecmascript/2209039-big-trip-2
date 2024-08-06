import { render, replace } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class PointPresenter {

  #tripList;

  constructor({tripList}){
    this.#tripList = tripList;
  }

  init(point, destination, offer) {

    const escKeyDownHanlder = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHanlder);
      }
    };

    const tripPoint = new TripPointView(point, destination, offer,
      {
        onEditClick: () => {
          replacePointToForm();
          document.addEventListener('keydown', escKeyDownHanlder);
        }
      }
    );

    const editTripForm = new EditFormView(point, destination, offer,
      {
        onEditClick: () => {
          replaceFormToPoint();
        }
      },
      {
        onFormSubmit: () => {
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
