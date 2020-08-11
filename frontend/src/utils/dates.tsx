import moment from 'moment';

const getReadableEventDate = (date: Date | string) => {
  return moment(date).format('MMM Do YYYY');
};

export default {
  getReadableEventDate,
};
