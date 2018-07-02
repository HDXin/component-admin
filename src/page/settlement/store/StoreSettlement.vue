<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>门店结算</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="门店名称" v-model="queryParams.storeName"/>
      <el-form-item label="日期">
        <el-date-picker v-model="queryParams.month"
                        type="month"
                        placeholder="选择月">
        </el-date-picker>
      </el-form-item>
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
  import {storeSettleApi} from "@/api";
  import {mixin} from "@/mixins/search";

  export default {
    mixins: [mixin],
    mounted() {
      this.resetData();
    },
    methods: {
      gotoSettle(row) {
        this.$confirm("请确认财务是否打款?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            storeSettleApi
              .update({id: row.storeId, month: row.month})
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
      resetData() {
        const date = new Date();
        const mounth = date.getMonth();
        const year = date.getFullYear();
        let now = year + '-' + mounth;
        this.queryParams.month = new Date(now).getTime();
      },
      getList(params) {
        if (this.queryParams.month) {
          var month = this.$dateFilter(this.queryParams.month, "yyyy-MM");
          _.extend(params, {month: month});
        }
        storeSettleApi.query(params).then(res => {
          this.tableData = res.items;
          this.total = res.total;
        });
      }
    },
    data() {
      return {
        total: 0,
        queryParams: {
          month: '',
          storeName: ''

        },
        tableData: [],
        columns: [
          {
            label: "门店名称",
            prop: "storeName"
          },
          {
            label: "月份",
            align: "center",
            prop: "month"
          },
          {
            label: "销售总额",
            align: "right",
            prop: "saleTotalPrice",
            formatter: row => row.saleTotalPrice / 100
          },
          {
            label: "销售利润",
            align: "right",
            prop: "saleProfit",
            formatter: row => row.saleProfit / 10000
          },
          {
            label: "提货利润",
            align: "right",
            prop: "pickupProfit",
            formatter: row => row.pickupProfit / 10000
          },
          {
            label: "结算金额",
            align: "right",
            prop: "settledAmount",
            formatter: row => row.settledAmount / 10000
          },
          {
            label: "状态",
            align: "right",
            prop: "settledStatus",
            formatter: row => {
              return {
                UNKNOWN: "未知",
                NOT_SETTLED: "待结算",
                SETTLED: "已结算"
              }[row.settledStatus];
            }
          },
          {
            label: "操作",
            align: "center",
            width: 150,
            render: (h, {row}) => (


              <div>
                <el-button
                  size="mini"
                  round
                  onClick={() =>
                    this.$router.push({
                      name: "store_settlement_details",
                      params: {id: row.storeId},
                      query: {month: row.month}
                    })}
                >
                  明细
                </el-button>
                &nbsp;
                {row.settledStatus === "NOT_SETTLED" && (
                  <el-button
                    onClick={() => this.gotoSettle(row)}
                    size="mini"
                    round
                  >
                    标记结算
                  </el-button>
                )}
              </div>
            )
          }
        ]
      };
    }
  }
</script>

