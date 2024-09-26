import {remove, render, RenderPosition} from '../framework/render.js';
import CreateFormView from '../view/create-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #tripList;
  #handleDataChange;
  #handleDestroy;
  #createTripForm = null;

  constructor ({tripList, onDataChange}) {
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
  }

  init(point, destination, offer) {
    if(this.#createTripForm !== null) {
      return;
    }

    this.#createTripForm = new CreateFormView(point, destination, offer,
      {
        onFormSubmit: (newPoint) => {
          this.#handleFormSubmit(newPoint);
        },
        onDeleteClick: () => {
          this.#handleDeleteClick(point);
        },
        onNewEventClick: () => {
          this.#handleNewEventClick(point, destination, offer);
        }
      });

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#createTripForm === null) {
      return;
    }

    remove(this.#createTripForm);
    this.#createTripForm = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#createTripForm.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#createTripForm.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };


    this.#createTripForm.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleNewEventClick(point, destination, offer) {
    this.init(point, destination, offer);
    render(this.#createTripForm, this.#tripList.element, RenderPosition.AFTERBEGIN);
  }
}
