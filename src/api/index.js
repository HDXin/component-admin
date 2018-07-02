import Api from './Api';
import $config from './config';
export function getUser(data) {
    return Api.post('http://dsabc.dev.sudaotech.com/api/portal/auth/login',data);
}
//获取商品的列表
export function getProductListApi(data){ 
    return Api.get('/admin/goods',data);
}
//新增商品
export function createProductApi(data){ 
    return Api.post('admin/goods/',data);
}
export function getAllTreeOfCategory(){
    return Api.get('/admin/categoryTree');
}
export function deleteProductApi(data){
    return Api.delete('/admin/goods/{id}',data);
}
export function getProductApi(data){
    return Api.get('/admin/goods/{id}',data);
}
export function editProductApi(data){
    return Api.put('/admin/goods/{id}',data);
}
export function updateAgencyPercentApi(data){
    return Api.put('/admin/goods/{id}/updateAgencyPercent',data);
}
export let GoodsCategoryApi = new Api('admin/category/','categoryId'); //商品分类增删改查
export let StoreApi = new Api("admin/store/",'storeId'); //门店增删改查
export let orderApi = new Api("admin/saleOrder/",'saleOrderId'); //门店增删改查
export let MallUserApi = new Api("admin/mallUser/",'userId'); //商城用户管理
export let StoreUserApi = new Api("admin/storeUser/",'userId'); //店员管理

export function getProvinceListApi(data) {
    return Api.get('service/geo/list/province/',data);
};
export function getCityListApi(data) {
    return Api.get('service/geo/list/city/',data);
};
export function getCountyListApi(data) {
    return Api.get('service/geo/list/county/',data);
};

export let KeywordApi = new Api('admin/setting/','id');
export let ReviewApi = new Api('admin/review/','id');



export let StockTransferOrderApi = new Api('admin/stockTransferOrder/','id');
export let SwiperApi = new Api('admin/swiper/','id');
export let stockTransferApplyApi = new Api('admin/stockTransferApply/','id');
export function stockTransferApplyMultiApi(data) {
    return Api.post('admin/stockTransferOrder/multi',data);
}
export let AgencyApplyApi = new Api('admin/agencyApply/','agencyApplyId');
export let AgencyInfoApi = new Api('admin/agencyInfo/','userId');
export let AgencyCustomerApi = new Api('admin/agencyCustomer/','userId');
export let goodsRecommendApi = new Api('admin/goodsRecommend/','id');
export let goodsRecommendCreateApi = new Api('admin/goodsRecommend/','goodsId');
export let StoreSkuApi = new Api('admin/storeSku/','id'); //门店商品列表
    
export function ImportGoodsSkuListApi(data) { //门店导入列表
    return Api.get('admin/storeSku/import/query',data);
};
export function ImportGoodsSkuApi(data) {
    return Api.post('admin/storeSku/import',data);
};
export function AddStockApi(data) {  //库存增加
    return Api.put('admin/storeSku/stock/add',data);
};
export function SubStockApi(data) { // 库存减少
    return Api.put('admin/storeSku/stock/sub',data);
};
export let StockTransferRecordApi = new Api('admin/stockTransferRecord/','id');
// export let orderSplice = new Api('saleOrder/{id}/disassembly','id') //订单拆分
export function orderSplice(id,data) {
    return Api.post(`admin/saleOrder/${id}/disassembly`,data);
};
export function confirmSaveGoods(data){
    return Api.put('admin/saleOrder/{id}/accept',data);
}
export let ReturnOrderApi = new Api('admin/returnGoods/','returnGoodsId');
export function ApprovalReturnOrderApi(data){
    return Api.put('admin/returnGoods/{id}/status',data);
}
export function shelvesStatusChange(data){
    return Api.put('admin/goods/{id}/shelves',data);
}

export function KuaidiListApi(data = {}){
    return Api.get('admin/kuaidi/company',data);
}

export function DeliverGoodsApi(data = {}){
    return Api.put('admin/saleOrder/{id}/status',data);
}
export function qrCodeStreamApi(data){
    return Api.post('service/image/qrCodeStream',data);
}
export let refundApi = new Api('admin/refund/','id',{
    changeStatu:{
        url:'{id}/status',
        method: 'put',
    }
}); //门店商品列表

export function stockTransferApi(data){
    return Api.get('admin/store/stockTransfer/{goodsId}/{skuId}',data);
}




export let performanceDetailApi = new Api('admin/performanceDetail/agency','id'); //分销员明细
export let customerListApi = new Api('admin/customer','id');

export let storeSettleApi = new Api('admin/performance','id');//门店结算
export let agencySettleApi = new Api('admin/performance/agency','id');//分销员结算列表

export function storeSettleDetailApi(data){
    return Api.get('admin/performanceDetail/store/detail',data);
}

export let feedbackeApi = new Api('admin/feedback','id');//投诉列表


export let statisticsApi = new Api('admin/statistics/','id',{
    orderSale:{
        url:'orderSale',
        method: 'get',
    },
    goodsSale:{
        url:'goodsSale',
        method: 'get',  
    }
});//投诉列表
export let orderCancelApi = new Api("admin/saleOrder/",'id',{
    cancel:{
        url:'{id}/reject',
        method: 'put', 
    }
}); //门店增删改查
export let articalApi = new Api("admin/article/",'id',{
    cancel:{
        url:'{id}/reject',
        method: 'put', 
    }
}); //门店增删改查