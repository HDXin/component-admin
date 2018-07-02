<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/order/sale_order">销售订单</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <el-form inline
               label-width="150px">
        <sale-order-info :dataList='dataList' />
      </el-form>
      <h4>商品明细</h4>

      <el-table :data="data"
                show-summary>
        <el-table-column label="商品名称">
            <template slot-scope="scope">
              <router-link :to="{'name':'商品编辑',params:{id:scope.row.goodsId}}">{{scope.row.title}}</router-link>
                  <!-- <el-button type='text' @click="$router.push({'name':'商品编辑',params:{id:scope.row.goodsId}})">{{scope.row.title}}</el-button> -->
              </template>               
                         </el-table-column>
        <el-table-column label="商品规格"
                         prop='subTitle'></el-table-column>
        <el-table-column label="商品编号" align="left">
              <template slot-scope="scope">
                  {{scope.row.goodsId}}
              </template>
         </el-table-column>
        <el-table-column label="数量"
                         prop='goodsCount'></el-table-column>
        <el-table-column label="单价"
                         prop='price'></el-table-column>
        <el-table-column v-if='showList'
                         label="拆分数">
          <template slot-scope="scope">
            <el-input @blur="gotoBlur($event,scope.row.goodsCount)"
                      @change='gotoChange(scope.row.count,scope.$index)'
                      v-model.number='scope.row.count'
                      type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="金额"
                         prop='total'>
        </el-table-column>
      </el-table>
      <el-row v-if='dataList.saleOrderStatus == "PRE_ACCEPT" '
              style='text-align:right;margin-top:20px'>
        <el-col :span='24'>
          <el-button type='primary'
                     @click='open'>确认收货</el-button>
        </el-col>
      </el-row>
      <div v-if="dataList.saleOrderStatus == 'PRE_DELIVER'">
        <h4>快递信息</h4>
        <el-row class="grid-table-border">
          <el-form inline
                   label-width="100px">
            <el-col :span="8">
              <el-form-item label="快递公司">
                <el-select v-model="model.logisticsInfo"
                           value-key="companyCode">
                  <el-option v-for="item in kuaidis"
                             :key="item.companyCode"
                             :label="item.companyName"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <k-form-item label="快递单号"
                           v-model="model.number"></k-form-item>
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div v-if="dataList.saleOrderStatus == 'PRE_ACCEPT' || dataList.saleOrderStatus == 'COMPLETE'||dataList.saleOrderStatus == 'ALREADY_REVIEW'">
        <h4>快递信息</h4>
        <el-row class="grid-table-border">
          <el-form inline
                   label-width="150px">
            <el-col :span="8">
              <el-form-item label="快递公司">{{dataList.companyName||'无'}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="快递单号">{{dataList.number||'无'}}</el-form-item>
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <div slot="footer">
      <span v-if='!(data.length==1&&data[0].goodsCount==1)'>
           <el-button v-if="!showList && (dataList.saleOrderStatus == 'PRE_DELIVER' || dataList.saleOrderStatus == 'PAID')" 
                 @click='showList=true'>订单拆分</el-button>
      </span>
   
      <el-button v-if='showList'
                 @click='gotoSplice'>确认拆分</el-button>
      <el-button type="primary"
                 @click="deliverGoods"
                 v-if="dataList.saleOrderStatus == 'PRE_DELIVER' && dataList.cellphone !== '-'">确认发货</el-button>
                 <!-- 订单取消 -->
       <el-button type="primary" 
                 @click="orderCancel"
                 v-if="dataList.saleOrderStatus == 'NEW_ORDER'">取消</el-button>
    </div>
  </page>
</template>
<script>
import SaleOrderInfo from "@/components/order/SaleOrderInfo";
import LogisticsInfo from "@/components/order/LogisticsInfo";
import OrderSplice from "@/components/order/OrderSplice";
import { orderApi, orderSplice, KuaidiListApi, DeliverGoodsApi,confirmSaveGoods,orderCancelApi } from "@/api";

export default {
  data() {
    return {
      spliceList: "",
      data: [],
      dataList: {},
      showList: false,
      model: {
        logisticsInfo: {
          companyCode: "",
          companyName: ""
        },
        number: ""
      },
      kuaidis: []
    };
  },
  methods: {
    orderCancel(){
       this.$confirm("确认取消?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          orderCancelApi.cancel({id:this.$route.params.id}).then(res => {
            this.$message({
              type: "success",
              message: "确认成功"
            });
            this.$router.go(-1)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    open() {
      this.$confirm("确认收货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          confirmSaveGoods({id:this.$route.params.id,saleOrderStatus:'ACCEPT'}).then(res => {
            this.$message({
              type: "success",
              message: "确认成功"
            });
            this.$router.go(-1)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getKuaidiList() {
      KuaidiListApi().then(res => {
        this.kuaidis = res.map(item => {
          return {
            companyCode: item.companyCode,
            companyName: item.companyName
          };
        });
      });
    },
    deliverGoods() {
      let params = {
        number: this.model.number,
        ...this.model.logisticsInfo,
        id: this.$route.params.id
      };
      for (const key in params) {
        if (!params[key]) {
          return this.$message({
            message: "完善快递信息",
            type: "info"
          });
        }
      }
      DeliverGoodsApi(params)
        .then(res => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.$router.push("/order/sale_order");
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    gotoChange(row, index) {
      var countData = this.data[index];
      if (countData.count == countData.goodsCount) {
        return this.$message.error("不能拆分");
      }
      var arr = _.clone(this.data);
      this.data = [];
      this.data = arr;
    },
    gotoBlur(event, counts) {
      if (!event.target.value) {
        return this.$message.error("请输入拆分数");
      } else {
        // var values =  Number(value)
        // if (!Number(values)) {
        //      return this.$message.error('请输正数数字')
        // }
        if (event.target.value < 0 || event.target.value > counts) {
          // this.list = [];
          // this.$set(this,'list',arr)
          // this.list = arr
          return this.$message.error("请输大于0小于" + counts + "的数量");
        }
      }
      this.$emit("input", this.list);
    },
    gotoSplice() {
      this.showList = false;
      var total = [];
      _.forEach(this.data, res => {
        var arr = [];
        var brr = [];
        var obj1 = {
          goodsId: res.goodsId,
          goodsSkuId: res.goodsSkuId,
          quantity: res.goodsCount - res.count
        };
        var obj2 = {
          goodsId: res.goodsId,
          goodsSkuId: res.goodsSkuId,
          quantity: res.count
        };
        arr.push(obj1);
        brr.push(obj2);
        total.push(arr);
        total.push(brr);
      });

      orderSplice(this.$route.params.id, total).then(res => {
        this.$router.replace("/order/sale_order");
      });
    },
    getDetail() {
      orderApi.get({ saleOrderId: this.$route.params.id }).then(res => {
        this.dataList = res;
        _.forEach(res.items, item => {
          _.extend(item, {
            total: Number(item.goodsCount * item.price/100),
            count: ""
          });
        });
        this.data = res.items;
           return this.data.map(item =>{
                   item.price = item.price/100
              return item;
          })
      });
    }
  },
  mounted() {
    this.getDetail();
    this.getKuaidiList();
  },
  components: {
    SaleOrderInfo,
    LogisticsInfo,
    OrderSplice
  }
};
</script>
<style lang="less" scoped>
// .content{
//     max-width: 1200px;
//     margin: 0 auto;
// }
</style>


