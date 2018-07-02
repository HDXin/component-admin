<template>
  <div>
    <!-- <el-form inline
                 label-width="120px">
            <el-form-item label="申请门店">某某某门店</el-form-item>
            <el-form-item label="商品／克重">某某某商品／35</el-form-item>
            <el-form-item label="当前库存">22</el-form-item>
            <el-form-item label="调出数量">22</el-form-item>
        </el-form> -->
    <k-table :data="tableData"
             @selection-change="handleSelection"
             :columns="columns"
             @current-change="handleCurrentChange"
             :total="total"></k-table>
    <div class="dialog-footer">
      <el-button type="primary"
                 @click="submit">发起调货</el-button>
      <el-button type="primary" @click='$emit("close")'>取消</el-button>
    </div>
  </div>
</template>
<script>
import { StoreApi, stockTransferApplyMultiApi } from "@/api";
export default {
  props: ["applyInfo"],
  data() {
    return {
      tableData: [],
      tableParams: { limit: 10, page: 1 },
      total: null,
      selects: [],
      columns: [
        {
          type: "selection",
          width: 50
        },
        {
          label: "门店名称",
          prop: "storeName"
        },
        {
          label: "门店地址",
          render: (h, { row }) => {
            return h("div", null, [
              `${row.provinceName ? row.provinceName : ""} ${row.cityName
                ? row.cityName
                : ""} ${row.countyName ? row.countyName : ""}`
            ]);
          }
        },
        {
          label: "距离",
          prop: "name"
        },
        {
          label: "库存数量",
          prop: "name"
        },
        {
          label: "调拨数量",
          render: (h, { row }) =>
            h("el-input", {
              props: {
                value: row.num,
                type: "number"
              },
              on: {
                input: val => (row.quantity = val)
              }
            })
        }
      ]
    };
  },
  methods: {
    handleSelection(selects) {
      this.selects = selects;
    },
    getList() {
      this.tableData = [];
      StoreApi.query(this.tableParams).then(res => {
        res.items = res.items.map(item => {
          return { quantity: "", ...item };
        });
        this.tableData = res.items;
        this.total = res.total;
      });
    },
    handleCurrentChange(val) {
      this.tableParams.page = val;
      this.getList();
    },
    submit() {
      if (!this.selects.length) {
        return this.$message({
          message: "请选择调货门店",
          type: "info"
        });
      }
      let params = this.selects.map(item => {
        return {
          type: "OPS",
          fromStoreId: item.storeId,
          fromStoreName: item.storeName,
          fromStoreAddress: `${item.provinceName
            ? item.provinceName
            : ""} ${item.cityName ? item.cityName : ""} ${item.countyName
            ? item.countyName
            : ""}`,
          fromStoreTel: item.tel,
          toStoreId: this.applyInfo.storeId,
          toStoreName: this.applyInfo.storeName,
          toStoreAddress: this.applyInfo.toStoreAddress,
          toStoreTel: this.applyInfo.toStoreTel,
          goodsId: this.applyInfo.goodsId,
          goodsName: this.applyInfo.goodsName,
          skuId: this.applyInfo.skuId,
          subTitle: this.applyInfo.subTitle,
          quantity: item.quantity,
          stockTransferId: this.applyInfo.id
        };
      });
      stockTransferApplyMultiApi(params)
        .then(res => {
          this.$message({
            message: '成功',
            type: 'success'
          });
          this.$emit("close",true);
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
<style>
.dialog-footer {
  text-align: right;
  padding-top: 20px;
}
</style>


