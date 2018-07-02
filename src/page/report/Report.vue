<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item>统计报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="activeName">
            <el-tab-pane label="订单"
                         name="order">
                <OrderReport></OrderReport>
            </el-tab-pane>
            <el-tab-pane label="门店统计"
                         name="store">
                <store-report />
            </el-tab-pane>
            <el-tab-pane label="分销员统计"
                         name="distributor">
                <distributor-report />
            </el-tab-pane>
            <el-tab-pane label="商品销量"
                         name="goods">
                <goods-report />
            </el-tab-pane>
        </el-tabs>
    </page>
</template>

<script>
import DistributorReport from "./DistributorReport";
import GoodsReport from "./GoodsReport";
import OrderReport from "./OrderReport";
import StoreReport from "./StoreReport";
export default {
  data() {
    return {
      activeName: "order"
    };
  },
  components: {
    DistributorReport,
    GoodsReport,
    OrderReport,
    StoreReport
  }
};
</script>

<style>

</style>
