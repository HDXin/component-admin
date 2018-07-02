<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item to="/clerk/cleak_management">店员管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.params.id?'编辑':'新增'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="20"
              :offset="1">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="10">
              <k-form-item label="姓名" v-model="model.fullName"></k-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <k-form-item label="手机号"
                           v-model="model.cellphone"></k-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <k-form-item label="登录用户名"
                                     v-model="model.userName"></k-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <k-form-item label="登录密码"
                                     v-model="model.password"></k-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="所属门店">
                          <el-select v-model="model.store"
                                     value-key="storeId">
                            <el-option v-for="item in storeList"
                                       :key="item.storeId"
                                       :value="item"
                                       :label="item.storeName"></el-option>
                          </el-select>

                        </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <k-form-item label="身份"
                                     v-model="model.userType"
                                     type="radio-group">
                          <el-radio label="SHOP_MANAGER">店长</el-radio>
                          <el-radio label="SHOP_ASSISTANT">店员</el-radio>
                        </k-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <k-form-item label="状态"
                                     v-model="model.userStatus"
                                     type="radio-group">
                          <el-radio label="NORMAL">启用</el-radio>
                          <el-radio label="FORBIDDEN">禁用</el-radio>
                        </k-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item>
                          <el-button type="primary"
                                     @click="submit">保存</el-button>
                        </el-form-item>
            </el-col>
          </el-row>
          
        </el-form>
      </el-col>
    </el-row>
  </page>
</template>
<script>
import { StoreUserApi, StoreApi } from "@/api";
export default {
  data() {
    return {
      model: {
        store: null
      },
      storeList: []
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDetail();
    }
    this.getStoreList();
  },
  methods: {
    getStoreList() {
      StoreApi.query({ limit: 999 }).then(res => {
        this.storeList = res.items;
      });
    },
    getDetail() {
      StoreUserApi.get({ userId: this.$route.params.id })
        .then(res => {
          res.store = {
            storeId: res.storeId
          };
          this.model = res;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    submit() {
      let params = Object.assign({}, this.model);
      params.storeId = params.store.storeId;
      params.storeName = params.store.storeName;
      delete params.store;
      if (this.$route.params.id) {
        this.update(params);
      } else {
        this.create(params);
      }
    },
    create(params) {
      StoreUserApi.create(params)
        .then(res => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    update(params) {
      StoreUserApi.update(params)
        .then(res => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$router.go(-1);
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

