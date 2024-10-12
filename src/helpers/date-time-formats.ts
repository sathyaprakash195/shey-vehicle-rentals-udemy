import dayjs from 'dayjs';

export const getDateTimeFormat = (date: string) => {
    return dayjs(date).format('MMM DD YYYY, hh:mm A');
}