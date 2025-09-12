import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const convertDate = (value: any) => {
  return moment(value).format('DD MMMM YYYY');
};
