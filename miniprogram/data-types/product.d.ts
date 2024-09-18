import { ProductStatus } from './enum';
import { IBaseView } from './response';

declare namespace ProductData {
    interface Values {
        id: string;
        property: string;
        value: string;
    }
    interface Skus {
        id: string;
        product: string;
        values: Values;
        code: string;
        purchasePrice: number;
        retailPrice: number;
        batchStep: number;
        orderPrice: number;
        franchiseePrice: number;
        stockQuantity: number;
        unit: string;
        status: ProductStatus;
    }
    interface SkuProperties {
        id: string;
        category: {
            id: string;
            name: string;
            sort: number;
        };
        name: string;
        enableInChildren: boolean;
        values: Values;
    }

    interface IListRes extends IBaseView {
        id: string;
        category: {
            id: string;
            name: string;
            sort: number;
        };
        brand: {
            id: string;
            name: string;
            code: string;
            category: {
                id: string;
                parentId: string;
                name: string;
                code: string;
            };
        };
        name: string;
        mainImage?: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
        intro: string;
        sort: number;
        status: ProductStatus;
        skus: Skus[];
        skuProperties: SkuProperties[];
        manySku: boolean;
    }

    interface PropertyValues {
        id: string;
        productPropertyName: string;
        productPropertyId: string;
        value: string;
    }

    interface SkusDetail {
        id: string;
        values: [
            {
                id: string;
                value: string;
                propertyName: string;
                propertyId: string;
            },
        ];
        orderPrice: number;
        unit: string;
        shoppingCartAmount: number;
    }
    interface SkuPropertiesDetail {
        propertyName: string;
        propertyId: string;
        values: [
            {
                id: string;
                value: string;
            },
        ];
    }
    interface IDetailRes extends IBaseView {
        id: string;
        categoryName: string;
        categoryId: string;
        brandName: string;
        brandId: string;
        name: string;
        mainImage: string;
        intro: string;
        sort: number;
        status: ProductStatus;
        skus: SkusDetail[];
        skuProperties: SkuPropertiesDetail[];
        manySku: boolean;
        propertyValues: PropertyValues[];
    }

    interface ISaveSkuValues {
        productId: string;
        valueIds: string[];
    }

    interface skuValues {
        id: string;
        property: {
            id: string;
            category: {
                id: string;
                name: string;
                sort: number;
            };
            name: string;
            enableInChildren: true;
            values: string[];
        };
        value: string;
    }

    interface IListByValuesRes extends IBaseView {
        id: string;
        total: number;
        product: {
            category: {
                id: string;
                name: string;
                sort: number;
            };
            brand: {
                id: string;
                name: string;
                code: string;
                category: {
                    id: string;
                    parentId: string;
                    name: string;
                    code: string;
                };
            };
            name: string;
            mainImage: string;
            intro: string;
            sort: number;
            status: ProductStatus;
            skus: string[];
            skuProperties: SkuProperties[];
            manySku: boolean;
        };
        values: skuValues[];
        code: string;
        purchasePrice: number;
        orderGoodPrice: number;
        orderPrice: number;
        stockQuantity: number;
        unit: string;
        status: ProductStatus;
    }
}
