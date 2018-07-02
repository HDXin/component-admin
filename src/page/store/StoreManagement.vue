<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>门店管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              class="text-right">
        <el-button type="primary"
                   size="small"
                   @click="$router.push({name:'store_management_create'})">新增</el-button>
      </el-col>
    </el-row>

    <el-form inline>
      <k-form-item label="名称"
                   v-model="queryParams.storeName"></k-form-item>
      <k-form-item label="电话"  v-model="queryParams.tel">></k-form-item>
      <k-form-item label="门店状态"
                   v-model="queryParams.storeStatus"
                   type="select">
        <el-option value=""
                   label="全部"></el-option>
        <el-option value="ENABLE"
                   label="正常"></el-option>
        <el-option value="DISABLE"
                   label="停用"></el-option>
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

    <el-dialog title="门店详情"
               :visible.sync="dialogVisible"
               width="30%">
      <StoreInfo :model="model"></StoreInfo>
    </el-dialog>
  </page>
  <!-- 暂时放这里<el-button size="mini" round onClick={() => this.getInfo(row.storeId)}>
                查看
              </el-button>&nbsp; -->
</template>
<script>
import { StoreApi } from "../../api";
import { mixin } from "@/mixins/search";
import StoreInfo from "@/components/store/StoreInfo";
export default {
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      total: null,
      queryParams: {
        storeName: "",
        storeStatus: "",
        tel:''
      },
      dialogVisible: false,
      model: {},
      columns: [
        {
          label: "ID",
          prop: "storeId",
          align: "center",
          width: 50
        },
        {
          label: "封面图",
          width: 120,
          render: (h, { row }) => (
            <images
              src={row.coverImage}
              alt=""
              style="width:80px;height:80px"
            />
          ),
          width: 100
        },
        {
          label: "名称",
          prop: "storeName"
        },
        {
          label: "地址",
          width: 200,
          render: (h, { row }) => {
            return h("div", null, [
              `${row.provinceName ? row.provinceName : ""} ${row.cityName
                ? row.cityName
                : ""} ${row.countyName ? row.countyName : ""}`
            ]);
          }
        },
        {
          label: "营业时间",
          render: (h, { row }) =>
            h("span", null, [row.openingStart, "-", row.openingEnd])
        },
        {
          label: "联系电话",
          prop: "tel"
        },
        /*{
          label: "商品数",
          prop: "id"
        },*/
        {
          label: "门店状态",
          align:"center",
          width:100,
          prop: "storeStatus",
          formatter: row => {
            return {
              ENABLE: "正常",
              DISABLE: "停运"
            }[row.storeStatus];
          }
        },
        {
          label: "操作",
          align: "center",
          width: 150,
          render: (h, { row }) => (
            <div>
              <el-button size="mini" round onClick={() => this.getInfo(row.storeId)}> 
                查看
              </el-button> 
              &nbsp;
              <el-button
                size="mini" round 
                onClick={() =>
                  this.$router.push({
                    name: "store_management_edit",
                    params: { id: row.storeId }
                  })}
              >
                编辑
              </el-button>&nbsp;
              <el-button
                size="mini" round 
                onClick={() =>
                  this.$router.push({
                    name: "store_goods",
                    params: { id: row.storeId },
                    query: { storeName: row.storeName }
                  })}
              >
                商品
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
          StoreApi.delete({ storeId: id })
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
            message: "取消删除",
            type: "info"
          });
        });
    },
    updateStatus(id, status) {
      status = status == "ENABLE" ? "DISABLE" : "ENABLE";
      this.$confirm("确定执行此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          StoreApi.update({ storeId: id, storeStatus: status })
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
    },
    getList(params = Object.assign({}, this.queryParams, this.tableParams)) {
      StoreApi.query(params).then(data => {
        this.tableData = data.items;
        this.total = data.total;
      });
    },
    getInfo(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        StoreApi.get({ storeId: id }).then(res => {
          this.model = res;
        });
      });
    }
  },
  filters: {},
  components: {
    StoreInfo
  }
};
</script>
