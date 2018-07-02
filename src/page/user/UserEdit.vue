<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item to="/user/user_management">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="150px">
            <el-row>
                <el-col :span="10"
                        :offset="1">
                    <k-form-item label="昵称"
                                 v-model="model.fullName"></k-form-item>
                    <k-form-item label="身份证"
                                 v-model="model.idcard"></k-form-item>
                    <k-form-item label="手机号"
                                 v-model="model.cellphone"></k-form-item>
                    <k-form-item label="性别"
                                 v-model="model.gender"
                                 type="radio-group">
                        <el-radio label="MALE">先生</el-radio>
                        <el-radio label="FEMALE">女士</el-radio>
                        <el-radio label="CONFIDENTIALITY">保密</el-radio>
                    </k-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="update">确定</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </page>
</template>
<script>
import { MallUserApi } from "@/api";
export default {
  data() {
    return {
      model: {}
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      MallUserApi.get({ userId: this.$route.params.id })
        .then(res => {
          this.model = res;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    update() {
      MallUserApi.update(this.model)
        .then(res => {
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
