<template>
  <Page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form :inline="true"
             :model="queryParams">
      <el-form-item label="项目名称">
        <el-input placeholder="请输入"
                  v-model="queryParams.saleOrderNo"></el-input>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-select v-model='queryParams.saleOrderStatus'
                   placeholder="请选择">
          <el-option value=''
                     label="全部">全部</el-option>
          <el-option value='ENABLE'
                     label="启用">启用</el-option>
          <el-option value='DISABLE'
                     label="禁用">禁用</el-option>
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
          label: "项目编号",
          align: "center",
          prop: "projectNo"
        },
        {
          label: "项目名称",
          align: "center",
          prop: "project"
        },
        {
          label: "创建时间",
          align: "center",
          prop: "name",
          formatter: row => {
            return this.$dateFilter(row.createTime);
          }
        },
        {
          label: "启用状态",
          align: "center",
          prop: "orderType",
          formatter: row => {
            return this.$goodsTypeFilter(row.orderType);
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
                    name: "email_template",
                    params: { id: row.id }
                  })}
              >
                配置
              </el-button>
              {row.saleOrderStatus == "ENABLE" ? (
                <el-button size="mini" round onClick={()=>{
                  this.orderCancel(row)
                }}>
                  警用
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

