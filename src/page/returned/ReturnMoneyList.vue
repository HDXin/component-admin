<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>退款管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="2">
                <el-button size="small"
                           type="primary">导出excel</el-button>
            </el-col>
        </el-row>
        <el-form :model="queryParams"
                 :inline="true">
            <!-- <el-form-item label="商品">
                <el-input v-model="queryParams.title"
                          placeholder=""></el-input>
            </el-form-item> -->
            <el-form-item label="退款单号">
                <el-input v-model="queryParams.refundNo"
                          placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="操作人">
                  <el-input v-model="queryParams.uesrName"
                          placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="订单号">
                  <el-input v-model="queryParams.saleOrderNo"
                          placeholder=""></el-input>  
 
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click='search'>搜索</el-button>
                <el-button @click='reset'>重置</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="list">
            <el-table-column label="订单号"
                             align="center"
                             prop="refundNo">

                <!-- {{row.brandId}} -->
            </el-table-column>
            <!-- <el-table-column label="商品"
                             align="center"
                             width="70px"
                             >
                      <template slot-scope="scope">
                          <images :src='scope.row.coverImage' style="width:100%" ></images> -->
                           <!-- <img :src="scope.row.coverImage" alt=""> -->
                <!-- </template> -->

            <!-- </el-table-column> -->
            <el-table-column label="用户"
                             align="left"
                             width="200px"
                            >
                                  <template slot-scope="scope">
                                    {{scope.row.payer.fullName}}
                                  </template>
                             </el-table-column>

            <el-table-column label="申请时间"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="退款金额"
                             align="center"
                            >
                             <template slot-scope="scope">
                                    {{scope.row.refundAmount/100}}
                             </template>
            </el-table-column>
            <el-table-column label="备注"
                             align="center">
                <template slot-scope="scope" v-if='scope.row.returnGoodsResp'>
                    {{scope.row.returnGoodsResp.returnDesc}}
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="150px">
                <template slot-scope="scope">
                        <RetrunCheck v-if='scope.row.refundStatus=="UN_REFUND"' :id='scope.row.refundId'></RetrunCheck>
                    <el-button v-if='scope.row.refundStatus=="REFUND"' size="mini" round
                               >已退款</el-button> 
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
import {
  shelvesStatusChange,
  getProductListApi,
  deleteProductApi,
  editProductApi,
  getAllTreeOfCategory,
  refundApi
} from "@/api"; 
import RetrunCheck from './RetrunCheck'
export default {
  mixins: [mixin],
  mounted() {
    this.getAllTree();
  },
  components: {
      RetrunCheck
  },
  data() {
    return {
      selectedOptions3: [],
      options: [],
      total: 0,
      list: [],
      queryParams: {
        refundNo:'',
        uesrName:'',
        saleOrderNo:''
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
  
      refundApi.query(params).then(res => {
        this.list = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

