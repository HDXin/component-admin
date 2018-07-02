<template>
  <Page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item>调货管理</el-breadcrumb-item>
      <el-breadcrumb-item>调货申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form inline>
      <k-form-item label="广告名称"></k-form-item>
      <k-form-item label="状态"
                   type="select"></k-form-item>
      <k-form-item label="开始时间"
                   type="date-picker"></k-form-item>
      <k-form-item label="截止时间"
                   type="date-picker"></k-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns" />
    <el-dialog title="选择门店"
               @open="open"
               :visible.sync="dialogVisible">
      <select-store ref="selectStore"
                    :applyInfo="applyInfo"
                    @close="close" />
    </el-dialog>
  </Page>
</template>
<script>
import { stockTransferApplyApi } from "@/api";
import selectStore from "@/components/store/SelectStore";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      applyInfo: {},
      columns: [
        {
          label: "ID",
          width: 50,
          prop: "id"
        },
        {
          label: "申请门店",
          prop: "storeName"
        },
        {
          label: "商品",
          prop: "goodsName"
        },
        {
          label: "申请数量",
          prop: "quantity"
        },
        {
          label: "规格",
          prop: "subTitle"
        },
        {
          label: "状态",
          render: (h, { row }) => {
            return h("span", null, [
              this.$stockTransferStatusFilter(row.stockTransferStatus)
            ]);
          }
        },
        {
          label: "发起时间",
          prop: "createTime"
        },
        {
          label: "操作",
          render: (h, { row }) => (
            <div>
              {row.stockTransferStatus == "WAIT_EXECUTION" ? (
                <el-button size="mini" round onClick={() => this.selectStore(row)}>
                  选择门店
                </el-button>
              ) : (
                <el-button size="mini" round onClick={() => this.gotoDetail(row.id)}>
                  查看调货单
                </el-button>
              )}
            </div>
          )
        }
      ]
    };
  },
  methods: {
    selectStore(row) {
      this.dialogVisible = true;
      this.applyInfo = row;
    },
    getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
      stockTransferApplyApi
        .query(params)
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
    open() {
      this.$nextTick(() => {
        this.$refs.selectStore.getList();
      });
    },
    close(res) {
      this.dialogVisible = false;
      if (res) {
        this.getList();
      }
    },
    gotoDetail(id) {
      this.$router.push({ name: "transfer_order", query: { toStoreId: id } });
    }
  },
  components: {
    selectStore
  }
};
</script>


