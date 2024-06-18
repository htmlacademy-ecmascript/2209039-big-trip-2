import TripPresenter from './presenter/trip.js';
import HeaderPresenter from './presenter/header.js';

const tripSection = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');


const tripSectionPresenter = new TripPresenter({container: tripSection});
const tripInfoPresenter = new HeaderPresenter({container: headerContainer});
const filtersPresenter = new HeaderPresenter({ container: filtersContainer });

tripSectionPresenter.init();
filtersPresenter.initFilters();
tripInfoPresenter.initInfo();
