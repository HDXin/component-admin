<template>
  <page>
    <el-row slot="header">
      <el-col :span="10" slot="header">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>门店结算</el-breadcrumb-item>
          <el-breadcrumb-item>明细</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form inline>
      <el-form-item label="日期">
        <el-date-picker type="date" v-model="queryParams.beginTime" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <k-form-item label="至">
        <el-date-picker type="date" v-model="queryParams.endTime" value-format="yyyy-MM-dd"></el-date-picker>
      </k-form-item>
      <k-form-item label="订单号" v-model="queryParams.saleOrderNo"></k-form-item>
      <el-form-item>
        <el-button type="primary" @click='search'>搜索</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange"
             layout="prev, pager, next"/>
  </page>
</template>
<script>
  import {storeSettleDetailApi} from '@/api'
  import {mixin} from "@/mixins/search";

  export default {
    mixins: [mixin],
    methods: {
      getList(params) {
        params = Object.assign({}, params, {storeId: this.$route.params.id, month: this.$route.query.month});
        params.offset = params.limit * (params.page - 1);
        storeSettleDetailApi(params).then(res => {
          this.tableData = res.items;
          this.total = res.total;
        })
      }
    },
    data() {
      return {
        queryParams: {
          beginTime: '',
          endTime: '',
          saleOrderNo: ''
        },
        total: 0,
        tableData: [],
        columns: [{
          label: '商品',
          width: 200,
          prop: 'title'
        }, {
          label: '规格',
          width: 100,
          prop: 'weightSpec'
        }, {
          label: '订单号',
          width: 150,
          prop: 'saleOrderNo'
        }, {
          label: '日期',
          align: 'center',
          prop: 'orderCreateTimeStr'
        }, {
          label: '数量',
          align: 'center',
          prop: 'quantity'
        }, {
          label: '类型',
          align: 'center',
          prop: 'shippingType',
          formatter: row => this.$ShippingType(row.shippingType)
        },
          {
            label: '订单金额',
            align: 'right',
            prop: 'goodsTotalPrice',
            formatter: row => row.goodsTotalPrice / 100
          }, {
            label: '线上支付',
            align: 'right',
            prop: 'onlineSalePrice',
            formatter: row => row.onlineSalePrice / 100
          }, {
            label: '销售分润',
            align: 'right',
            prop: 'saleProfit',
            formatter: row => row.saleProfit / 10000
          },
          {
            label: '线下收款',
            align: 'right',
            prop: 'offlinePrice',
            formatter: row => row.offlinePrice / 100
          },
          {
            label: '提货分润',
            align: 'right',
            prop: 'pickupProfit',
            formatter: row => row.pickupProfit / 10000
          }, {
            label: '结算金额',
            align: 'right',
            prop: 'settledAmount',
            formatter: row => row.settledAmount / 10000
          },]
      }
    }
  }
</script>

