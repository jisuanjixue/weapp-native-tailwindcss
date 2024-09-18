import type { IResponseData } from '../data-types/base';
import type { StatisticsData } from '../data-types/statistics';
import request from '../utils/request/request';

const routePrefix = '/Statistics';
const getMonth = (year: number, month: number) =>
    request.get<IResponseData<StatisticsData.IMonth>>(
        `${routePrefix}/month-order-overview?year=${year}&month=${month}`,
    );
const getYear = (year: number) =>
    request.get<IResponseData<StatisticsData.IYear>>(
        `${routePrefix}/year-order-overview?year=${year}`,
    );
const getCurrentMonth = () =>
    request.get<IResponseData<StatisticsData.ICurrentMonth>>(
        `${routePrefix}/current-month-order`,
    );
const getToday = () =>
    request.get<IResponseData<StatisticsData.IToday>>(
        `${routePrefix}/today-order`,
    );
export default { getMonth, getToday, getCurrentMonth, getYear };
