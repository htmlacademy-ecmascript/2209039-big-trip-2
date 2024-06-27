import dayjs from 'dayjs';

const humanizeDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const findDuration = (date1, date2) => {
  let minutesDuration = dayjs(date1).diff(dayjs(date2), 'm');
  const minutes = minutesDuration % 60;

  if (minutesDuration >= 60 && minutes !== 0) {
    minutesDuration /= 60;

    return `${Math.floor(minutesDuration)}H ${minutes}M`;
  }

  if (minutesDuration >= 60) {
    minutesDuration /= 60;
  }

  return `${Math.floor(minutesDuration)}H`;
};


export { humanizeDueDate, capitalize, findDuration };
