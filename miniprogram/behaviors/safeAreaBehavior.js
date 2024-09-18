import utils from '../utils/util';
import { checkIPhoneX, getSystemInfo } from './checkIPhoneX';

const defaultSafeArea = {
    top: false,
    bottom: false,
};

const setSafeArea = (params) => {
    if (utils.isType(params, 'boolean')) {
        return Object.assign({}, defaultSafeArea, {
            top: params,
            bottom: params,
        });
    } else if (params !== null && utils.isType(params, 'object')) {
        return Object.assign({}, defaultSafeArea);
    } else if (utils.isType(params, 'string')) {
        return Object.assign({}, defaultSafeArea, {
            [params]: true,
        });
    }
    return defaultSafeArea;
};

export default Behavior({
    properties: {
        safeArea: {
            type: [Boolean, String, Object],
            optionalTypes: [Boolean, String, Object],
            value: false,
        },
    },
    observers: {
        safeArea(newVal) {
            this.setData({ safeAreaConfig: setSafeArea(newVal) });
        },
    },
    definitionFilter(defFields) {
        const { statusBarHeight } = getSystemInfo() || {};
        const isIPhoneX = checkIPhoneX();

        Object.assign((defFields.data = defFields.data || {}), {
            safeAreaConfig: defaultSafeArea,
            statusBarHeight,
            isIPhoneX,
        });
    },
});
