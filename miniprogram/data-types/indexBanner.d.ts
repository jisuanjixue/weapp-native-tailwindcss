import { IBaseView } from './base';
import { IndexBannerSource } from './enum';

declare namespace IndexBannerData {
    interface IList extends IBaseView {
        title: string;
        preview: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
        sourceId: string;
        source: IndexBannerSource;
        sort: 0;
    }
}
