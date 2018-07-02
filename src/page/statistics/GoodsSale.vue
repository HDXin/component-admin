<template>
  <page>
    <el-row slot="header"
            :span="24">
      <el-col :span="22">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>统计报表</el-breadcrumb-item>
          <el-breadcrumb-item>商品销量统计</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

    </el-row>
    <el-form :model="queryParams"
             :inline="true">
      <el-form-item label="订单日期">
        <el-date-picker type="date"
                        v-model="queryParams.beginTime"
                        format="yyyy-MM-dd"
                        placeholder=""
                        :picker-options="purchaseEndDateOptionsStart"></el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker type="date"
                        v-model="queryParams.endTime"
                        format="yyyy-MM-dd"
                        :picker-options="purchaseEndDateOptionsEnd"></el-date-picker>

      </el-form-item>
      <el-form-item label='销售量'>
          <el-select v-model="queryParams.quantityFlag" placeholder="">
            <el-option label='从低到高' value="true" ></el-option>
            <el-option label='从高到低' value="false" ></el-option>
          </el-select>
      </el-form-item>
       <el-form-item label='销售金额'>
          <el-select v-model="queryParams.amountFlag" placeholder="">
            <el-option label='从低到高' value="true" ></el-option>
            <el-option label='从高到低' value="false" ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click='search'>搜索</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list">
      <el-table-column label="商品名称(SKU）"
                       align="center"
                       prop="title">

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
      <el-table-column label="销售量（件）"
                       align="center"
                       width="200px" >
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>

      <el-table-column label="销售金额(元)"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.saleTotalAmount/100}}
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="text-center">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="tableParams.page"
                           layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div> -->
  </page>
</template>
<script>
import { mixin } from "../../mixins/search";
import { statisticsApi } from "@/api";

export default {
  mixins: [mixin],
  mounted() {},
  components: {},
  data() {
    return {
      saleList: [],
      sortBy: true,
      list: [],
      queryParams: {
        title: "",
        beginTime: "",
        endTime: "",
        quantityFlag:'',
        amountFlag:''
      }
    };
  },
  computed: {
    purchaseEndDateOptionsEnd: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.beginTime) {
            return (
              time.getTime() < new Date(self.queryParams.beginTime).getTime()
            );
          }
        }
      };
    },
    purchaseEndDateOptionsStart: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.endTime) {
            return (
              time.getTime() > new Date(self.queryParams.endTime).getTime()
            );
          }
        }
      };
    }
  },
  filters: {},
  watch: {
    saleList: {
      handler(val) {
         console.log(val)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    change(item) {},
    sort(row, index) {
      // this.saleList.push(row);
    },
    reverseArr() {},

    getList(params) {
      if (params.beginTime) {
        params.beginTime = this.$dateFilter(params.beginTime);
      }
      if (params.endTime) {
        params.endTime = this.$dateFilter(params.endTime);
      }
      statisticsApi.goodsSale(params).then(res => {
        this.list = res;
        // this.total = res.total;
      });
    }
  }
};
</script>

