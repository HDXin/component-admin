<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item>待审核分销员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form inline>
      <k-form-item label="提交日期" 
                   type="date-picker" v-model="queryParams.beginDate"></k-form-item>
      <k-form-item label="至"
                   type="date-picker" v-model="queryParams.endDate"></k-form-item>
      <k-form-item label="姓名"
                   v-model="queryParams.fullName"></k-form-item>
      <k-form-item label="手机号"
                   v-model="queryParams.cellphone"></k-form-item>
      <k-form-item label="状态"
                   type="select"
                   v-model="queryParams.status">
        <el-option value=""
                   label="全部"></el-option>
        <el-option value="WAIT_APPROVAL"
                   label="待审批"></el-option>
        <el-option value="SUCCESS"
                   label="通过"></el-option>
        <el-option value="FAIL"
                   label="拒绝"></el-option>
      </k-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search">搜索</el-button>
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
import { AgencyApplyApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      queryParams:{
        fullname:'',
        cellphone:'',
        status:'',
        beginDate:'',
         endDate:""
      },
      columns: [
        {
          label:'ID',
          prop:'agencyApplyId'
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
          label: "申请时间",
          align: "center",
          render: (h, { row }) => {
            return h("span", null, [this.$dateFilter(row.createTime)]);
          }
        },
        {
          label: "状态",
          align: "center",
          prop: "status",
          formatter: row => {
            return {
              WAIT_APPROVAL: "待审批",
              SUCCESS: "通过",
              FAIL: "拒绝"
            }[row.status];
          }
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => (
            <div>
              {row.status == "WAIT_APPROVAL" ? (
                <el-button
                  size="mini" round
                  onClick={() =>
                    this.$router.push({
                      name: "distributor_pending_audit_info",
                      params: { id: row.agencyApplyId }
                    })}
                >
                  审核
                </el-button>
              ) : (
                ""
              )}

              <el-button
                size="mini" round
                onClick={() => this.remove(row.agencyApplyId)}
              >
                删除
              </el-button>
            </div>
          )
        }
      ]
    };
  },
  methods: {
    remove(id) {
      this.$confirm("确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          AgencyApplyApi.delete({ agencyApplyId: id })
            .then(res => {
              this.getList();
              this.$message({
                message: "成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                message: err.message,
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "取消",
            type: "info"
          });
        });
    },
    getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
        if(this.queryParams.beginDate){ 
                var beginDate = this.$dateFilter(this.queryParams.beginDate,'yyyy-MM-dd')
                _.extend(params,{beginDate:beginDate})
            }
              if(this.queryParams.endDate){
                var endDate = this.$dateFilter(this.queryParams.endDate,'yyyy-MM-dd')
                _.extend(params,{endDate:endDate})
            }
      AgencyApplyApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

