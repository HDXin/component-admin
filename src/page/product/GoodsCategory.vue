<template>
  <Page>
    <el-row slot="header">
      <el-col :span="20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>商品类别管理</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(title,index) in titleList"
                              :key="title.parentId"
                              @click.native="breadcrumbClick(index,title.parentId)"> {{title.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4"
              class="text-right">
        <el-button type="primary"
                   size="small"
                   @click="showDialog(titleList[titleList.length-1].parentId,'addDialog')">新增</el-button>
      </el-col>
    </el-row>
    <!-- <el-form inline>
      <k-form-item label="类别名称"
                   v-model="queryParams.name" />
      <el-form-item>
        <el-button type="primary"
                   @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form> -->
    <k-table :data="tableData"
             :total="total"
             :currentPage="tableParams.page"
             @current-change="handleCurrentChange"
             :columns="columns" />
    <add-goods-category :parentId="category_id"
                        @on-success="handleSuccess"
                        :visible.sync="addDialog" />
    <edit-goods-category :id="category_id"
                         @on-success="handleSuccess"
                         :visible.sync="editDialog" />
  </Page>
</template>

<script>
import AddGoodsCategory from "@/components/goods/AddGoodsCategory";
import EditGoodsCategory from "@/components/goods/EditGoodsCategory";
import {  GoodsCategoryApi } from "@/api";
export default {
  data() {
    return {
      total: 0,
      category_id: "",
      addDialog: false,
      editDialog: false,
      tableParams: {
        page: 1,
        limit: 10,
        parentId: 0
      },
      queryParams: {
        name: ""
      },
      tableData: [],
      titleList: [{ title: "商品类别", parentId: 0 }],
      columns: [
        {
          label: "ID",
          type: "index",
          align: "center",
          width: 50
        },
        {
          label:'图标',
          width:120,
          align: "center",
          render: (h, {row}) =>{
            return <images src={row.icon} width="40px"></images>
          }
        },
        {
          label: "类别名称",
          render: (h, { row }) => (
            <a href="javascript:void(0)" onClick={() => this.getChildList(row.categoryId, row.name)}>{row.name}</a>
          )
        },
        {
          label: "操作",
          width: 150,
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini" round
                onClick={() => this.showDialog(row.categoryId, "addDialog")}
              >
                新增
              </el-button>&nbsp;
              <el-button
                size="mini" round
                onClick={() => this.showDialog(row.categoryId, "editDialog")}
              >
                编辑
              </el-button>&nbsp;
              <el-button size="mini" round onClick={() => this.remove(row)}>
                删除
              </el-button>
            </div>
          )
        }
      ]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.tableParams.page = val;
      this.handleSuccess();
    },
    showDialog(id, type) {
      this[type] = true;
      this.category_id = id;
    },
    breadcrumbClick(index) {
      this.titleList.splice(index + 1, this.titleList.length - 1);
      this.tableParams.page = 1;
      this.tableParams.parentId = this.titleList[index].parentId;
      this.getList(this.tableParams);
    },
    getChildList(id, name) {
      this.titleList.push({ parentId: id, title: name });
      this.tableParams.page = 1;
      this.tableParams.parentId = id;
      let _params = Object.assign({}, this.tableParams, { parentId: id });
      this.getList(_params);
    },
    search() {
      let params = Object.assign(this.tableParams, this.queryParams);
      this.getList(params);
    },
    // 重置
    reset() {
      this.tableParams = {
        limit: 10,
        page: 1,
        parentId: this.titleList[titleList.length - 1].parentId
      };
      this.queryParams = {
        name: ""
      };
      this.getList(this.tableParams);
    },
    remove(row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          try {
            GoodsCategoryApi
              .delete({ categoryId: row.categoryId })
              .then(data => {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.handleSuccess();
              })
              .catch(err => {
                this.$message({
                  message: err.message,
                  type: "error"
                });
              });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSuccess() {
      let params = Object.assign({}, this.tableParams, {
        parentId: this.titleList[this.titleList.length - 1].parentId
      });
      this.getList(params);
    },
    getList(params) {
      GoodsCategoryApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  },
  mounted() {
    this.getList(this.tableParams);
  },
  components: {
    AddGoodsCategory,
    EditGoodsCategory
  }
};
</script>
<style lang="less" type="text/less">

</style>