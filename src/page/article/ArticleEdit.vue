<template>
    <page>
        <el-row slot="header" :span="24">
            <el-col :span="16">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/advert/manager' }">文章管理</el-breadcrumb-item>
                    <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-form :rules="rules" labelPosition="left" :model="queryParams" ref="queryParams" labelWidth="100px" size="small">
            <el-form-item label="标题" prop="title">
                <el-input placeholder="请输入文章标题" v-model="queryParams.title" style="width: 70%"></el-input>
            </el-form-item>
            <!--<el-form-item label="code" prop="title">-->
                <!--<el-input placeholder="请输入文章code" v-model="queryParams.code" style="width: 70%"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="正文" prop="content">
                <WangEditor v-model="queryParams.content"></WangEditor>
            </el-form-item>
            <el-form-item class="text-center" style="margin-top: 50px">
                <el-button type="primary" size="small" @click="save()">保存</el-button>
                <el-button type="primary"  size="small" @click="preview = true">预览</el-button>
                <el-dialog :title= queryParams.title :visible.sync="preview" >
                    <p v-html="queryParams.content"></p>
                </el-dialog>
                <el-button type="default" size="small"  @click="$router.go(-1)" style="margin-left: 10px">取消</el-button>
            </el-form-item>

        </el-form>
    </page>




</template>
<style>
    .image-type{
        width: 375px;
    }
</style>
<script>

   import WangEditor from "@/components/common/WangEditor.vue";
    import { getArticeleDetailApi,articeleEditApi} from './api'
        import {articalApi} from '@/api'


    export default {
        mounted(){
            this.getDetail()
        },

        methods:{
            getDetail(){
                var vm = this
                articalApi.get({id:this.$route.params.id}).then(function (res) {
                    vm.queryParams = res
                })
            },
            save(){
                if(this.queryParams.title.length == 0){
                    this.$message({type:'error',message:'请填写标题'})
                    return
                }
                if(this.queryParams.code.length == 0){
                    this.$message({type:'error',message:'请填写code'})
                    return
                }
                if(this.queryParams.content.length == 0){
                    this.$message({type:'error',message:'请填写内容'})
                    return
                }
                var vm = this
                articeleEditApi(this.$route.params.id,this.queryParams).then(function (res) {
                    vm.$message({type:'success',message:'创建成功'})
                    vm.$router.go(-1)
                }).catch(function (res) {
                    vm.$message({message: res.response.data.message,type: 'error'});
                })
            }
        },
        components:{

            WangEditor,
        },
        data(){
            var validateTitle = (rule, value, callback) => {
                if (value === ""){
                    callback(new Error("请输入标题"));
                }else{
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === ""){
                    callback(new Error("请输入用Code"));
                }else{
                    callback();
                }
            };
            var validateContent = (rule, value, callback) => {
                if (value === ""){
                    callback(new Error("请输入正文"));
                }else{
                    callback();
                }
            };
            return{
                baseUrl:"",
                preview:false,
                queryParams:{
                    title:"",
                    items:[],
                },
                list:[],
                rules:{
                    title:[
                        {required:true,validator:validateTitle,tigger:"blur"}
                    ],
                    code:[
                        {required:true,validator:validateCode,tigger:"blur"}
                    ],
                    content:[
                        {required:true,validator:validateContent,tigger:"blur"}
                    ],

                }
            }
        }
    }

</script>