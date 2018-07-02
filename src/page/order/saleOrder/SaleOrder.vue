<template>
  <Page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              style="text-align:right">
        <el-button type="primary"
                   size="small">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true"
             :model="queryParams">
      <!-- <k-form-item label="订单日期"
                   type="date-picker"
                   v-model='queryParams.benginTime'></k-form-item>
      <k-form-item label="至"
                   type="date-picker"
                   v-model='queryParams.endTime'>></k-form-item>
      <k-form-item label="订单类型"
                   type="select"></k-form-item>
      <k-form-item label="提货方式"
                   type="select"></k-form-item>
      <k-form-item label="订单号" v-model="queryParams.saleOrderNo"></k-form-item>
      <k-form-item label="分销员"></k-form-item>
      <k-form-item label="支付状态"
                   type="select"></k-form-item>
      <k-form-item label="订单状态"
                   type="select"></k-form-item>
      <el-form-item> -->
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
      <el-form-item label="订单类型">
        <el-select v-model='queryParams.orderType'
                   placeholder="请选择">
          <el-option value=''
                     label="全部">全部</el-option>
          <el-option value='PRESALE'
                     label="预售商品">预售商品</el-option>
          <el-option value='SALE'
                     label="销售商品">销售商品</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提货方式">
        <el-select v-model='queryParams.shippingType'
                   placeholder="请选择">
          <el-option value=''
                     label="全部">全部</el-option>
          <el-option value='UNKNOWN'
                     label="未选择">未知</el-option>
          <el-option value='PICK_UP'
                     label="门店自提">门店自提</el-option>
          <el-option value='PERSENT'
                     label="送人">送人</el-option>
          <el-option value='MAIL'
                     label="邮寄">邮寄</el-option>
          <el-option value='STORE_SALE'
                     label="门店销售">门店销售</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input placeholder="请输入"
                  v-model="queryParams.saleOrderNo"></el-input>
      </el-form-item>
      <el-form-item label="分销员">
        <el-input placeholder="请输入"
                  v-model="queryParams.agencyName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="支付状态"> -->
      <!-- <el-select v-model='queryParams.shippingType'
                   placeholder="请选择">
          <el-option value='UNKNOWN' label="未知">未知</el-option>
          <el-option value='PICK_UP' label="门店自提">门店自提</el-option>
          <el-option value='PERSENT' label="送人">送人</el-option>
          <el-option value='MAIL' label="邮寄">邮寄</el-option>
          <el-option value='STORE_SALE' label="门店销售">门店销售</el-option> -->
      <!-- </el-form-item> -->
      <el-form-item label="订单状态">
        <el-select v-model='queryParams.saleOrderStatus'
                   placeholder="请选择">
          <el-option value=''
                     label="全部">全部</el-option>
          <el-option value='WAIT_PAY'
                     label="待支付">待支付</el-option>
          <el-option value='PRE_PICK_UP'
                     label="待提货">待提货</el-option>
          <el-option value='PRE_DELIVER'
                     label="待发货">待发货</el-option>
          <el-option value='PRE_ACCEPT'
                     label="待收货">待收货</el-option>
          <el-option value='COMPLETE'
                     label="已完成">已完成</el-option>
          <el-option value='TIMEOUT'
                     label="延期">延期</el-option>
          <el-option value='RETURNED'
                     label="退款,退货">退款,退货</el-option>
          <el-option value='CANCLE'
                     label="已取消">已取消</el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click='search'>搜索</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total='total'
             @current-change="handleCurrentChange"
             :current-page="tableParams.page" />
  </Page>
</template>
<script>
import { orderApi,orderCancelApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  computed: {
    purchaseEndDateOptionsEnd: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.benginTime) {
            return (
              time.getTime() < new Date(self.queryParams.benginTime).getTime()
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
  data() {
    return {
      total: 0,
      queryParams: {
        beginTime: "",
        endTime: "",
        saleOrderStatus: "",
        orderType: "",
        saleOrderNo: "",
        shippingType: "",
        agencyName: ""
      },
      tableData: [],
      columns: [
        {
          width: "140",
          label: "订单号",
          align: "center",
          prop: "saleOrderNo"
        },
        {
          label: "用户手机号",
          align: "center",
          prop: "cellphone"
        },
        {
          label: "订单日期",
          align: "center",
          prop: "name",
          formatter: row => {
            return this.$dateFilter(row.createTime);
          }
        },
        {
          label: "订单类型",
          align: "center",
          prop: "orderType",
          formatter: row => {
            return this.$goodsTypeFilter(row.orderType);
          }
        },
        {
          label: "提货方式",
          align: "center",
          prop: "shippingType",
          formatter: row => {
            return this.$ShippingType(row.shippingType);
          }
        },
        {
          label: "分销员",
          align: "center",
          prop: "name"
        },
        {
          label: "订单总额",
          align: "right",
          prop: "finalTotalAmount",
          formatter: row => {
            return this.$currency(row.finalTotalAmount / 100);
          }
        },
        // {
        //   label: "支付状态",
        //   align: "center",
        //   prop: "platformType",
        //   formatter: row => {
        //     return {
        //       NEW_ORDER: "新订单",
        //       SELLER_REJECT: "卖家拒绝",
        //       BUYER_CANCEL:'买家取消',
        //       PRE_PAY:"预支付",
        //       PAYMENT:'支付中',
        //       PAID:'已支付',
        //       PRE_PICK_UP:'待提货(门店自提)',
        //       PRE_DELIVER:'待发货(邮寄)',
        //       PRE_ACCEPT:'待收货',
        //       PRE_RETURN:'预退货',
        //       RETURNED:'退货成功',
        //       DISASSEMBLY:'拆解订单',
        //       PICKUP:"已提货",
        //       ACCEPT:'已收货',
        //       ALREADY_REVIEW:'已评价',
        //       TIMEOUT:'已超时"',
        //       EXCEPTION:'异常"'
        //     }[row.platformType];
        //   }
        // },
        {
          label: "订单状态",
          prop: "saleOrderStatus",
          align: "center",
          formatter: row => {
            return {
              PAID: "已支付",
              SELLER_REJECT: "卖家拒绝",
              BUYER_CANCEL: "买家取消",
              ALREADY_REVIEW: "已评价",
              PRE_PICK_UP: "待提货",
              NEW_ORDER: "待支付",
              BOYCOTT: "拒绝买家购买",
              PRE_PAY: " 预支付",
              PRE_DELIVER: " 待发货",
              PAYMENT: " 支付中",
              PRE_ACCEPT: "待收货",
              RETURNED: "退货成功",
              RE_RETURN: "预退货",
              DISASSEMBLY: "拆解订单",
              CANCEL: "已取消",
              EXCEPTION: "异常",
              TIMEOUT: "超时",
              PICKUP: "已提货",
              ACCEPT: "已收货"
            }[row.saleOrderStatus];
          }
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini"
                round
                onClick={() =>
                  this.$router.push({
                    name: "sale_order_detail",
                    params: { id: row.saleOrderId }
                  })}
              >
                详情
              </el-button>
              {row.saleOrderStatus == "PAID" ||
              row.saleOrderStatus == "PAYMENT" ||
               row.saleOrderStatus == "PRE_PAY" ||
              row.saleOrderStatus == "NEW_ORDER" ||
              row.saleOrderStatus == "PRE_DELIVER" ? (
                <el-button size="mini" round onClick={()=>{
                  this.orderCancel(row)
                }}>
                  取消
                </el-button>
              ) : (
                ""
              )}
            </div>
          )
        }
      ]
    };
  },
  methods: {
      orderCancel(row){
       this.$confirm("确认取消?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          orderCancelApi.cancel({id:row.saleOrderId}).then(res => {
            this.$message({
              type: "success",
              message: "确认成功"
            });
          });
          this.getList(this.tableParams)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getList(params) {
      if (params.beginTime) {
        params.beginTime = this.$dateFilter(params.beginTime);
      }
      if (params.endTime) {
        params.endTime = this.$dateFilter(params.endTime);
      }
      orderApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

