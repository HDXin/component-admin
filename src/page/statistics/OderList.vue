<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>统计报表</el-breadcrumb-item>
                    <el-breadcrumb-item>订单统计</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
          
        </el-row>
        <el-form :model="queryParams"
                 :inline="true">
            <el-form-item label="订单日期">
        <el-date-picker type="date"
                        v-model="queryParams.startDate"
                        format="yyyy-MM-dd"
                        placeholder=""
                        :picker-options="purchaseEndDateOptionsStart"></el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker type="date"
                        v-model="queryParams.endDate"
                        format="yyyy-MM-dd"
                        :picker-options="purchaseEndDateOptionsEnd"></el-date-picker>
      </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click='search'>搜索</el-button>
                <el-button @click='reset'>重置</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="list">
            <el-table-column label="日期"
                             align="center"
                             prop="date">

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
            <el-table-column label="订单数量"
                             align="center"
                             width="200px"
                            >
                                  <template slot-scope="scope">
                                    {{scope.row.saleorderquantity}}
                                  </template>
                             </el-table-column>

            <el-table-column label="商品数量"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.goodsquantity}}
                </template>
            </el-table-column>
            <el-table-column label="销售额(元)"
                             align="center"
                            >
                             <template slot-scope="scope">
                                    {{scope.row.saleTotalAmount/100}}
                             </template>
            </el-table-column>
            <el-table-column label="订单（自提）数"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.pickupquantity}}
                </template>
            </el-table-column>
            <el-table-column label="订单（快递）数"
                             align="center"
                             width="150px">
                <template slot-scope="scope">
                    {{scope.row.mallquantity}}
                </template>
            </el-table-column>
                 <el-table-column label="订单（送人）数"
                             align="center"
                             width="150px">
                <template slot-scope="scope">
                    {{scope.row.persentquantity}}    
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
  statisticsApi,

 
} from "@/api"; 

export default {
  mixins: [mixin],
  mounted() {

  },
  components: {

  },
  data() {
    return {
        list:[],
      queryParams: {
        startDate:'',
        endDate:'',
      }
    };
  },
   computed: {
    purchaseEndDateOptionsEnd: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.startDate) {
            return (
              time.getTime() < new Date(self.queryParams.startDate).getTime()
            );
          }
        }
      };
    },
    purchaseEndDateOptionsStart: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.endDate) {
            return (
              time.getTime() > new Date(self.queryParams.endDate).getTime()
            );
          }
        }
      };
    }
  },
  filters: {
   
  },
  methods: {
    

    change(item) {

    },
   
 
   
    getList(params) {
     if (params.startDate) {
        params.startDate = this.$dateFilter(params.startDate);
      }
      if (params.endDate) {
        params.endDate = this.$dateFilter(params.endDate);
      }
      statisticsApi.orderSale(params).then(res => {
        this.list = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

