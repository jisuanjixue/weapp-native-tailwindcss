import { IBaseView } from './base';

declare namespace SystemOptionData {
    interface IAttachmentSample extends IBaseView {
        center: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
        left: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
        right: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
    }
}
export default SystemOptionData;
