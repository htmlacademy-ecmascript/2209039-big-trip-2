import { render } from '../render.js';
import CreateForm from '../view/create-form-view.js';
import EditForm from '../view/edit-form-view.js';
import Sorting from '../view/sorting-view.js';
import TripList from '../view/trip-list-view.js';
import TripPoint from '../view/trip-point-view.js';
import PointModel from '../model/point-model.js';

export default class TripPresenter {
  tripList = new TripList();

  constructor ({ container, pointModel = new PointModel }) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init () {
    this.pointModel.init();
    const points = this.pointModel.getPoints();
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();
    const defaultPoint = this.pointModel.getDefaultPoint();

    render(new Sorting, this.container);
    render(this.tripList, this.container);
    render(new EditForm(points[0], destinations, offers), this.tripList.getElement());
    render(new CreateForm(defaultPoint[0], destinations, offers), this.tripList.getElement());

    points.forEach((point) => {
      render(new TripPoint(point, destinations, offers), this.tripList.getElement());
    });
  }
}
