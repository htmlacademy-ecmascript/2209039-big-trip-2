import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #pointApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];
  #defaultPoint = {
    basePrice: 0,
    dateFrom: '',
    dateTo: '',
    destination: '',
    isFavorite: false,
    offers: [],
    type: 'flight'
  };

  constructor({pointApiService}) {
    super();
    this.#pointApiService = pointApiService;
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#points = points.map(this.#adaptToCLient);
      this.#destinations = await this.#pointApiService.destinations;
      this.#offers = await this.#pointApiService.offers;
    } catch (err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
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

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToCLient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, updatedPoint);

    } catch (err) {
      throw new Error(err);
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.addPoint(update);
      const newPoint = this.#adaptToCLient(response);
      this.#points = [
        newPoint,
        ...this.#points
      ];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t delete unexisting point');
    }

    try {
      await this.#pointApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error(err);
    }
  }

  #adaptToCLient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
