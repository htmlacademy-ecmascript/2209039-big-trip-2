import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import PointApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic eo2w590ikq9889h';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripSection = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');

const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION)
});


const tripSectionPresenter = new TripPresenter({container: tripSection, pointsModel, filterModel});
const tripInfoPresenter = new HeaderPresenter({container: headerContainer, pointsModel});
const filterPresenter = new FilterPresenter({ filtersContainer, filterModel, pointsModel });

tripInfoPresenter.initInfo();
filterPresenter.init();
tripSectionPresenter.init();
pointsModel.init().
  finally(() => tripSectionPresenter.createPoint());
