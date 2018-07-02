<template>
  <el-dialog :visible.sync="dialogVisible"
             title="调货">
    <el-form label-width="150px">
      <el-form-item label="当前库存">{{infos.stock}}</el-form-item>
      <el-form-item :label="`${type == 'plus' ? '增加数量' : '减少数量'}`">
        <el-input v-model.number="model.stock"
                  type="number"
                  :min="0"
                  placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary"
                 @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  StoreSkuApi,
  AddStockApi,
  SubStockApi,
  StockTransferRecordApi
} from "@/api";
export default {
  props: ["visible", "infos", "type"],
  data() {
    return {
      model: {
        stock: ""
      }
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(newVal) {
        this.$emit("update:visible", newVal);
      }
    }
  },
  methods: {
    submit() {
      if (!this.model.stock) {
        return this.$message({
          message: "请输入数量",
          type: "info"
        });
      }

      let params = {
        storeId: this.infos.storeId,
        goodsId: this.infos.goodsId,
        skuId: this.infos.skuId,
        stock: this.model.stock
      };
      let recordParamsIn = {
        type: "INCREASE",
        goodsId: this.infos.goodsId,
        skuId: this.infos.skuId,
        quantity: this.model.stock,
        stock: this.infos.stock,
        toStoreId: this.infos.storeId,
      };
      let recordParamsDe = {
        type: "DECREASE",
        goodsId: this.infos.goodsId,
        skuId: this.infos.skuId,
        quantity: this.model.stock,
        stock: this.infos.stock,
        fromStoreId: this.infos.storeId,
      };

      if (this.type == "plus") {
          Promise.all([AddStockApi(params), StockTransferRecordApi.create(recordParamsIn)])
          .then((add, record) => {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.model.stock = "";
            this.$emit("on-success");
          })
          .catch(err => {
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      } else {
        //recordParams.type = 'DECREASE';
        if (this.infos.stock - params.stock < 0) {
          return this.$message({
            message: "减少数量不可小于库存数量",
            type: "info"
          });
        }
        Promise.all([SubStockApi(params),StockTransferRecordApi.create(recordParamsDe)])
          .then((res,record) => {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.model.stock = "";
            this.$emit("on-success");
          })
          .catch(err => {
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      }
    }
  }
};
</script>
