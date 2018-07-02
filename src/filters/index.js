import Vue from 'vue';
import { formatDate, currency } from '../util/formate'


Vue.filter('dateFilter', (val, fmt = 'yyyy-MM-dd') => {
    if (!val) return '-';
    let time = new Date(val);
    return formatDate(time, fmt)
});

Vue.filter('currency', (val, currencys, decimals) => {
    return currency(val, currencys, decimals);
});

Vue.filter('gender', (val) => {
    return {
        "UNKNOWN": "未知",
        "MALE": "先生",
        "FEMALE": "女士",
        "CONFIDENTIALITY": "保密"
    }[val]
});
Vue.filter('userStatusFilter', (val) => {
    return {
        "UNKNOWN": "未知",
        "NORMAL": "正常",
        "CLOSED": "已关闭",
        "FORBIDDEN": "禁用",
    }[val]
});
Vue.filter('stockTransferOrderStatus', val => {
    return {
        WAIT_SHIPMENTS: "待发货",
        WAIT_RECEIVE: "待收货",
        FINISH: "已完成"
    }[val];
});
Vue.filter('stockTransferStatusFilter', val => {
    return {
        WAIT_EXECUTION: "待处理",
        EXECUTION: "处理中",
        FINISH: "已完成",
    }[val];
});
Vue.filter('goodsTypeFilter', val => {
    return {
        SALE: '销售品',
        PRESALE: '预售品',
        PRESELL:'预售品',
        SALE_AND_PRESELL: "销售商品,预售商品"
    }[val]
})
Vue.filter('saleOrderStatus', val => {
    return {
        NEW_ORDER: '新订单',
        SELLER_REJECT: '卖家拒绝',
        BUYER_CANCEL: '买家取消',
        PRE_PAY: '预支付',
        PAID: '已支付',
        PRE_PICK_UP: '待提货(门店自提)',
        PRE_DELIVER: '待发货(邮寄)',
        PRE_ACCEPT: '待收货',
        PRE_RETURN: '预退货',
        RETURNED: '退货成功',
        DISASSEMBLY: '拆解订单',
        COMPLETE: '已完成',
        ACCEPT:'已完成',
        TIMEOUT: 'TIMEOUT',
        EXCEPTION: '异常'
    }[val]
})
Vue.filter('ShippingType', val => {
    return {
        UNKNOWN: '未选择',
        PICK_UP: '门店自提',
        PERSENT: '送人',
        MAIL: '邮寄',
        STORE_SALE: '门店销售'
    }[val]
})
Vue.filter('returnGoodsStatus', val => {
    return {
        "NEW_CREATE": "待审核",
        "SUCCESS": "已通过",
        "ALREADY_MAIL": "已寄出",
        "ALREADY_APPLY_REFUND": "已申请退款",
        "ALREADY_SHIPPING": "已发货",
        "FINISH": "已完成",
        "FAIL": "已拒绝",
    }[val]
})
Vue.filter('returnTypeFilter',val =>{
    return {
        RETURN: "退货",
        EXCHANGE: "换货"
      }[val]
})



Vue.prototype.$dateFilter = Vue.filter('dateFilter');
Vue.prototype.$currency = Vue.filter('currency');
Vue.prototype.$gender = Vue.filter('gender');
Vue.prototype.$userStatusFilter = Vue.filter('userStatusFilter');
Vue.prototype.$stockTransferOrderStatus = Vue.filter('stockTransferOrderStatus');
Vue.prototype.$stockTransferStatusFilter = Vue.filter('stockTransferStatusFilter');
Vue.prototype.$goodsTypeFilter = Vue.filter('goodsTypeFilter');
Vue.prototype.$ShippingType = Vue.filter('ShippingType');
Vue.prototype.$saleOrderStatus = Vue.filter('saleOrderStatus');
Vue.prototype.$returnGoodsStatus = Vue.filter('returnGoodsStatus');