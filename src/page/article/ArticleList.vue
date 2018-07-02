<template>
    <page>
        <el-row slot="header" :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
                  <el-col :span="2">
                           <el-button type="primary" size="small" @click="$router.push({name:'创建文章',params:{}})">新增</el-button>
                  </el-col>
            
        </el-row>
        <el-form :inline="true" :model="queryParams" ref="queryParams" size="small">
            <el-form-item label="标题:">
                <el-input placeholder="请输入文章标题" v-model="queryParams.title"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list">
            <el-table-column
                    label="ID"
                    align="center">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="文章标题">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <!-- <el-table-column align="center"
                             label="articleCode">
                <template slot-scope="scope">
                    {{scope.row.code}}
                </template>
            </el-table-column> -->
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | dateFilter}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <div class="opreator-cell">
                        <el-button round @click="previewAction(scope.row)" size="mini">预览</el-button>
                        <el-button round @click="$router.push({name:'编辑文章',params:{id:scope.row.id},query:$route.query})"
                                   size="mini">编辑
                        </el-button>
                        <el-button round type="danger" @click="gotoRemove(scope.row.id)" size="mini">删除</el-button>

                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="text-center">
            <el-dialog :title=content.title :visible.sync="preview" @open='open'>
                <div v-for='(item,index ) in content.contentItemList' :key='index'>
                    <div v-if="item.type=='txt'">
                        <div>
                            {{item.content}}
                        </div>
                    </div>
                    <div v-else>
                        <div>
                            <images style="width:100%" :src="item.content" alt=""></images>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

        <el-row type="flex">
           
            <el-col>
                <el-pagination class="text-right"
                               @current-change="handleCurrentChange"
                               :current-page="tableParams.page"
                               layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </page>


</template>
<style>
    .image-type{
        width: 375px;
    }
</style>
<script>

    import {getArticleListApi, getArticeleDetailApi,articleDeleteApi} from './api'
    import {articalApi} from '@/api'
    import { mixin } from "@/mixins/search";
 

    export default{
        mixins:[mixin],
        mounted: function () {
        },
        methods: {
            open(){
             
            },
            previewAction(item){
                this.preview = true
                articalApi.get({id:item.id}).then(res=>{
                    this.content = res
                })
              
            },
            getList(params) {
                var vm = this;
                articalApi.query(params).then(function (res) {
                    vm.list = res.items
                    vm.total = res.total
                })
            },
            gotoRemove(row) {
                var vm = this;
                this.$confirm('是否删除该文章?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    articalApi.delete({id:row}).then(function (data) {
                        vm.$message.success('删除成功');
                        vm.getList(vm.tableParams)
                    }).catch(err => {
                        vm.$message({message: res.response.data.message,type: 'error'});
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }

        },

        components: {

        },
        data(){
            return {
                content: {},
                previewTitle: "文章标题",
                preview: false,
                list: [],
                queryParams: {
                    title: "",
                },           
                currentPage: 1,
                total: 0,

            }


        },
    
    }
  
</script>
