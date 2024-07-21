import { points, defaultPoint } from '../mock/points.js';
import { destinations } from '../mock/destinations.js';
import { offers } from '../mock/offers.js';

export default class PointModel {
  #points;
  #destinations;
  #offers;
  #defaultPoint;

  constructor() {
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
    this.#defaultPoint = [];
  }

  init() {
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#defaultPoint = defaultPoint;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get defaultPoint() {
    return this.#defaultPoint;
  }
}
