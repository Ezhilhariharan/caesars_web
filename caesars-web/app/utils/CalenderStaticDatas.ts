import dateConverter from '@/app/lib/dateConverter';

const current = new Date();
export const today = `${dateConverter(current).year}-${
  dateConverter(current).month
}-${dateConverter(current).date}`;

export const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
