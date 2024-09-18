import UserData from '../data-types/user';
import customerSvc from '../services/customerSvc';
// import tokenUtils from '../utils/tokenUtils';
import { action, observable } from 'mobx-miniprogram';

type TUser = UserData.ICurrentInfo;

export interface ICurrentUserStore {
    data: TUser | undefined;
    loading: boolean | undefined;
    getUser: () => Promise<void>;
}

export const user = observable({
    // 数据字段
    data: {} as UserData.ICurrentInfo | undefined,
    loading: false as boolean | undefined,

    // actions
    getUser: action(async function (this: ICurrentUserStore) {
        this.loading = true;
        const res = await customerSvc.getCurrentUser();
        this.data = {
            ...res.data,
            shortAddress: `${res.data?.address?.street || ''}${res.data?.address?.detail || ''}`,
            addressText: `${res.data?.address.city || ''}${res.data?.address?.district || ''}${res.data?.address?.street || ''}${res.data?.address?.detail || ''}`,
        };
        this.loading = false;
    }),
});
