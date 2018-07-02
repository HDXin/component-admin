<template>
  <el-dialog :visible.sync="dialogVisible"
             @open="open"
             title="调货">
    <el-form label-width="150px">
      <el-form-item label="调拨方式">
        <el-radio-group v-model="model.type"
                        size="small">
          <el-radio label="1"
                    border>调入</el-radio>
          <el-radio label="2"
                    border>调出</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="单价">¥ 98.00</el-form-item> -->
      <el-form-item label="当前库存">{{infos.stock}}</el-form-item>
      <el-form-item :label="`${model.type == '1' ? '调入数量' : '调出数量'}`" required>
        <el-input v-model.number="model.quantity"
                  type="number"></el-input>
      </el-form-item>
      <el-form-item :label="`${model.type == '1' ? '发货门店' : '收货门店'}`" required>
        <el-select v-model="model.store"
                   placeholder="请选择门店"
                   value-key="storeId">
          <el-option v-for="store in storeList"
                     :key="store.storeId"
                     :value="store"
                     :label="store.storeName">
                       <span style="float: left">{{ store.storeName }}</span>
                   <span style="float: right; color: #8492a6; font-size: 13px">库存:{{ store.goodsNumber }}</span>
                     </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary"
                 @click="submit">确认调拨</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { StockTransferOrderApi, StoreApi,stockTransferApi } from "@/api";
export default {
  props: ["visible", "infos"],
  data() {
    return {
      model: {
        type: "1",
        store: null,
        quantity: ""
      },
      storeList: [],
      storeInfo: {}
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
    open() {
      this.$nextTick(() => {
        this.getStoreList();
        this.getStoreInfo();
      });
    },
    getStoreInfo() {
  
      StoreApi.get({ storeId: this.infos.storeId }).then(res => {
        this.storeInfo = {
          storeId: res.storeId,
          storeName: res.storeName,
          storeAddress: `${res.provinceName} ${res.cityName} ${res.countyName}`,
          storeTel: res.tel
        };
      });
    },
    getStoreList() {
    
      stockTransferApi({goodsId:this.infos.goodsId,skuId:this.infos.skuId}).then(res=>{
       res = res.map(item => {
          return {
            goodsNumber:item.goodsNumber,
            storeId: item.storeId,
            storeName: item.storeName,
            storeAddress: `${item.provinceName} ${item.cityName} ${item.countyName}`,
            storeTel: item.tel
          };
        });
        this.storeList = res;
    
      })
      // StoreApi.query().then(res => {
        
      // });
    },
    submit() {
      if (!this.model.quantity) {
        return this.$message({
          message: "请输入数量",
          type: "info"
        });
      }
      if (!this.model.store) {
        return this.$message({
          message: "请选择门店",
          type: "info"
        });
      }
      let params = this.formateModel();
      StockTransferOrderApi.create(params)
        .then(res => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.dialogVisible = false;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    formateModel() {
      if (this.model.type == 1) {
        return {
          type: "INPUT",
          toStoreId: this.storeInfo.storeId,
          toStoreName: this.storeInfo.storeName,
          toStoreAddress: this.storeInfo.storeAddress,
          toStoreTel: this.storeInfo.storeTel,
          goodsId: this.infos.goodsId,
          goodsName: this.infos.title,
          skuId: this.infos.skuId,
          subTitle:  this.infos.weightSpec,
          quantity: this.model.quantity,
          fromStoreId: this.model.store.storeId,
          fromStoreName: this.model.store.storeName,
          fromStoreAddress: this.model.store.storeAddress,
          fromStoreTel: this.model.store.storeTel
        };
      } else {
        return {
          type: "OUTPUT",
          fromStoreId: this.storeInfo.storeId,
          fromStoreName: this.storeInfo.storeName,
          fromStoreAddress: this.storeInfo.storeAddress,
          fromStoreTel: this.storeInfo.storeTel,
          goodsId: this.infos.goodsId,
          goodsName: this.infos.title,
          skuId: this.infos.skuId,
          subTitle:  + this.infos.weightSpec,
          quantity: this.model.quantity,
          toStoreId: this.model.store.storeId,
          toStoreName: this.model.store.storeName,
          toStoreAddress: this.model.store.storeAddress,
          toStoreTel: this.model.store.storeTel
        };
      }
    }
  }
};
</script>

