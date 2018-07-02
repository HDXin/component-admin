<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
                     <el-breadcrumb-item>{{$route.query.type|type}}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="2">
                <el-button size="small"
                           @click="gotoAdd"
                           type="primary" :disabled="list.length>=4">新增</el-button>
            </el-col>
        </el-row>
      
        <el-table :data="list">
            <el-table-column label="商品ID"
                             align="center"
                             width="70px"
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
                             prop="title"></el-table-column>
            <el-table-column label="销售类型"
                             align="center"
                             width="100px"
                             >
                <template slot-scope="scope">
                         {{scope.row.goodsType|goodsType}}
                </template>                   
            </el-table-column>
         
            <el-table-column label="操作"
                             align="center"
                             width="100px">
                <template slot-scope="scope">
                   
                    <el-button type="text"
                               @click="gotoRemove(scope.row.id)">删除</el-button>
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
import { goodsRecommendApi} from "@/api";

export default {
  mixins: [mixin],
  data() {
    return {
      total: 0,
      list: [],
      queryParams: {
        name: ""
      }
    };
  },
  filters: {
      type:function(type){
        return {
            NEW_GOODS:'新品上架',
            GOODS_RECOMMEND:'产品推荐'    
          }[type]
      },
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
  methods: {
    gotoAdd(){
        this.$router.push({name:'推荐新增',query:{type:this.$route.query.type}})
    },
    shelvesChange(id,type){//shelvesChange 商品上下架状态改变
        editProductApi({id:id,shelves:!type}).then(res=>{
          
        })
    },
    gotoRemove(id) {
        var vm = this;
        this.$confirm(`是否删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            goodsRecommendApi.delete({id:id}).then(function (res) {
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
    getList(params) {
    params = _.extend(params,{type:this.$route.query.type})
      goodsRecommendApi.query(params).then(res => {
        this.list = res.items;
        this.total =res.total;
      });
    }
  }
};
</script>

