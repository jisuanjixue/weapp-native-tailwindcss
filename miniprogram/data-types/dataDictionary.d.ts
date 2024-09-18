import { IBaseView } from './response';

declare namespace DataDictionaryData {
    interface IItemsView extends IBaseView {
        text: string;
        value: string;
    }
}
