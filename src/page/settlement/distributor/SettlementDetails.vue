<template>
  <page>
    <el-row>
      <el-col :span="10" slot="header">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>门店结算</el-breadcrumb-item>
          <el-breadcrumb-item>明细</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="日期" v-model="queryParams.beginDate" type="date-picker"></k-form-item>
      <k-form-item v-model='queryParams.endDate' label="至" type="date-picker"></k-form-item>
      <k-form-item label="订单号" v-model="queryParams.saleOrderNo"></k-form-item>
      <el-form-item>
        <el-button type="primary" @click='search'>搜索</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData" :total="total"
             @current-change="handleCurrentChange" layout="prev, pager, next" :columns="columns"/>
  </page>
</template>
<script>
  import {performanceDetailApi} from '@/api'
  import {mixin} from "@/mixins/search";

  export default {
    mixins: [mixin],
    methods: {
      getList(params) {
        params = Object.assign({}, params, {agencyPerformanceId: this.$route.params.id});
        params.offset = params.limit * (params.page - 1);
        if (this.queryParams.beginDate) {
          let beginDate = this.$dateFilter(this.queryParams.beginDate, 'yyyy-MM-dd')
          _.extend(params, {beginDate: beginDate})
        }
        if (this.queryParams.endDate) {
          let endDate = this.$dateFilter(this.queryParams.endDate, 'yyyy-MM-dd')
          _.extend(params, {endDate: endDate})
        }
        performanceDetailApi.query(params).then(res => {
          this.tableData = res.items
          this.total = res.total
        })
      }
    },
    data() {
      return {
        total: 0,
        queryParams: {
          endDate: "",
          beginDate: ''
        },
        tableData: [],
        columns: [{
          label: '商品',
          prop: 'title'
        }, {
          label: '规格',
          prop: 'subTitle'
        }, {
          label: '分销比例',
          prop: 'percent'
        }, {
          label: '订单号',
          prop: 'saleOrderNo'
        }, {
          label: '日期',
          prop: 'date'
        }, {
          label: '数量',
          prop: 'quantity'
        }, {
          label: '订单总额',
          prop: 'amount',
          formatter: row => row.amount / 100
        }, {
          label: '提成金额',
          prop: 'bonus',
          formatter: row => row.bonus / 10000
        }]
      }
    }
  }
</script>

