<template>
  <el-menu :default-active="$route.path"
           unique-opened
           mode="vertical"
           background-color="#26344b"
           text-color="#fff"
           router>

    <el-submenu index="/eamil">
      <template slot="title">
        <i class="el-icon-menu"></i>邮件管理
      </template>
      <el-menu-item index="/email/groups">
        <span slot="title">项目列表</span>
      </el-menu-item>
    </el-submenu>

<!--
   <el-submenu index="/order">
      <template slot="title">
        <i class="el-icon-menu"></i>订单管理
      </template>
      <el-menu-item index="/order/sale_order">
        <span slot="title">销售订单</span>
      </el-menu-item>
      <el-menu-item index="/order/return_order">
        <span slot="title">退换货管理</span>
      </el-menu-item>
    </el-submenu> 
    
   <el-submenu index="/product/list">
      <template slot="title">
        <i class="el-icon-menu"></i>商品管理
      </template>
       <el-menu-item index="/product/list">
        <span slot="title">商品列表</span>
      </el-menu-item>
      <el-menu-item index="/goods/goods_category">
        <span slot="title">商品类别管理</span>
      </el-menu-item>
      <el-menu-item index="/comment/comment_audit">
        <span slot="title">评价管理</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="/store">
      <template slot="title">
        <i class="el-icon-menu"></i>门店管理
      </template>
      <el-menu-item index="/store/store_management">
        <span slot="title">门店管理</span>
      </el-menu-item>
      <el-menu-item index="/clerk/cleak_management">
        <span slot="title">店员管理</span>
      </el-menu-item>
       <el-menu-item index="/transfer/transfer_order">
        <span slot="title">调货管理</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="/distributor">
      <template slot="title">
        <i class="el-icon-menu"></i>分销员管理  
      </template>
      <el-menu-item index="/distributor/pending_audit/">
        <span slot="title">待审核分销员</span>
      </el-menu-item>
      <el-menu-item index="/distributor/audited/">
        <span slot="title">已审核分销员</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/settlement">
      <template slot="title">
        <i class="el-icon-menu"></i>结算管理
      </template>
      <el-menu-item index="/settlement/store_settlement">
        <span slot="title">门店结算</span>
      </el-menu-item>
      <el-menu-item index="/settlement/distributor_settlement">
        <span slot="title">分销员结算</span>
      </el-menu-item>
      <el-menu-item index="/settlement/return/moneny">
        <span slot="title">退款管理</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="/">
      <template slot="title">
        <i class="el-icon-menu"></i>广告和推荐
      </template>
      <el-menu-item index="/banner">
        <span slot="title">轮播图</span>
      </el-menu-item>
       <el-menu-item index="/recommond">
        <span slot="title">首页推荐管理</span>
      </el-menu-item>
      <el-menu-item index="/keyword">
        <span slot="title">热门关键词</span>
      </el-menu-item>
    </el-submenu>
     <el-submenu index="/feedback">
       <template slot="title">
         <i class="el-icon-menu"></i>投诉管理
      </template>
     <el-menu-item index="/feedback">
        <span slot="title">投诉列表</span>
      </el-menu-item>
    
     
     </el-submenu>
 
    <el-submenu index="/artical">
      <template slot="title">
        <i class="el-icon-menu"></i>文章管理  
      </template>
      <el-menu-item index="/artical/list">
        <span slot="title">文章列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/statistics/order">
      <template slot="title">
        <i class="el-icon-menu"></i>统计报表  
      </template>
        <el-menu-item index="/statistics/order">
        <span slot="title">订单统计</span>
      </el-menu-item>  
         <el-menu-item index="/statistics/goods">
        <span slot="title">商品销量统计</span>
      </el-menu-item>  
    </el-submenu>
  
    <el-submenu index="/user">
      <template slot="title">
        <i class="el-icon-menu"></i>用户管理  
      </template>
      <el-menu-item index="/user/user_management">
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-submenu>

     --> 
  </el-menu>

</template>
<script>
export default {
  props: {},
  data() {
    return {
      routerPath: this.$route.path
    };
  },
  watch: {
    $route: "getPath"
  },
  methods: {
    getPath() {
      this.routerPath = this.$route.path;
    }
  }
};
</script>

