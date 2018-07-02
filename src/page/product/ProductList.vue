<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="19">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="2" style="text-align:right;">
                <el-button 
                           @click="$router.push({name:'商品新增',params:{}})"
                           type="primary">新增</el-button>
            </el-col>
              <el-col :span="2" style="text-align:right;">
                <el-button 
                           @click="$router.push({name:'佣金设置',params:{}})"
                           type="primary">佣金设置</el-button>
            </el-col>
            
        </el-row>
        <el-form class="search-bar" :model="queryParams"
                 :inline="true">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-input placeholder="请输入内容" v-model="queryParams.title">
                <template slot="prepend">商品名称</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="请输入内容" v-model="queryParams.tag">
                <template slot="prepend">标签</template>
              </el-input>
            </el-col>

            <el-col :span="3">
              <el-select v-model="queryParams.goodsType" placeholder="销售类型">
                <el-option label='预售商品' value='PRESALE'></el-option>
                <el-option label='销售商品' value='SALE'></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select v-model="queryParams.shelves" placeholder="状态">
                  <el-option label='未上架'
                             value='UN_SHELVES'></el-option>
                  <el-option label='已上架'
                             value='ON_SHELVES'></el-option>
                  <el-option label='下架'
                             value='OFF_SHELVES'></el-option>
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-cascader placeholder="商品类别"
                           :options="options"
                           change-on-select
                           :props="{value:'categoryId',label:'name',children:'children'}"
                           @active-item-change="change"
                           v-model="selectedOptions3">
              </el-cascader>
            </el-col>

            <el-col :span="4">
              <el-button type="primary"
                           @click='search'>搜索</el-button>
              <el-button @click='reset'>重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        
        <el-table :data="list">
            <el-table-column label="ID"
                             align="center"
                             width="50px;"
                             prop="goodsId">

                <!-- {{row.brandId}} -->
            </el-table-column>
            <el-table-column label="主图"
                             align="center"
                             width="70px"
                             >
                      <template slot-scope="scope">
                          <images :src='scope.row.coverImage' style="width:100%" ></images>
                           <!-- <img :src="scope.row.coverImage" alt=""> -->
                </template>

            </el-table-column>
            <el-table-column label="名称"
                             align="left"
                             width="200px"
                             prop="title"></el-table-column>

            <el-table-column label="销售类型"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.goodsType|goodsType}}
                </template>
            </el-table-column>
            <el-table-column label="商品类别"
                             align="center"
                             prop='categoryName'>
            </el-table-column>
            <el-table-column label="标签"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.tags}}
                </template>
            </el-table-column>
            <el-table-column label="规格 | 价格 | 库存" width="200"
                             align="center">
               <template slot-scope="scope">
                    <ProductAttr :list ='scope.row.goodsSkuInfos'></ProductAttr>
               </template>
            </el-table-column>
            <el-table-column label="状态"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.shelves|shelves}}
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="150px">
                <template slot-scope="scope">
                    <el-button size="mini" round
                               v-if='scope.row.shelves=="ON_SHELVES"'
                               @click='shelvesChange(scope.row.goodsId,scope.row.shelves,scope.row.goodsType)'>下架</el-button>
                    <el-button size="mini" round
                               @click='shelvesChange(scope.row.goodsId,scope.row.shelves,scope.row.goodsType)'
                               v-if='scope.row.shelves=="OFF_SHELVES"||scope.row.shelves=="UN_SHELVES"'>上架</el-button>
                    <el-button size="mini" round
                               @click="$router.push({'name':'商品编辑',params:{id:scope.row.goodsId}})">编辑</el-button>
                    <el-button size="mini" round
                               @click="gotoRemove(scope.row.goodsId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="text-center">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="tableParams.page"
                           layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div>
    </page>
</template>
<script>
import { mixin } from "../../mixins/search";
import  ProductAttr  from "./ProductAttr";
import {
  shelvesStatusChange,
  getProductListApi,
  deleteProductApi,
  editProductApi,
  getAllTreeOfCategory
} from "@/api";

export default {
  mixins: [mixin],
  mounted() {
    this.getAllTree();
  },
  data() {
    return {
      selectedOptions3: [],
      options: [],
      total: 0,
      list: [],
      queryParams: {
        shelves: "",
        title: "",
        tag: "",
        goodsType: ""
      }
    };
  },
  filters: {
    shelves: function(type) {
      return {
        UN_SHELVES: "未上架",
        ON_SHELVES: "上架",
        OFF_SHELVES: "下架"
      }[type];
    },
    goodsType: function(type) {
      return {
        SALE: "销售商品",
        PRESALE: "预售商品"
      }[type];
    }
  },
  components: {
    ProductAttr
  },
  methods: {
    reset() {
      if (this.selectedOptions3) {
        this.selectedOptions3 = [];
      }

      this.tableParams = {
        limit: 10,
        page: 1
      };
      this.queryParams = {
        shelves: "",
        title: "",
        tag: "",
        goodsType: ""
      };

      this.$router.push({ path: this.$route.path, query: {} });
      this.getList({ limit: 10, page: 1 });
    },

    change(item) {
      console.log(item);
    },
    getAllTree() {
      getAllTreeOfCategory().then(res => {
        this.$set(this, "options", res);
      });
    },
    shelvesChange(id, type, goodsType) {
      //shelvesChange 商品上下架状态改变
      var shelves = "";
      if (type == "UN_SHELVES" || type == "OFF_SHELVES") {
        shelves = "ON_SHELVES";
      } else {
        shelves = "OFF_SHELVES";
      }
      shelvesStatusChange({
        id: id,
        shelves: shelves,
      }).then(res => {
        this.getList(this.tableParams);
      });
    },
    gotoRemove(id) {
      var vm = this;
      this.$confirm(`是否删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteProductApi({ id: id })
            .then(function(res) {
              vm.$message({
                type: "success",
                message: "删除成功"
              });
              vm.getList(vm.tableParams);
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getList(params) {
      if (this.selectedOptions3) {
        var id = this.selectedOptions3[this.selectedOptions3.length - 1];
        _.extend(params, { categoryId: id });
      }
      getProductListApi(params).then(res => {
        this.list = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

