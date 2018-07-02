<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form inline>
      <k-form-item label="姓名"
                   v-model="queryParams.fullName"></k-form-item>
      <!-- <k-form-item label="权限"
                   type="select"></k-form-item> -->
    

   <el-form-item label="订单日期">
        <el-date-picker type="date"
                        v-model="queryParams.registerStartDate"
                        format="yyyy-MM-dd"
                        placeholder=""
                        :picker-options="purchaseEndDateOptionsStart"></el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker type="date"
                        v-model="queryParams.registerEndDate"
                        format="yyyy-MM-dd"
                        :picker-options="purchaseEndDateOptionsEnd"></el-date-picker>

      </el-form-item>
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
import { MallUserApi } from "../../api";
import { mixin } from "../../mixins/search";
export default {
  mixins: [mixin],
  data() {
    return {
      queryParams: {
        fullName: "",
        registerStartDate:'',
        registerEndDate:''
      },
      total: null,
      tableData: [],
      columns: [
        {
          label: "用户ID",
          prop: "userId",
          align:"center",
          width: 100
        },
        {
          label: "昵称",
          width:200,
          prop: "fullName"
        },
        {
          label: "身份证",
          width: 200,
          prop: "idcard"
        },
        {
          label: "手机号",
          prop: "cellphone"
        },
        {
          label: "性别",
          align:"center",
          width:50,
          render: (h, { row }) => h("span", null, [this.$gender(row.gender)])
        },
        {
          label: "注册时间",
          align:"center",
          width:120,
          prop: "createTime",
          formatter: row => {
            return this.$dateFilter(row.createTime,'yyyy-MM-dd hh:mm:ss');
          }
        },
      
        // {
        //   label: "权限",
        //   prop: "name"
        // },
        {
          label: "操作",
          align:"center",
          render: (h, { row }) => (
            <div>
              <el-button
                size="mini" round 
                onClick={() =>
                  this.$router.push({
                    name: "user_management_edit",
                    params: { id: row.userId }
                  })}
              >
                修改
              </el-button>&nbsp;
              <el-button size="mini" round onClick={()=>{
                this.$router.push({
                  name:'sale_order',
                  query:{userId:row.userId,offset:0,page:1,limit:10}
                  
                })
              }} >历史订单</el-button>
            </div>
          )
        }
      ]
    };
  },
   computed: {
    purchaseEndDateOptionsEnd: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.registerStartDate) {
            return (
              time.getTime() < new Date(self.queryParams.registerStartDate).getTime()
            );
          }
        }
      };
    },
    purchaseEndDateOptionsStart: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.queryParams.registerEndDate) {
            return (
              time.getTime() > new Date(self.queryParams.registerEndDate).getTime()
            );
          }
        }
      };
    }
  },
  methods: { 
    getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
     if (params.registerStartDate) {
        params.registerStartDate = this.$dateFilter(params.registerStartDate);
      }
      if (params.registerEndDate) {
        params.registerEndDate = this.$dateFilter(params.registerEndDate);
      }
      MallUserApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    }
  }
};
</script>

<style>

</style>
