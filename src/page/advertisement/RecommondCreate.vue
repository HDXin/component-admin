<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="2">
                <el-button size="small"
                           @click="$router.go(-1)"
                           type="primary">返回</el-button>
            </el-col>
        </el-row>
       
        <el-table :data="list">
            <el-table-column label="ID"
                             align="center"
                             width="100px"
                             prop="goodsId">

                <!-- {{row.brandId}} -->
            </el-table-column>
            <el-table-column label="主图"
                             align="center"
                             width="100px"
                             >
                      <template slot-scope="scope">
                            <images style="width:100%" :src="scope.row.coverImage" alt=""></images>
                </template>
                        
            </el-table-column>
            <el-table-column label="名称"
                             align="left"
                             prop="title"></el-table-column>
            <el-table-column label="销售类型"
                             align="center"
                             width="200px"
                             >
                <template slot-scope="scope">
                         {{scope.row.goodsType|goodsType}}
                </template>                   
            </el-table-column>
            <el-table-column label="商品类别"
                             align="center"
                             width="200px"
                             prop='categoryName'>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="100px">
                <template slot-scope="scope">
                 
                    <el-button size="mini" round 
                               @click="gotoRemove(scope.row.goodsId)" :disabled="!hasId(scope.row.goodsId)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
   <div class="text-center">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="tableParams.page"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
    </page>
</template>
<script>
import { mixin } from "../../mixins/search";
import {goodsRecommendApi,goodsRecommendCreateApi,getProductListApi} from "@/api";

export default {
  mixins: [mixin],
  data() {
    return {
       ids:[],
      total: 0,
      list: [],
      queryParams: {
        name: ""
      }
    };
  },
  filters: {
      shelves:function(type){
          return {
            true:'已上架',
            false:'已下架'    
          }[type]
      },
      goodsType:function(type){
        return {
            SALE:'销售商品',
            PRESALE:'预售商品'    
          }[type]
      }
  },
   mounted(){
    
     
  
      
    },

  methods: {
      hasId(id){
          var ids = this.ids
          for(var i =0; i<ids.length;i++){
              if(id == ids[i].goodsId){
                   return false
                   break;
              }
          }
          return true
      
    },
    gotoRemove(id) {
        var vm = this;
        this.$confirm(`是否添加?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            goodsRecommendCreateApi.create({goodsId:id,type:this.$route.query.type}).then(function (res) {
                vm.$message({
                    type:'success',
                    message:"添加成功"
                })
                vm.getList(vm.tableParams)
                       vm.$router.go(-1);
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
    getList(params) {
      getProductListApi(params).then(res => {
        this.list = res.items;
        this.total =res.total;
        var queryParams = _.extend({},params,{type:this.$route.query.type})
        goodsRecommendApi.query(queryParams).then(data=>{
            this.ids = data.items
           
        })

      });
    }
  }
};
</script>

