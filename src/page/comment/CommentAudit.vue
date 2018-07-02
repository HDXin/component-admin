<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item>商品评价</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form inline>
      <k-form-item label="评价用户"
                   v-model="queryParams.userName"></k-form-item>
      <k-form-item label="状态"
                   type="select"
                   v-model="queryParams.status">
        <el-option value=""
                   label="全部"></el-option>
        <el-option value="ENABLE"
                   label="启用"></el-option>
        <el-option value="DISABLE"
                   label="禁用"></el-option>
      </k-form-item>
      <k-form-item label="时间"
                   type="date-picker" v-model="queryParams.startTimeStr"></k-form-item>
      <k-form-item label="至"
                   type="date-picker" v-model="queryParams.endTimeStr">></k-form-item>
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
  </page>
</template>
<script>
import { ReviewApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      queryParams: {
        startTimeStr:'',
        endTimeStr:'',
        userName: "",
        status: ""
      },
      columns: [
        {
          label: "ID",
          prop: "id",
          align: "center",
          width: 70
        },
        {
          label: "评价用户",
          width: 100,
          prop: "fullName"
        },
        {
          label: "商品名称",
          width: 120,
          prop: "title"
        },
        {
          label: "规格",
          width: 100,
          prop: "subTitle"
        },
        {
          label: "评价内容",
          prop: "description"
        },
        {
          label: "晒图",
          width: 300,
          align: 'center',
          render: (h, { row }) => {
            return (
              <div>
                {row.images
                  ? row.images.map(item => {
                      return <images src={item} style="margin-right:5px;width:80px;" dialog/>;
                    })
                  : ""}
              </div>
            );
          }
        },
        {
          label: "评价时间",
          align: "center",
          width: 100,
          prop: "createTime",
          formatter: row => this.$dateFilter(row.createTime,'yyyy-MM-dd hh:mm:ss')
        },
        {
          label: "状态",
          //   prop: "id",
          width: 50,
          render: (h, { row }) => {
            return h("span", null, [row.status == "ENABLE" ? "显示" : "隐藏"]);
          }
        },
        {
          label: "操作",
          width: 150,
          align: "center",
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini"
                round
                onClick={() => this.audit(row)}
                class={{ "text--danger": row.status == "ENABLE" }}
              >
                {row.status == "ENABLE" ? "隐藏" : "显示"}
              </el-button>&nbsp;
              <el-button
                size="mini"
                round
                class="text--danger"
                onClick={() => this.remove(row.id)}
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
    getList(params = Object.assign({}, this.tableParams)) {
      if (params.startTimeStr) {
        params.startTimeStr = this.$dateFilter(params.startTimeStr);
      }
      if (params.endTimeStr) {
        params.endTimeStr = this.$dateFilter(params.endTimeStr);
      }
      ReviewApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    },
    audit(row) {
      let title = row.status == "ENABLE" ? "隐藏" : "显示",
        status = row.status == "ENABLE" ? "DISABLE" : "ENABLE";

      this.$confirm(`确定${title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ReviewApi.update({ id: row.id, status: status })
            .then(res => {
              this.getList();
              this.$message({
                message: "成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                message: "取消",
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
    remove(id) {
      this.$confirm("确定执行删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ReviewApi.delete({ id: id })
            .then(res => {
              this.$message({
                message: "成功",
                type: "success"
              });
              this.getList();
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
    }
  }
};
</script>

