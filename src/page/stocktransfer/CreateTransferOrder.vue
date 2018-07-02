<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item to="/transfer/transfer_order">调货单</el-breadcrumb-item>
            <el-breadcrumb-item>新增调货单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-col :span="20"
                    :offset="1">
                <el-form :model="model"
                         :rules="rules"
                         ref="form"
                         label-width="180px">
                    <el-form-item label="商品名称"
                                  prop="goods">
                        <el-select v-model="model.goods"
                                   filterable
                                   remote
                                   reserve-keyword
                                   placeholder="请输入关键词"
                                   :remote-method="remoteMethod"
                                   @change="getSkuList"
                                   value-key="goodsId"
                                   :loading="loading">
                            <el-option v-for="goods in goodsList"
                                       :label="goods.goodsName"
                                       :value="goods"
                                       :key="goods.goodsId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品规格"
                                  prop="sku">
                        <el-select v-model="model.sku"
                                   value-key="skuId">
                            <el-option v-for="sku in skuList"
                                       :label="sku.subTitle"
                                       :value="sku"
                                       :key="sku.goodsSkuId"></el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="发货方"
                                  prop="fromStore">
                        <el-select v-model="model.fromStore"
                                   filterable
                                   remote
                                   reserve-keyword
                                   placeholder="请输入关键词"
                                   :remote-method="getStoreList"
                                   value-key="formStoreId"
                                   @change="getStoreName($event)"
                                   :loading="loading">
                            <el-option :value="{formStoreName:null,formStoreId:null}"
                                       label="平台"></el-option>
                            <el-option v-for="store in fromStoreList"
                                       :label="store.formStoreName"
                                       :value="store"
                                       :key="store.formStoreId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货方"
                                  prop="toStore">
                        <el-select v-model="model.toStore"
                                   filterable
                                   remote
                                   reserve-keyword
                                   placeholder="请输入关键词"
                                   :remote-method="getToStoreList"
                                   value-key="toStoreId"
                                   :loading="loading">
                            <el-option v-for="store in toStoreList"
                                       :label="store.toStoreName"
                                       :value="store"
                                       :key="store.toStoreId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调货数量"
                                  prop="quantity">
                        <el-input v-model.number="model.quantity"
                                  type="number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   :loading="loading"
                                   @click="submit">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </page>
</template>
<script>
import {
  getProductListApi,
  StockTransferOrderApi,
  getProductApi,
  StoreApi
} from "@/api";
export default {
  data() {
    return {
      loading: false,
      fromStore: {},
      model: {
        quantity: "",
        type: "OPS",
        sku: {},
        fromStore: {},
        toStore: {},
        goods: {}
      },
      rules: {
        goods: [
          {
            required: true,
            message: "请选择商品",
            trigger: "change",
            type: "object"
          }
        ],
        sku: [
          {
            required: true,
            message: "请选择sku",
            trigger: "change",
            type: "object"
          }
        ],
        fromStore: [
          {
            required: true,
            message: "请选择发货方",
            trigger: "change",
            type: "object"
          }
        ],
        toStore: [
          {
            required: true,
            message: "请选择收货发",
            trigger: "change",
            type: "object"
          }
        ],
        quantity: [
          {
            required: true,
            message: "请输入调货数量",
            trigger: "blur",
            type: "number"
          }
        ]
      },
      goodsList: [],
      skuList: [],
      fromStoreList: [],
      toStoreList: []
    };
  },
  methods: {
    remoteMethod(query) {
      if (!query) return (this.goodsList = []);
      this.loading = true;
      getProductListApi({ limit: 5, title: query })
        .then(res => {
          this.loading = false;
          res.items = res.items.map(item => {
            return { goodsName: item.title, goodsId: item.goodsId };
          });
          this.goodsList = res.items;
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    getSkuList(goods) {
      getProductApi({ id: goods.goodsId }).then(res => {
        res.skus = res.skus.map(item => {
          return {
            skuId: item.goodsSkuId,
            subTitle: `${item.attrs[0].attrLabel}/${item.attrs[0].attrValue}`
          };
        });
        this.skuList = res.skus;
      });
    },
    getToStoreList(query) {
      if (!this.model.goods.goodsName) return;
      StoreApi.query({
        storeName: query,
        goodsTitle: this.model.goods.goodsName
      }).then(res => {
        res.items = res.items.map(item => {
          return {
            toStoreId: item.storeId,
            toStoreName: item.storeName,
            toStoreAddress: `${item.provinceName} ${item.cityName} ${item.countyName}`,
            toStoreTel: item.tel
          };
        });
        this.toStoreList = res.items;
      });
    },
    getStoreList(query) {
      if (!this.model.goods.goodsName) return;
      StoreApi.query({
        storeName: query,
        goodsTitle: this.model.goods.goodsName
      }).then(res => {
        res.items = res.items.map(item => {
          return {
            formStoreId: item.storeId,
            formStoreName: item.storeName,
            formStoreAddress: `${item.provinceName} ${item.cityName} ${item.countyName}`,
            fromStoreTel: item.tel
          };
        });
        this.fromStoreList = res.items;
      });
    },
    getStoreName() {},
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.loading = true;
        let params = {
          ...this.model.sku,
          ...this.model.goods,
          ...this.model.fromStore,
          ...this.model.toStore,
          quantity: this.model.quantity
        };

        StockTransferOrderApi.create(params)
          .then(res => {
            this.loading = false;
            this.$message({
              message: "成功",
              type: "success"
            });
            this.$router.replace("/transfer/transfer_order");
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      });
    }
  }
};
</script>

