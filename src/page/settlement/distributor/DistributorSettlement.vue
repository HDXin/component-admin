<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>分销员结算</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="分销员名称"
                   v-model="queryParams.agencyName" />
      <!-- <k-form-item v-model='queryParams.month' label="日期"
                         type="date-picker" /> -->
      <el-form-item label="日期">
        <el-date-picker v-model="queryParams.month"
                        type="month"
                        placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      {{queryParams.month}}
      <el-form-item>
        <el-button type="primary"
                   @click='search'>搜索</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange"
             layout="prev, pager, next" />
  </page>
</template>
<script>
import { agencySettleApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {


    return {
      total: 0,
      queryParams: {
        month: '',
        agencyName: ""
      },
      tableData: [],
      columns: [
        {
          label: "分销员名称",
          prop: "agencyName"
        },
        {
          label: "日期",
          align: "center",
          prop: "month"
        },
        {
          label: "客户数量",
          align: "right",
          prop: "customerQuantity"
        },
        {
          label: "订单总数",
          align: "right",
          prop: "saleQuantity"
        },
        {
          label: "销售总额",
          align: "right",
          prop: "saleTotalPrice",
          formatter: (row) => row.saleTotalPrice / 100
        },
        {
          label: "销售利润",
          align: "right",
          prop: "bonusTotalPrice",
          formatter: (row) => row.bonusTotalPrice / 10000
        },
        {
          label: "状态",
          align: "center",
          prop: "performancestatus",
          formatter: row => {
            return {
              UNKNOWN: "未知",
              WAIT: "未结算",
              FINISH: "已结算"
            }[row.performancestatus];
          }
        },
        {
          label: "操作",
          align: "center",
          width: 120,
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini"
                round
                onClick={() =>
                  this.$router.push({
                    name: "distributor_settlement_details",
                    params: { id: row.id }
                  })}
              >
                明细
              </el-button>&nbsp;
              {row.performancestatus === "WAIT" ? (
                <el-button
                  onClick={() => this.gotoSettle(row.id)}
                  size="mini"
                  round
                >
                  标记结算
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
  mounted(){
    this.resetData();
  },
  methods: {
    gotoSettle(id) {
      this.$confirm("请确认财务是否打款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          agencySettleApi
            .update({ id: id, performancestatus: "FINISH" })
            .then(res => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getList(this.tableParams);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    resetData(){
      const date = new Date();
      const mounth = date.getMonth();
      const year = date.getFullYear();
      let now = year + '-' + mounth;
      this.queryParams.month = new Date(now).getTime();
    },
    getList(params) {
      if (this.queryParams.month) {
        const month = this.$dateFilter(this.queryParams.month, "yyyy-MM");
        _.extend(params, { month: month });

      }
      agencySettleApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

