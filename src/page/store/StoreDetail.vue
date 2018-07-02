<template>
    <page>
        <el-row slot="header">
            <el-col :span="10">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item to="/store/store_management">门店管理</el-breadcrumb-item>
                    <el-breadcrumb-item>查看</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="14"
                    class="text-right">
                <el-button type="primary"
                           size="small">导出二维码</el-button>
                <el-button type="primary"
                           size="small"
                           @click="$router.push({name:'sale_order',query:{storeName:'上海浦东店'}})">门店订单</el-button> 
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <store-info :model="model"/>
            </el-col>
            <el-col :span="16"
                    class="content">
                <h4 class="text-center">销售商品</h4>
                <k-table :data="tableData"
                         :columns="columns" />
            </el-col>
        </el-row>

    </page>
</template>
<script>
import StoreInfo from "@/components/store/StoreInfo";
import {StoreApi} from '@/api'
export default {
  data() {
    return {
      tableData: [{}],
      columns: [
        {
          label: "商品图片",
          prop: "name"
        },
        {
          label: "商品二维码",
          prop: "name"
        },
        {
          label: "商品名称",
          prop: "name"
        },
        {
          label: "商品类型",
          prop: "name"
        },
        {
          label: "规格／单价／店内库存",
          prop: "name"
        }
      ],
      model:{}
    };
  },
  mounted () {
    this.getInfo();
  },
  methods: {
    getInfo(){
      StoreApi.get({storeId:this.$route.params.id}).then(res =>{
        this.model = res;
      }).catch(err =>{
        this.$message({
          message: err.message,
          type: 'error'
        });
      })
    }
  },
  components: {
    StoreInfo
  }
};
</script>
<style lang="less" scoped>
.content {
  min-height: 83vh;
  border: 1px solid #eee;
  padding: 0 15px;
}
</style>

