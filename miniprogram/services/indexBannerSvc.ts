import type { IResponseListData } from '../data-types/base';
import type { IndexBannerData } from '../data-types/indexBanner';
import request from '../utils/request/request';

const routePrefix = '/index-banner';

const getList = () =>
    request.get<IResponseListData<IndexBannerData.IList>>(
        `${routePrefix}/list`,
    );

export default { getList };
