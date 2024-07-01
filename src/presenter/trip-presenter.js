import { render } from '../render.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import PointModel from '../model/point-model.js';

export default class TripPresenter {
  tripList = new TripListView();

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

    render(new SortingView, this.container);
    render(this.tripList, this.container);
    render(new EditFormView(points[0], destinations, offers), this.tripList.getElement());
    render(new CreateFormView(defaultPoint[0], destinations, offers), this.tripList.getElement());

    points.forEach((point) => {
      render(new TripPointView(point, destinations, offers), this.tripList.getElement());
    });
  }
}
