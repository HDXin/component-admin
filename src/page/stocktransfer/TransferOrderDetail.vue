<template>
    <Page>
        <el-row slot="header">
            <el-col :span="10">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item to="/transfer/transfer_order">调货单</el-breadcrumb-item>
                    <el-breadcrumb-item>查看详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="14"
                    style="text-align:right">
                <el-button type="primary"
                           size="small" @click='$router.go(-1)'>返回</el-button>
            </el-col>
        </el-row>
        
        <h3>商品信息</h3>
        <el-row class="grid-table-border">
            <el-form label-width="120px">
                <el-col :span="6">
                    <el-form-item label="商品">{{model.goodsName}}</el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="规格">{{model.subTitle}}</el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="数量">{{model.quantity}}</el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="状态">{{model.stockTransferOrderStatus | stockTransferOrderStatus}}</el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <h3>发货门店</h3>
        <el-row v-if="model.fromStoreName" class="grid-table-border">
            <el-form label-width="120px">
                
                <el-col :span="6">
                    <el-form-item label="门店名称">{{model.fromStoreName}}</el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="门店地址">{{model.fromStoreName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式">{{model.fromStoreName}}</el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="时间">{{model.fromStoreTime|dateFilter}}</el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <div v-else>
            <label>发货方：</label>
            <label>平台</label>
        </div>

        <h3>收货门店</h3>
        <el-row v-if="model.fromStoreName" class="grid-table-border">
            <el-form label-width="120px">
                
                <el-col :span="6">
                    <el-form-item label="门店名称">{{model.toStoreName}}</el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="门店地址">{{model.toStoreAddress}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式">{{model.toStoreTel}}</el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="时间">{{model.toStoreTime|dateFilter}}</el-form-item>
                </el-col>
            </el-form>
        </el-row>

    </Page>
</template>
<script>
import { StockTransferOrderApi } from "@/api";
export default {
  data() {
    return {
      data: [],
      model: {}
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      StockTransferOrderApi.get({ id: this.$route.params.id })
        .then(res => {
          console.log(res);
          this.model = res;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    }
  }
};
</script>
<style type="text/css">
    h3 {
        font-size: 16px;
        text-indent: 1em;
    }
</style>
