<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
         
        </el-row>
      
        <el-table :data="list">
            <el-table-column label="排序"
                            width="50px"
                            type='index'
                             align="center"
                          >

                <!-- {{row.brandId}} -->
            </el-table-column>
            <el-table-column label="推荐位名称"
                             align="center"
                             >
                      <template slot-scope="scope">
                         {{scope.row.name}}
                </template>
                        
            </el-table-column>
     
      
            <el-table-column label="操作"
                             align="center"
                             width="200px">
                <template slot-scope="scope">
                    <el-button size="mini" round @click='$router.push({name:"推荐详情",query:{type:scope.row.type}})'>查看</el-button>
                 
                </template>
            </el-table-column>
        </el-table>
         <!-- <div class="text-right">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="tableParams.page"
                           layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div> -->
  
    </page>
</template>
<script>



export default {

  data() {
    return {
      total: 0,
      list: [
          {
              name:'新品上架',
              type:'NEW_GOODS'
          },
          {
              name:'产品推荐',
              type:'GOODS_RECOMMEND'
          }
      ],
     
    };
  },
  filters: {
    
      
  },
  methods: {
      gotoDetail(){

      },    
  }
};
</script>

