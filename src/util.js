import dayjs from 'dayjs';
import lodash from 'lodash';

const humanizeDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const findSortingDuration = (point) => dayjs(point.dateTo).diff(dayjs(point.dateFrom), 'm');

const findDuration = (point) => {
  let minutesDuration = findSortingDuration(point);
  const minutesAfterHours = minutesDuration % 60;

  if (minutesDuration >= 60 && minutesAfterHours !== 0) {
    minutesDuration /= 60;

    return `${Math.floor(minutesDuration)}H ${minutesAfterHours}M`;
  }

  if (minutesDuration >= 60) {
    minutesDuration /= 60;
  }

  return `${Math.floor(minutesDuration)}H`;
};

const checkPastPoints = (points) => {
  const dates = points.map((point) => point.dateTo);
  if (dates.some((date) => dayjs(date).diff(dayjs() < 0))) {
    return 'disabled';
  }
};

const checkPresentPoints = (points) => {
  if (!(points.some((point) => (dayjs(point.dateFrom).isBefore(dayjs()) &&
  dayjs(point.dateTo).isAfter(dayjs()))))) {
    return 'disabled';
  }
};

const toCamelCase = (str) => lodash.camelCase(str);

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const getWeightForDate = (dateA, dateB) => {
  if (dateA === null && dateB === 0) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointsByDay = (pointA, pointB) => {
  const weight = getWeightForDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const isDateEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export { humanizeDueDate, capitalize, findDuration, toCamelCase, checkPastPoints, checkPresentPoints,
  updateItem, sortPointsByDay, findSortingDuration, isDateEqual };
