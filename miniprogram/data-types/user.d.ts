import { IBaseView } from './base';
import { RetailStoreStatus, StoreType } from './enum';

declare namespace UserData {
    interface ICurrentInfo extends IBaseView {
        name: string;
        shortName: string;
        shortAddress: string;
        address: {
            province: string;
            provinceCode: string;
            city: string;
            cityCode: string;
            district: string;
            districtCode: string;
            street: string;
            streetCode: string;
            detail: string;
            longitude: number;
            latitude: number;
        };
        manager: string;
        phone: string;
        phoneHidden: string;
        openDate: Date;
        sinceOpen: {
            year: number;
            day: number;
        };
        departmentName: string;
        departmentId: string;
        type: StoreType;
        addressText?: string;
    }

    interface IUpdateRequest extends IBaseView {
        name: string;
        phoneNumber: string;
        departmentId: string;
        address: string;
    }
    interface IPhoneRequest {
        phone: string;
        smsCode: string;
    }
    interface IBindByPhoneRequest {
        iv: string;
        encryptedData: string;
        code: string;
        confirm: boolean;
    }
    interface IProfileRequest {
        name: string;
        shortName: string;
        address: {
            province: string;
            provinceCode: string;
            city: string;
            cityCode: string;
            district: string;
            districtCode: string;
            street: string;
            streetCode: string;
            detail: string;
            longitude: number;
            latitude: number;
        };
        openDate: Date;
        manager: string;
    }
    interface IProfileRes extends IBaseView {
        name: string;
        shortName: string;
        departmentId: string;
        type: StoreType;
        categoryId: string;
        categoryName: string;
        address: {
            province: string;
            provinceCode: string;
            city: string;
            cityCode: string;
            district: string;
            districtCode: string;
            street: string;
            streetCode: string;
            detail: string;
            longitude: number;
            latitude: number;
        };
        openDate: Date;
        manager: string;
    }
    interface ISave {
        address: {
            province: string;
            provinceCode: string;
            city: string;
            cityCode: string;
            district: string;
            districtCode: string;
            street: string;
            streetCode: string;
            detail: string;
            longitude: number;
            latitude: number;
        };
        manager: string;
        phone: string;
        weixinCode: string;
        applicationAttachmentPosition: {
            center: string;
            left: string;
            right: string;
        };
        applicationAttachmentIds: string[];
        leaseAttachmentIds: string[];
        licenseAttachmentIds: string[];
    }

    interface IApplicationAttachments {
        id: string;
        fileName: string;
        fileExtension: string;
        fileUrl: string;
    }
    interface TDetail extends IBaseView {
        address: {
            province: string;
            provinceCode: string;
            city: string;
            cityCode: string;
            district: string;
            districtCode: string;
            street: string;
            streetCode: string;
            detail: string;
            longitude: number;
            latitude: number;
        };
        status: RetailStoreStatus;
        manager: string;
        phone: string;
        weixinCode: string;
        managerWeixinOpenId: string;
        applicationAttachmentIds: string[];
        applicationAttachmentPosition: {
            center: string;
            left: string;
            right: string;
        };
        leaseAttachmentIds: string[];
        licenseAttachmentIds: string[];
        applicationAttachments: IApplicationAttachments[];
        leaseAttachments: IApplicationAttachments[];
        licenseAttachments: IApplicationAttachments[];
        message: string;
    }

    interface IToken {
        accessToken?: string;
        refreshToken?: {
            username: string;
            tokenString: string;
            expireAt: Date;
        };
    }
}
export default UserData;
