<template>
    <page>
        <el-row slot="header">
            <el-col :span="10">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item to="/order/return_order">退货订单</el-breadcrumb-item>
                    <el-breadcrumb-item>订单详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <div class="content">
            <el-form inline
                     label-width="150px">
                <h4>订单详情</h4>
                <sale-order-info :dataList="model.bizSaleOrderTreeResp" />
            </el-form>
            <h4>退换货详情</h4>
            <el-form inline
                     label-width="150px">
                <el-row class="grid-table-border">
                    <el-col :span="8">
                        <el-form-item label="类型">{{model.returnType | returnTypeFilter}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态">{{model.returnGoodsStatus | returnGoodsStatus}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单号">{{model.returnGoodsNo}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发起时间">{{model.createTime | dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="快递公司">{{model.kuaidiInfo.companyName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="快递单号">{{model.kuaidiInfo.number}}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="退货说明">{{model.returnDesc}}</el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <h4>商品明细</h4>
            <el-table :data="model.items">
                <el-table-column label="商品名称"
                                 prop="goodsTitle"></el-table-column>
                <el-table-column label="商品规格"
                                 prop="skuTitle"></el-table-column>
                <el-table-column label="数量"
                                 prop="goodsCount"></el-table-column>
                <el-table-column label="单价"
                                 prop="price">
                    <template slot-scope="{row}">
                        {{row.price/100 | currency}}
                    </template>
                </el-table-column>
                <el-table-column label="金额"
                                 prop="refundAmount">
                    <template slot-scope="{row}">
                        {{row.refundAmount/100 | currency}}
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="12"
                        :offset="10"
                        class="text-right summary">
                    <label>合计商品总数：</label>{{summary.count}}
                    <label>合计金额：</label>{{model.refundAmount / 100 | currency}}
                </el-col>
            </el-row>
            <!-- 如果是快递 -->
        </div>
        <div slot="footer">
            <template v-if="model.returnGoodsStatus == 'NEW_CREATE'">
                <el-button type="primary"
                           @click="approve('SUCCESS')">通过</el-button>
                <el-button type="danger"
                           @click="approve('FAIL')">拒绝</el-button>
            </template>
            <template v-else-if="model.returnGoodsStatus == 'ALREADY_MAIL'">
                <el-button type="primary"
                           @click="approve('ALREADY_APPLY_REFUND')">验收通过</el-button>
                <el-button type="danger"
                           @click="approve('FAIL')">验收拒绝</el-button>
            </template>
            <el-button @click="exit">返回</el-button>
            <!-- <el-button>订单拆分</el-button>
            <el-button type="primary">确认发货</el-button> -->
        </div>
        <el-dialog :title="title"
                   @close="close"
                   :visible.sync="dialogVisible">
            <el-form label-width="120px">
                <el-form-item label="退款金额"
                              v-if="submitType == 'ALREADY_APPLY_REFUND'">
                    <el-input v-model.number="refundAmount"
                              placeholder=""
                              type="number"
                              style="width:200px"
                              size="small">
                        <template slot="append">元</template>
                    </el-input>
                    <label> {{model.refundAmount/100| currency}}</label>
                </el-form-item>
                <div v-if="submitType == 'ALREADY_SHIPPING'">将生成待发货的新订单，确认后跳转到订单详情中继续操作 </div>
                <el-form-item label="备注"
                              required>
                    <el-input v-model="remark"
                              type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button @click="submit"
                           type="primary">确定</el-button>
            </div>
        </el-dialog>
    </page>
</template>
<script>
import SaleOrderInfo from "@/components/order/SaleOrderInfo";
import LogisticsInfo from "@/components/order/LogisticsInfo";
import { ReturnOrderApi, ApprovalReturnOrderApi } from "@/api";
export default {
  data() {
    return {
      data: [],
      dialogVisible: false,
      model: {
        bizSaleOrderTreeResp: {},
        kuaidiInfo: {},
        items: []
      },
      remark: "",
      title: "",
      submitType: "",
      refundAmount: 0
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    summary() {
      let summary = {
        count: 0
      };
      this.model.items.filter(item => {
        summary.count += item.goodsCount;
      });
      return summary;
    }
  },
  methods: {
    async getInfo() {
      try {
        let res = await ReturnOrderApi.get({
          returnGoodsId: this.$route.params.id
        });
        res.kuaidiInfo = res.kuaidiInfo || {};
        this.model = res;
      } catch (err) {
        this.$message({
          message: err,
          type: "error"
        });
      }
    },
    approve(type) {
      this.title =
        type == "SUCCESS"
          ? "通过"
          : type == "ALREADY_APPLY_REFUND" ? "申请退款" : "拒绝";
      this.submitType = type;
      if (
        this.model.returnType == "EXCHANGE" &&
        type == "ALREADY_APPLY_REFUND"
      ) {
        this.title = "重新发货";
        this.submitType = "ALREADY_SHIPPING";
      }
      this.dialogVisible = true;
    },
    submit() {
      if (!this.remark) {
        return this.$message({
          message: "请输入备注",
          type: "info"
        });
      }
      let params = {
        id: this.$route.params.id,
        remark: this.remark,
        returnGoodsStatus: this.submitType
      };
      if (this.submitType == "ALREADY_APPLY_REFUND") {
        // this.refundAmount = this.refundAmount ;
        if (!this.refundAmount) {
          return this.$message({
            message: "请输入退款金额",
            type: "info"
          });
        }
        if (
          this.refundAmount * 100 < 0 ||
          this.refundAmount * 100 > this.model.refundAmount
        ) {
          return this.$message({
            message: "请输入正确的金额",
            type: "info"
          });
        }
        params.refundAmount = this.refundAmount * 100;
      }
      ApprovalReturnOrderApi(params)
        .then(res => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.dialogVisible = false;
          if (params.returnGoodsStatus == "ALREADY_SHIPPING") {
            return this.$router.replace({
              name: "sale_order_detail",
              params: { id: res.shippingOrderId }
            });
          }
          this.getInfo();
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    close() {
      this.refundAmount = 0;
      this.remark = "";
    },
    exit() {
      this.$router.replace("/order/return_order");
    }
  },
  components: {
    SaleOrderInfo,
    LogisticsInfo
  }
};
</script>
<style lang="less" scoped>
// .content{
//     max-width: 1200px;
//     margin: 0 auto;
// }
.summary {
  margin-top: 15px;
  label {
    margin: 0 5px 0 20px;
  }
}
</style>


