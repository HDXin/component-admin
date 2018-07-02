<template>
  <Page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>广告和推荐</el-breadcrumb-item>
                     <el-breadcrumb-item>轮播图</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="2">
                <el-button size="small"
                           @click="$router.push({name:'广告新增',params:{}})"
                           type="primary">新增</el-button>
            </el-col>
        </el-row>
  
    <el-form inline>
      <k-form-item label="广告名称" v-model='queryParams.title'></k-form-item>
      <el-form-item>
        <el-button type="primary" @click='search'>搜索</el-button>
        <el-button  @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns" :total="total"
             @current-change="handleCurrentChange"
             layout="prev, pager, next" />
  </Page>
</template>
<script>
import { SwiperApi } from "@/api";
import { mixin } from "@/mixins/search";
export default {
  methods: {
    getList(parmas) {
      SwiperApi.query(parmas).then(res => {
        this.tableData = res.items;
        this.total = res.total
      });
    },
    gotoRemove(id) {
        var vm = this;
        this.$confirm(`是否删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            SwiperApi.delete({id:id}).then(function (res) {
                vm.$message({
                    type:'success',
                    message:"删除成功"
                })
                vm.getList(vm.tableParams)
        
        }).catch(err => {
            this.$message.error(err.message);
    })
    }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消'
        });
    });
      
    },
  },
  mixins: [mixin],

  data() {
    return {
      total: 0,
      queryParams: {},
      tableData: [
        
      ],
      columns: [
        {
          label: "序号",
          type: "index",
          width: 50,
          align: "center"
        },
        {
          label: "广告名称",
          prop: "title",
          width: 400
        },
        {
          label: "有效期开始",
          align: "center",
          render: (h, { row }) => (
           <span>{this.$dateFilter(row.startTime)}</span> 
          )
          
        },
        {
          label: "有效期截止",
          align: "center",
           render: (h, { row }) => (
           <span>{this.$dateFilter(row.endTime)}</span> 
          )
        },
        {
          label: "状态",
          prop: "status",
          align: "center",
          formatter: row => {
            return {
              ENABLE: "启用",
              DISABLE: "禁用",
            }[row.status];
          }
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => <div>
          <el-button   onClick={() =>
                this.$router.push({
                  name: "广告编辑",
                  params: { id: row.id }
                })} size="mini" round>编辑</el-button>
             <el-button onClick={()=>{
                  this.gotoRemove(row.id)
              }} size="mini" type="danger" round> 删除</el-button>
           </div>
        }
      ]
    };
  }
};
</script>

