<template>
  <Page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>退货退款订单</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              style="text-align:right">
        <el-button type="primary"
                   size="small">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="退换货单日期"
                   type="date-picker"
                   v-model='queryParams.beginTime'></k-form-item>
      <k-form-item label="至"
                   type="date-picker"
                   v-model='queryParams.endTime'></k-form-item>
      <el-form-item label="退货单类型"
                   >
        <el-select v-model='queryParams.returnType'
                   placeholder="请选择">
          <el-option value=''
                     label="全部">全部</el-option>
          <el-option value='RETURN'
                     label="退货">退货</el-option>
          <el-option value='EXCHANGE'
                     label="换货">换货</el-option>
        </el-select>
      </el-form-item >
      <el-form-item label="退货单状态"
                   type="select">
        <el-select v-model='queryParams.returnGoodsStatus'
                   placeholder="请选择">
          <el-option value=''
                     label="全部">全部</el-option>
          <el-option value='NEW_CREATE'
                     label="新创建">新创建</el-option>
          <el-option value='ALREADY_MAIL'
                     label="已通过">已通过</el-option>
          <el-option value='ALREADY_APPLY_REFUND'
                     label="已申请退款">已申请退款</el-option>
          <el-option value='ALREADY_SHIPPING'
                     label="已重新发货">已重新发货</el-option>
          <el-option value='REFUND'
                     label="已退款">已退款</el-option>
          <el-option value='ACCEPT'
                     label="已收货">已收货</el-option>
          <el-option value='FAIL'
                     label="已拒绝">已拒绝</el-option>
        </el-select>
      </el-form-item >
    <k-form-item label="订单单号" v-model='queryParams.saleOrderNo'></k-form-item>
     <k-form-item label="退货单号" v-model='queryParams.returnGoodsNo'></k-form-item>
      <el-form-item>
        <el-button type="primary" @click='search'>搜索</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange" />
  </Page>
</template>
<script>
import { ReturnOrderApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      queryParams: {
        beginTime: "",
        endTime: "",
        returnType: "",
        saleOrderNo: "",
        returnGoodsStatus:'',
        returnGoodsNo:''
      },
      tableData: [],
      columns: [
        {
          label: "订单号",
          prop: "bizSaleOrderTreeResp.saleOrderNo"
        },
        {
          label: "订单日期",
          render: (h, { row }) => {
            return (
              <span>
                {row.bizSaleOrderTreeResp ? (
                  <span>
                    {" "}
                    {this.$dateFilter(row.bizSaleOrderTreeResp.createTime)}{" "}
                  </span>
                ) : (
                  ""
                )}
              </span>
            );
          }
        },
        {
          label: "退货单单号",
          prop: "returnGoodsNo"
        },

        {
          label: "申请日期",
          render: (h, { row }) => {
            return <span> {this.$dateFilter(row.createTime)} </span>;
          }
        },

        {
          label: "退换货类型",
          prop: "returnType",
          formatter: row => {
            return {
              RETURN: "退货",
              EXCHANGE: "换货"
            }[row.returnType];
          }
        },
        {
          label: "商品数量",
          align: "center",
          prop: "goodsCount"
        },
        {
          label: "商品金额",
          prop: "refundAmount",
          formatter: row => this.$currency(row.refundAmount / 100)
        },
        {
          label: "退换货状态",
          prop: "returnGoodsStatus",
          formatter: row => this.$returnGoodsStatus(row.returnGoodsStatus)
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => (
            <el-button
              size="mini"
              round
              onClick={() =>
                this.$router.push({
                  name: "return_order_detail",
                  params: { id: row.returnGoodsId }
                })}
            >
              详情
            </el-button>
          )
        }
      ]
    };
  },
  methods: {
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      try {
      if (params.beginTime) {
        params.beginTime = this.$dateFilter(params.beginTime);
      }
      if (params.endTime) {
        params.endTime = this.$dateFilter(params.endTime);
      }
        let res = await ReturnOrderApi.query(params);
        this.tableData = res.items;
        this.total = res.total;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    }
  }
};
</script>

