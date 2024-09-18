import dayjs, { Dayjs } from 'dayjs';

type TDate = string | Date | undefined | Dayjs;

/**
 * 将秒格式化为时间
 * @param seconds
 * @returns
 */
const formatTimeBySeconds = (seconds: number | undefined): string => {
    if ((seconds ?? 0) >= 0) {
        const date = dayjs(new Date(seconds! * 1000));
        return date.add(-8, 'h').format('HH:mm:ss');
    }
    return '';
};

const convertToDayjs = (value: TDate): Dayjs | undefined => {
    if (!value) return undefined;

    const val = dayjs(value);
    if (val.isValid()) return val;

    return undefined;
};

const format = (dateTime: TDate, template: string): string | undefined => {
    if (!dateTime) return '';

    const date = convertToDayjs(dateTime);
    return date?.format(template);
};

const formatDate = (dateTime: TDate): string | undefined =>
    format(dateTime, 'YYYY-MM-DD');

const formatDateTime = (dateTime: TDate): string | undefined =>
    format(dateTime, 'YYYY-MM-DD HH:mm');
const formatTime = (dateTime: TDate): string | undefined =>
    format(dateTime, 'HH:mm');

const coventToDate = (val: TDate): Date | undefined => {
    if (!val) return undefined;

    return dayjs(val).toDate();
};

const parseTime = (value: number): number =>
    dayjs().subtract(value, 'day').unix();

export default {
    formatTimeBySeconds,
    format,
    formatDate,
    formatDateTime,
    convertToDayjs,
    coventToDate,
    parseTime,
    formatTime,
};
