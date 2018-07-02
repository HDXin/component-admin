<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{path:'/store/store_management'}">门店管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name:'store_goods',params:{id:$route.params.id},query:{storeName:$route.query.storeName}}">商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
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
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange" />
  </page>
</template>
<script>
import { ImportGoodsSkuListApi, ImportGoodsSkuApi,qrCodeStreamApi,getAllTreeOfCategory } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      selectedOptions3:[],
      options:[],
      tableData: [],
      queryParams: {
        shelves: "",
        title: "",
        goodsType: ""
      },
      columns: [
        {
          label: "ID",
          prop: "goodsId",
          width: 100
        },
        {
          label: "缩略图",
          width: 80,
          // prop: "name"
          render: (h, { row }) => {
            return (
              <images src={row.coverImage} style="width:100%;" />
            );
          }
        },
        {
          label: "名称",
          prop: "title"
        },
        {
          label: "销售类型",
          width: 150,
          align: "center",
          prop: "goodsType",
          formatter:(row) => this.$goodsTypeFilter(row.goodsType)
        },
        {
          label: "商品类别",
          width: 150,
          align: "center",
          prop: "categoryName"
        },
        {
          label: "规格",
          width: 150,
          align: "center",
          prop: "weightSpec"
        },
        {
          label: "单价",
          width: 150,
          align: "center",
          prop: "unitPrice",
        formatter: row => this.$currency(row.unitPrice / 100)
        },
        {
          label: "操作",
          width: 100,
          render: (h, { row }) => (
            <div>
              <el-button size="mini" round onClick={() => this.selectGoods(row)}>
                导入
              </el-button>
            </div>
          )
        }
      ]
    };
  },
  mounted() {
    this.getAllTree()
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
        goodsType: ""
      };

      this.$router.push({ path: this.$route.path, query: {} });
      this.getList({ limit: 10, page: 1 });
    },

   getAllTree() {
      getAllTreeOfCategory().then(res => {
        this.$set(this, "options", res);
      });
    },
    change(){

    },
    selectGoods(row) {
      let params = {
        storeId: Number(this.$route.params.id),
        goodsId: row.goodsId,
        skuId: row.skuId,
        storeName: this.$route.query.storeName
      };
      ImportGoodsSkuApi(params)
        .then(res => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getList()
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
      params.storeId = this.$route.params.id;
     if (this.selectedOptions3) {
        var id = this.selectedOptions3[this.selectedOptions3.length - 1];
        _.extend(params, { categoryId: id });
      }
      ImportGoodsSkuListApi(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      
      });
    }
  }
};
</script>

