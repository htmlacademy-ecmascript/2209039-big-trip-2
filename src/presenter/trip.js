import { render } from '../render.js';
import CreateForm from '../view/create-form.js';
import EditForm from '../view/edit-form.js';
import Sorting from '../view/sorting.js';
import TripList from '../view/trip-list.js';
import TripPoint from '../view/trip-point.js';

export default class TripPresenter {
  tripList = new TripList();

  constructor ({ container }) {
    this.container = container;
  }

  init () {
    render(new Sorting, this.container);
    render(this.tripList, this.container);
    render(new EditForm, this.tripList.getElement());
    render(new CreateForm, this.tripList.getElement());

    for (let i = 0; i < 3; i++) {
      render (new TripPoint, this.tripList.getElement());
    }
  }
}
