<template>
    <page>
        <el-row slot="header">
            <el-col :span="10">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item to="/store/store_management">门店管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{name:'store_goods',params:{id:$route.params.storeId},query:{storeName:this.$route.query.storeName}}">商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item>调货记录</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <!-- <el-form inline>
            <k-form-item label="时间"
                         type="date-picker"></k-form-item>
            <k-form-item label="至"
                         type="date-picker"></k-form-item>
            <k-form-item label="接收门店"></k-form-item>
            <k-form-item label="接收状态"
                         type="select"></k-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form> -->
        <k-table :data="tableData"
                 :total="total"
                 @current-change="handleCurrentChange"
                 :columns="columns" />
    </page>
</template>
<script>
import { StockTransferRecordApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      columns: [
        {
          label: "时间",
          prop: "createTime",
          formatter: row => {
            return this.$dateFilter(row.createTime,'yyyy-MM-dd hh:mm:ss');
          }
        },
        {
          label: "类型",
          prop: "type",
          formatter: row => {
            return {
              INPUT: "调入",
              OUTPUT: "调出",
              DECREASE: "减少",
              INCREASE: "增加"
            }[row.type];
          }
        },
        {
          label: "操作人",
          prop: "createUserName"
        },
        {
          label: "调拨来往",
          //   prop: "name"
          render: (h, { row }) => {
            if (row.type =="DECREASE" || row.type == "INCREASE"){
              return h("span", null, [
                <span style='color:#ccc;'>本店库存调整</span>
              ]);
            } else {
              return h("span", null, [
                row.fromStoreName + "-" + row.toStoreName
              ]);
            }
          }
        },
        {
          label: "操作前库存",
          prop: "stock"
        },
        {
          label: "调整量",
          prop: "quantity"
        }
      ]
    };
  },
  methods: {
    getList(params = Object.assign({}, this.tableParams)) {
      StockTransferRecordApi.query(
        Object.assign(
          {
            storeId: this.$route.params.storeId,
            skuId: this.$route.params.skuId
          },
          params
        )
      ).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>


