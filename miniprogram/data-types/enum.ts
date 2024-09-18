export enum ProductStatus {
    上架,
    下架,
    退货,
}

export enum StoreType {
    加盟店 = 0,
    直营店 = 1,
    代销点 = 2,
}
export enum IndexBannerSource {
    文章 = 0,
    促销活动 = 1,
}

export enum RetailStoreOrderStatus {
   待审核=0, 待配货=1, 已配货=2, 已发货=3, 门店取消=4, 审核未通过=5, 申请售后=6, 门店申请取消=7,
}
export enum Gender {
    男 = 0,
    女 = 1,
    其他 = 2,
}

export enum RetailStoreStatus {
    申请待审核,
    待提交场地租赁合同,
    待审核场地租赁合同,
    待提交营业执照,
    待审核营业执照,
    正常,
    暂停营业,
    已关闭,
    申请被拒绝,
    放弃申请,
}

//* 设备状态 */
export enum RetailStoreOrderAfterSaleType {
    换货 = 0,
    漏发 = 1,
}

export enum RetailStoreSettlementStatus {
    待结算,
    部分结算,
    已结算,
}
export enum RetailStoreOrderAfterSaleStatus {
    待审核 = 0,
    待处理 = 1,
    已完成 = 2,
    门店取消 = 3,
    已拒绝 = 4,
}
export enum RetailStoreSettlementPaymentMethod {
    微信,
    支付宝,
    银行转账,
    现金,
}
