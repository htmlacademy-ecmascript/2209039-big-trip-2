import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointModel from './model/point-model.js';

const tripSection = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');

const filterModel = new FilterModel();
const pointsModel = new PointModel();


const tripSectionPresenter = new TripPresenter({container: tripSection, filterModel});
const tripInfoPresenter = new HeaderPresenter({container: headerContainer});
const filterPresenter = new FilterPresenter({ filtersContainer, filterModel, pointsModel });

tripInfoPresenter.initInfo();
filterPresenter.init();
tripSectionPresenter.init();
