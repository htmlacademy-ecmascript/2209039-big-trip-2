import dayjs from 'dayjs';

const humanizeDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const findDuration = (date1, date2) => dayjs(date1).diff(dayjs(date2), 'h');


export { humanizeDueDate, capitalize, findDuration };
