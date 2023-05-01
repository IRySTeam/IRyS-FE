import moment from 'moment';

export const formatDate = (datetime) => {
  const localDatetime = moment.utc(datetime).local().format('DD MMMM YYYY');
  return localDatetime;
}

export const formatDateTable = (datetime) => {
  const localDatetime = moment.utc(datetime).local().format('DD MMM YYYY HH:mm');
  return localDatetime;
}