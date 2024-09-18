import apiConfig from './apiConfig';
import host from './apiConfig';
import { TRequestInterceptor } from './core';

const requestUrlInterceptor: TRequestInterceptor = (url, options) => {
    return {
        url: url.includes(host.api.baseUrl)
            ? `${url}`
            : `${apiConfig.api.baseUrl}${url}`,
        options,
    };
};

export default requestUrlInterceptor;
