<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item>已审核分销员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form inline> 
      <k-form-item label="姓名" v-model="queryParams.fullName"></k-form-item>
      <k-form-item label="手机号" v-model="queryParams.cellphone"></k-form-item>
      <k-form-item label="分销资格" v-model="queryParams.level"
                   type="select">
        <el-option value="SALE" label="销售商品"></el-option>             
        <el-option value="PRESELL" label="预售商品"></el-option>             
        <el-option value="SALE_AND_PRESELL" label="销售商品,预售商品"></el-option> 
            <el-option value="NONE" label="取消资格"></el-option>              
      </k-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :total="total"
             @current-change="handleCurrentChange"
             :columns="columns" />
  </page>
</template>
<script>
import { AgencyInfoApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      queryParams:{
       level:"",
       fullName:'',
        cellphone:''
      },
      columns: [
        {
          label:"ID",
          prop:"userId"
        },
        {
          label: "姓名",
          prop: "fullName"
        },
        {
          label: "手机号",
          prop: "cellphone"
        },
        {
          label: "身份证号",
          prop: "idcard"
        },
        {
          label: "分销资格",
          align: "center",
          prop: "agencyLevel",
          formatter: row => {
            return {
              SALE: "销售商品",
              PRESELL: "预售商品",
              SALE_AND_PRESELL: "销售商品,预售商品"
            }[row.agencyLevel];
          }
        },
        {
          label: "累计业绩",
          align: "right",
          render:(h, { row }) => (
            <span>￥{row.totalSalesVolume/100}</span>
          )
        },
        {
          label: "累计提成",
          align: "right",
          render:(h, { row }) => (
            <span>￥{row.totalSalesBonus/10000}</span>
          )
        },
        {
          label: "当月业绩",
          align: "right",
          render:(h, { row }) => (
           <span>￥{row.monthSalesVolume/100}</span>
          )
        },
        {
          label: "当月提成",
          align: "right",
          render:(h, { row }) => (
           <span>￥{row.monthSalesBonus/10000}</span>
          )
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini" round
                onClick={() =>
                  this.$router.push({
                    name: "distributor_audited_info",
                    params: { id: row.userId }
                  })}
              >
                详情
              </el-button>
            </div>
          )
        }
      ]
    };
  },
  methods: {
    getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
      AgencyInfoApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

