import type { DataDictionaryCategoryData } from '../data-types/dataDictionaryCategory';
import dataDictionaryCategorySvc from '../services/dataDictionaryCategorySvc';
import { action, observable } from 'mobx-miniprogram';

type TDataDictionaryCategory = DataDictionaryCategoryData.IItemsView;

export interface IDataDictionaryCategoryStore {
    data: TDataDictionaryCategory[] | undefined;
    loading: boolean | undefined;
    getDictionaryCategory: () => Promise<void>;
}

export const dictionaryCategory = observable({
    // 数据字段
    data: [] as DataDictionaryCategoryData.IItemsView[] | undefined,
    loading: false as boolean | undefined,

    // actions
    getDictionaryCategory: action(async function (
        this: IDataDictionaryCategoryStore,
    ) {
        this.loading = true;
        const res = await dataDictionaryCategorySvc.getLists();
        this.data = res.data;
        this.loading = false;
    }),
});
