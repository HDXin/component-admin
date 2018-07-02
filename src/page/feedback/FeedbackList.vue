<template>
    <page>
        <el-row slot="header">
            <el-col :span="10">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>投诉列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-form inline>
      <k-form-item label="昵称"  v-model="queryParams.applicantName" />
                <el-form-item label="日期">
        <el-date-picker v-model="queryParams.createDate"
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
import { feedbackeApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  methods: {
    gotoSettle(id) {
      this.$confirm("请确认是否标为已读", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          feedbackeApi
            .update({ id: id})
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
    getList(params) {
      if (this.queryParams.createDate) {
        console.log(this.queryParams.month);
        var month = this.$dateFilter(this.queryParams.createDate, "yyyy-MM");
        _.extend(params, { createDate: month });
      }
      feedbackeApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  },
  data() {
    return {
         total:0,
      queryParams: {
          applicantName:'',
          createDate:''

      },
      tableData: [],
      columns: [
        {
          label: "ID",
          prop: "id",
          align: "center",
        },
        {
          label: "用户昵称",
          align: "center",
          prop: "applicantName"
        },
        {
          label: "提交时间",
          align: "center",
          prop: "createTime",
         formatter: row => {
            return this.$dateFilter(row.createTime);
          }
        },
        {
          label: "反馈内容",
          align: "center",
          prop: "description"
        },     
        {
          label: "操作",
          align: "center",
          width: 150,
          render: (h, { row }) => (
        

             <div>
              {row.replyStatus == "UNKNOWN" ? (
                <el-button
                  onClick={() => this.gotoSettle(row.id)}
                  size="mini"
                  round
                >
                  标为已读
                </el-button>
              ) : (
                "已读"
              )}
            </div>
          )
        }
      ]
    };
  }
}
</script>

