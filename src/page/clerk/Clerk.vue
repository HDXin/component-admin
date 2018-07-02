<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>店员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              class="text-right">
        <el-button type="primary"
                   size="small"
                   @click="$router.push('/clerk/create')">新增店员</el-button>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="名称"
                   v-model="queryParams.fullName"></k-form-item>
      <k-form-item label="手机号"
                   v-model="queryParams.cellphone"></k-form-item>
      <k-form-item label="用户名"
                   v-model="queryParams.userName"></k-form-item>
      <k-form-item label="身份"
                   v-model="queryParams.userType"
                   type="select">
        <el-option value=""
                   label="全部"></el-option>
        <el-option value="SHOP_MANAGER"
                   label="店长"></el-option>
        <el-option value="SHOP_ASSISTANT"
                   label="店员"></el-option>
      </k-form-item>
      <k-form-item label="所属门店" v-model="queryParams.storeName"></k-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search">检索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange" />
  </page>
</template>
<script>
import { StoreUserApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      queryParams: {
        fullName: "",
        cellphone: "",
        userName: "",
        userType: "",
        storeName: ""
      },
      tableData: [],
      total: null,
      columns: [
        {
          label: "ID",
          prop: "userId",
          align:"center",
          width: 80
        },
        {
          label: "姓名",
          prop: "fullName"
        },
        {
          label: "手机号",
          prop: "cellphone"
        },
        {
          label: "用户名",
          prop: "userName"
        },
        {
          label: "身份",
          prop: "userType",
          align:"center",
          width: 100,
          formatter: row =>
            ({
              SHOP_MANAGER: "店长",
              SHOP_ASSISTANT: "店员"
            }[row.userType])
        },
        {
          label: "所属门店",
          prop: "storeName"
        },
          {
          label: "门店编号",
          prop: "storeId"
        },
        {
          label: "状态",
          align: "center",
          width: 100,
          render: (h, { row }) =>
            h("span", null, [this.$userStatusFilter(row.userStatus)])
        },
        {
          label: "操作",
          align:"center",
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini" round
                onClick={() =>
                  this.$router.push({
                    name: "clerk_edit",
                    params: { id: row.userId }
                  })}
              >
                编辑
              </el-button>&nbsp;
              <el-button size="mini" round onClick={() => this.remove(row.userId)}>
                删除
              </el-button>
            </div>
          )
        }
      ]
    };
  },
  methods: {
    getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
      StoreUserApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    },
    remove(id) {
      this.$confirm("确定删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          StoreUserApi.delete({ userId: id })
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
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

