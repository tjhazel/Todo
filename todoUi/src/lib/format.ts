import dayjs from 'dayjs';

type GenericDate = Date
   | string
   | number
   | dayjs.Dayjs;

export const formatDateLong = (date: GenericDate): string => {
   if (!date)
      return "";

   return dayjs(date).format("MM/DD/YYYY HH:mm A");
}

