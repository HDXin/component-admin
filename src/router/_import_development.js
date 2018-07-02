import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

Vue.use(Router)

 let router = new Router({
  routes: [

    {
      path: '/',
      component: () => import('@/components/layout/Layout'),
      redirect: '/order/sale_order',
      children:[
      // {
      //   path: '/banner',
      //   name: 'banner',
      //   component: () => import('@/page/advertisement/Banner'),
      // },
      // {
      //   path:'/transfer/transfer_on',
      //   name:'transfer',
      //   component: () => import('@/page/stocktransfer/StocktransferOn'),
      // },{
      //   path:'/transfer/transfer_order',
      //   name:'transfer_order',
      //   component: () => import('@/page/stocktransfer/TransferOrder'),
      // },{
      //   path:'/transfer/transfer_order/detail/:id',
      //   name:'transfer_order_detail',
      //   component: () => import('@/page/stocktransfer/TransferOrderDetail'),
      // },
      {
        path:'/email/groups',
        name:'email',
        component: () => import('@/page/email/groups/groups'),
      },{
        path:'/email/groups/email_template',
        name:'email',
        component: () => import('@/page/email/groups/emailTemplate'),
      },
      // {
      //   path:'/order/sale_order',
      //   name:'sale_order',
      //   component: () => import('@/page/order/saleOrder/SaleOrder'),
      // },{
      //   path:'/order/sale_order_detail/:id',
      //   name:'sale_order_detail',
      //   component: () => import('@/page/order/saleOrder/SaleOrderDetail'),
      // },
      // {
      //   path:'/order/return_order',
      //   name:'return_order',
      //   component: () => import('@/page/order/returnOrder/ReturnOrder'),
      // },{
      //   path:'/order/return_order_detail/:id',
      //   name:'return_order_detail',
      //   component: () => import('@/page/order/returnOrder/ReturnOrderDetail'),
      // },{
      //   path:'/settlement/store_settlement',
      //   name:'store_settlement',
      //   component: () => import('@/page/settlement/store/StoreSettlement'),
      // },{
      //   path:'/settlement/store_settlement/details/:id',
      //   name:'store_settlement_details',
      //   component: () => import('@/page/settlement/store/SettlementDetails'),
      // },{
      //   path:'/settlement/distributor_settlement/details/:id',
      //   name:'distributor_settlement_details',
      //   component: () => import('@/page/settlement/distributor/SettlementDetails'),
      // },{
      //   path:'/settlement/distributor_settlement',
      //   name:'distributor_settlement',
      //   component: () => import('@/page/settlement/distributor/DistributorSettlement'),
      // },
      // {
      //   path:'/product/list',
      //   name:'商品列表',
      //   component: () => import('@/page/product/ProductList'),
      
      // },{
      //   path:'/store/store_management',
      //   name:'store_management',
      //   component: () => import('@/page/store/StoreManagement'),
      // },{
      //   path:'/store/store_management/create',
      //   name:'store_management_create',
      //   component: () => import('@/page/store/StoreEdit'),
      // },{
      //   path:'/store/store_management/edit/:id',
      //   name:'store_management_edit',
      //   component: () => import('@/page/store/StoreEdit'),
      // },{
      //   path:'/store/store_management/detail/:id',
      //   name:'store_management_detail',
      //   component: () => import('@/page/store/StoreDetail'),
      // },
      // {
      //   path:'/product/create',
      //   name:'商品新增',
      //   component: () => import('@/page/product/ProductCreate'),
      
      // },
      // {
      //   path:'/store/store_goods/:id',
      //   name:'store_goods',
      //   component: () => import('@/page/store/StoreGoods'),
      // },{
      //   path:'/store/store_goods/select_goods/:id',
      //   name:'store_goods_select',
      //   component: () => import('@/page/store/SelectGoods'),
      // },{
      //   path:'/store/store_goods/transfer_log/:storeId/:skuId',
      //   name:'store_goods_transfer_log',
      //   component: () => import('@/page/store/TransferLog'),
      // },{
      //   path:'/goods/goods_category',
      //   name:'goods_category',
      //   component: () => import('@/page/product/GoodsCategory')
      // },{
      //   path:'/comment/comment_audit',
      //   name:'comment_audit',
      //   component: () => import('@/page/comment/CommentAudit')
      // },{
      //   path:'/clerk/cleak_management',
      //   name:'cleak_management',
      //   component: () => import('@/page/clerk/Clerk')
      // },{
      //   path:'/clerk/create',
      //   name:'clerk_create',
      //   component: () => import('@/page/clerk/EditClerk')
      // },{
      //   path:'/clerk/edit/:id',
      //   name:'clerk_edit',
      //   component: () => import('@/page/clerk/EditClerk')
      // },{
      //   path:'/distributor/pending_audit',
      //   name:'distributor_pending_audit',
      //   component: () => import('@/page/distributor/pendingAudit/PendingAudit')
      // },{
      //   path:'/distributor/pending_audit_info/:id',
      //   name:'distributor_pending_audit_info',
      //   component: () => import('@/page/distributor/pendingAudit/AuditInfo')
      // },{
      //   path:'/distributor/audited',
      //   name:'distributor_audited',
      //   component: () => import('@/page/distributor/audited/AuditedDistributor')
      // },{
      //   path:'/distributor/audited_info/:id',
      //   name:'distributor_audited_info',
      //   component: () => import('@/page/distributor/audited/AuditedInfo')
      // },{
      //   path:'/user/user_management',
      //   name:'user_management',
      //   component: () => import('@/page/user/UserList')
      // },{
      //   path:'/user/user_management/:id',
      //   name:'user_management_edit',
      //   component: () => import('@/page/user/UserEdit')
      // },{
      //   path:'/report',
      //   name:'report',
      //   component: () => import('@/page/report/Report')
      // },{
      //   path:'/product/edit/:id',
      //   name:'商品编辑',
      //   component: () => import('@/page/product/ProductEdit')
      // },{
      //   path: '/keyword',
      //   name: 'keyword',
      //   component: () => import('@/page/advertisement/Keyword')
      // },
      // {
      //   path: '/ad/create',
      //   name: '广告新增',
      //   component: () => import('@/page/advertisement/BannerCreate.vue')
      // },
      // {
      //   path: '/ad/edit/:id',
      //   name: '广告编辑',
      //   component: () => import('@/page/advertisement/BannerEdit.vue')
      // },{
      //   path: '/transfer/create_transfer_order',
      //   name: 'create_transfer_order',
      //   component: () => import('@/page/stocktransfer/CreateTransferOrder')
      // },
      // {
      //   path: '/recommond',
      //   name: '推荐',
      //   component: () => import('@/page/advertisement/Recommond.vue')
      // },
      // {
      //   path: '/recommond/detail',
      //   name: '推荐详情',
      //   component: () => import('@/page/advertisement/RecommondDetail.vue')
      // },
      // {
      //   path: '/recommond/create',
      //   name: '推荐新增',
      //   component: () => import('@/page/advertisement/RecommondCreate.vue')
      // },
      // {
      //   path: '/settlement/return/moneny',
      //   name: '退款管理', 
      //   component: () => import('@/page/returned/ReturnMoneyList.vue')
      // },
      // {
      //   path: '/feedback',
      //   name: '投诉管理', 
      //   component: () => import('@/page/feedback/FeedbackList.vue')
      // },
      // {
      //   path: '/statistics/order',
      //   name: '统计报表订单', 
      //   component: () => import('@/page/statistics/OderList.vue')
      // },
      // {
      //   path: '/statistics/goods',
      //   name: '统计报表商品', 
      //   component: () => import('@/page/statistics/GoodsSale.vue')
      // },
      // {
      //   path: '/product/charge',
      //   name: '佣金设置', 
      //   component: () => import('@/page/product/SetCharge.vue')
      // },
      // {
      //   path: '/artical/list',
      //   name: '文章管理', 
      //   component: () => import('@/page/article/ArticleList')
      // },
      // {
      //   path: '/artical/detial/:id',
      //   name: '编辑文章', 
      //   component: () => import('@/page/article/ArticleCreat')
      //   // component: () => import('@/page/article/ArticleEdit')
      // }, 
      // {
      //   path: '/artical/create',
      //   name: '创建文章', 
      //   component: () => import('@/page/article/ArticleCreat')
      // } 
           
    ]
      
    }
  ]
})

//判断是否登录，没有登陆则跳转到登录页面
router.beforeEach((to, from, next) => {
  NProgress.start();
   next()
  //  $("#page-title").text(SiteLogic.pageTitle(to.meta.title));
   if (to.name === 'login') {
       next();
   } else {
      //  var profile  = UserLogic.getProfile()
      //  if (!profile) {
      //      next({
      //          path: '/login',
      //          query: {
      //              back: to.fullPath
      //          }
      //      });
      //  } else {
           next();
      //  }
   }
});
router.afterEach(() => {
   NProgress.done(); // 结束Progress
});

export default router
