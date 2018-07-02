<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item>待审核分销员</el-breadcrumb-item>
      <el-breadcrumb-item>审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="20"
              :offset="1">
        <el-form label-width="150px">
          <el-form-item label="姓名">{{model.fullName}}</el-form-item>
          <el-form-item label="手机号">{{model.cellphone}}</el-form-item>
          <el-form-item label="身份证号码">{{model.idcard}}</el-form-item>
          <el-form-item label="人脸识别结果">xxx</el-form-item>
          <el-form-item label="身份证正面照"><images :src="model.idcardFront"></images></el-form-item>
          <el-form-item label="身份证反面照"><images :src="model.idcardBack"></images></el-form-item>
          <el-form-item label="分销资格">
            <el-radio-group v-model="model.agencyLevel">
              <el-radio label="SALE">消费品</el-radio>
              <el-radio label="PRESELL">预售品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="audit('SUCCESS')">审批通过</el-button>
            <el-button type="danger"
                       @click="audit('FAIL')">审批拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page>
</template>
<script>
import { AgencyApplyApi } from "@/api";
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
      AgencyApplyApi.get({ agencyApplyId: this.$route.params.id })
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
    audit(type) {
      
      this.$confirm("确定执行该操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          AgencyApplyApi.update({
            agencyApplyId: this.$route.params.id,
            status: type
          })
            .then(res => {
              this.$router.go(-1);
              this.$message({
                message: "成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                message: err.message,
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "取消",
            type: "info"
          });
        });
    }
  }
};
</script>

