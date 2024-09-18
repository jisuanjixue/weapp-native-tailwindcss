import { DataDictionaryData } from '../data-types/dataDictionary';
import { IResponseListData } from '../data-types/response';
import request from '../utils/request/request';

const routePrefix = '/dataDictionary';

const getLists = (categoryCode: string) =>
    request.get<IResponseListData<DataDictionaryData.IItemsView>>(
        `${routePrefix}/select-list?categoryCode=${categoryCode}`,
    );

export default { getLists };
