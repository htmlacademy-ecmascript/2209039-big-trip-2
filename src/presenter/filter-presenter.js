
import FiltersView from '../view/filters-view';
import { FilterType, UpdateType } from '../const';
import { remove, replace, render } from '../framework/render';
import { filter } from '../util.js';

export default class FilterPresenter {
  #filtersContainer;
  #pointsModel;
  #filterComponent = null;
  #filterModel;

  constructor ({filtersContainer, filterModel, pointsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters () {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length
      },
      {
        type: FilterType.PRESENT,
        name: 'Present',
        count: filter[FilterType.PRESENT](points).length
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](points).length
      }
    ];
  }

  init () {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {

      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
