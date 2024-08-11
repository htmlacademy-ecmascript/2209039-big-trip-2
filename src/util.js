import dayjs from 'dayjs';
import lodash from 'lodash';

const humanizeDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const findDuration = (date1, date2) => {
  let minutesDuration = dayjs(date1).diff(dayjs(date2), 'm');
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


export { humanizeDueDate, capitalize, findDuration, toCamelCase, checkPastPoints, checkPresentPoints, updateItem };
