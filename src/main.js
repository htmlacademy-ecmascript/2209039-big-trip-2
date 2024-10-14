import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import PointApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic eo2w590ikq97389h';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripSection = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION)
});


const tripSectionPresenter = new TripPresenter({container: tripSection, pointsModel, filterModel});
const filterPresenter = new FilterPresenter({ filtersContainer, filterModel, pointsModel });

filterPresenter.init();
tripSectionPresenter.init();
pointsModel.init().
  finally(() => tripSectionPresenter.createPoint());
