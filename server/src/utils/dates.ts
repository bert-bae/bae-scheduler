import moment from 'moment';

export const getISODate = () => new Date().toISOString();

export const addMonths = (date, monthsToAdd) => {
  return moment(date).add(monthsToAdd, 'M').toDate();
};

export const getDayOfMonth = (date) => moment(date).date();

export const getMonth = (date) => moment(date).month();

export const getYear = (date) => moment(date).year();

export const getCurrentMonth = () => moment(new Date()).month();

export const getRandomDateInMonth = (date) => {
  const daysInMonth = moment(date).daysInMonth();
  const month = getMonth(date);
  const year = getYear(date);
  const dayOfMonth = getDayOfMonth(date);
  const randomDateInMonth =
    Math.floor(Math.random() * (daysInMonth - dayOfMonth)) + dayOfMonth + 1;
  return moment(
    `${randomDateInMonth}-${month + 1}-${year}`,
    'DD-MM-YYYY'
  ).toDate();
};

export const validateDates = (dates: Array<string | Date>): void => {
  dates.forEach((date) => {
    if (!moment(date).isValid()) {
      throw new Error(`Date ${date} is invalid`);
    }
  });
};
