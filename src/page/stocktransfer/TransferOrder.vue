<template>
  <Page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>调货管理</el-breadcrumb-item>
          <el-breadcrumb-item>调货单</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              class="text-right">
        <!-- <el-button type="primary"
                   size="small"
                   @click="$router.push('/transfer/create_transfer_order')">新增调货单</el-button> -->
      </el-col>
    </el-row>

    <el-form inline>
      <k-form-item label="发货门店"
                   v-model='queryParams.fromStoreName'></k-form-item>
      <k-form-item label="收获门店"
                   v-model='queryParams.toStoreName'></k-form-item>
      <k-form-item label="状态"
                   v-model="queryParams.stockTransferOrderStatus"
                   type="select">
        <el-option value=""
                   label="全部"></el-option>
        <el-option value="WAIT_SHIPMENTS"
                   label="待发货"></el-option>
        <el-option value="WAIT_RECEIVE"
                   label="待收货"></el-option>
        <el-option value="FINISH"
                   label="已完成"></el-option>
      </k-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange" />
  </Page>
</template>
<script>
import { StockTransferOrderApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      queryParams: {
        stockTransferOrderStatus: "",
        fromStoreName: "",
        toStoreName: ""
      },
      columns: [
        {
          label: "调货单",
          prop: "stockTransferOrderNo"
        },
        {
          label: "类型",
          align: "center",
          prop: "type",
          formatter: row => {
            return {
              INPUT: "调入",
              OUTPUT: "调出"
            }[row.type];
          }
        },
        // {
        //   label: "发货方",
        //   // prop: "fromStoreName"
        //   render: (h, { row }) => {
        //     return h("span", null, [
        //       row.fromStoreId ? row.fromStoreName : "平台",
        //      h("div",null,[
        //        row
        //         // fromStoreTime
        //       ])
        //     ]);
        //   }
        // },
        {
          label: "发货方",
          // prop: "fromStoreName"
          render: (h, { row }) => {
            return (
               <div>
                 {row.fromStoreId ? row.fromStoreName : "平台"}
                 <div>{this.$dateFilter(row.fromStoreTime)}</div>
               </div>
            )
          }
        },
        {
          label: "收货方",
          prop: "toStoreName",
          render:(h,{row})=>{
            return(
               <div>{this.$dateFilter(row.toStoreTime)}</div>
            )
          }
        },
        {
          label: "商品",
          prop: "goodsName"
        },
        {
          label: "规格",
          prop: "subTitle"
        },
        {
          label: "数量",
          align: "center",
          prop: "quantity"
        },
        {
          label: "状态",
          align: "center",
          prop: "stockTransferOrderStatus",
          formatter: row => {
            return {
              WAIT_SHIPMENTS: "待发货",
              WAIT_RECEIVE: "待收货",
              FINISH: "已完成"
            }[row.stockTransferOrderStatus];
          }
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => (
            <div>
              {row.stockTransferOrderStatus == "WAIT_SHIPMENTS" ? (
                <el-button
                  size="mini"
                  round
                  type="success"
                  plain
                  onClick={() => this.receive(row.id, "WAIT_RECEIVE")}
                >
                  确认发货
                </el-button>
              ) : row.stockTransferOrderStatus == "WAIT_RECEIVE" ? (
                <el-button
                  size="mini"
                  round
                  type="warning"
                  plain
                  onClick={() => this.receive(row.id, "FINISH")}
                >
                  确认收货
                </el-button>
              ) : (
                ""
              )}
              &nbsp;<el-button
                size="mini"
                round
                onClick={() => this.gotoDetail(row.id)}
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
      StockTransferOrderApi.query(params)
        .then(res => {
          this.tableData = res.items;
          this.total = res.total;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    gotoDetail(id) {
      this.$router.push({ name: "transfer_order_detail", params: { id: id } });
    },
    receive(id, status) {
      const title =
        status == "WAIT_RECEIVE" ? "是否确认发货？" : "是否确认收货";
      this.$msgbox({
        title: "提示",
        message: title,
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(action => {
        StockTransferOrderApi.update({
          id: id,
          stockTransferOrderStatus: status
        })
          .then(res => {
            this.getList();
          })
          .catch(err => {
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      });
    }
  },
  components: {}
};
</script>
