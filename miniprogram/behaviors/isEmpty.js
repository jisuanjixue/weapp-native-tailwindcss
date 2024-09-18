/**
 * Checks if a value is empty.
 */
import utils from '../utils/util';

function isEmpty(value) {
    if (Array.isArray(value)) {
        return value.length === 0;
    } else if (utils.isType(value, 'object')) {
        if (value) {
            for (const _ in value) {
                return false;
            }
        }
        return true;
    } else {
        return !value;
    }
}

export default isEmpty;
