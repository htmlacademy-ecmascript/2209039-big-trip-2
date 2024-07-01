import { points, defaultPoint } from '../mock/points.js';
import { destinations } from '../mock/destinations.js';
import { offers } from '../mock/offers.js';

export default class PointModel {
  constructor() {
    this.points = [];
    this.destinations = [];
    this.offers = [];
    this.defaultPoint = [];
  }

  init() {
    this.points = points;
    this.destinations = destinations;
    this.offers = offers;
    this.defaultPoint = defaultPoint;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDefaultPoint() {
    return this.defaultPoint;
  }
}
