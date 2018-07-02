<template>
    <span class="impSkuDialog text-left">

        <el-button  @click="dialogVisible = true" size="mini"  round  type="default">审核</el-button>
        <el-dialog title="退款审核" :visible.sync="dialogVisible" size="small" :close-on-click-modal="false" @open="handleOpen" >
            <el-form :model="form" label-width="150px" label-position="left"  ref="ruleForm" :rules="rules">
                <el-form-item label="用户:" >
                    <span v-if='detail.payer'>   {{detail.payer.fullName}}</span>
                
                </el-form-item>
                <el-form-item  label="退款金额:">
                     ￥  {{detail.refundAmount/100}}
                </el-form-item>
                <el-form-item   label="类型:" >
               
                </el-form-item>
                <el-form-item  label="商品:">
                       <span v-html="detail.goodsInfoStr"></span> 
                </el-form-item>
                <el-form-item   label="申请时间:" >
                      {{detail.createTime |dateFilter('yyyy-MM-dd hh:mm:ss')}}
                </el-form-item>
                <el-form-item  label="备注:">
                    <span v-if='detail.returnGoodsResp'>
                        {{detail.returnGoodsResp.returnDesc}}
                    </span>
                          
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="gotoReset('REFUND')">同意退款</el-button>
                 <el-button type="danger" @click="gotoReset('FAIL')">拒绝退款</el-button>
            </div>
        </el-dialog>
    </span>
</template>
<script>
    import{refundApi} from '@/api'
    export default{
        name:'CardDialog',
        props:['id'],
        components:{
         
        },
        data(){
            return {
                isShow:false,
                myForm:{
                    branchId:'',
                    branchBankName:'',
                    superBankCode:'',
                    areaCode:"",
                },
                areaCode:'',
                account:'',
                cityAreacode:'',
                nodeNodecode:'',
                allBank:[],
                provice:[],
                city:[],
                conty:[],
                dialogVisible: false,
                detail:{},
                form:{
                    acctNo:'',
                    contyCode:'',
                    superBankCode:'',
                    nodeNodecode:'',
                    cityAreacode:'',
                    keyword:'',
                    checkAmount:'',
                },
                dataId:'',
                rules: {
                    


                }
            }
        },
        computed:{

        },
        mounted(){
     

        },
        watch:{
          
        },


        filters:{

        },


        methods: {
           handleOpen(){
            refundApi.get({id:this.id}).then(res=>{
                this.detail = res;
                var arr = []
                 _.forEach(this.detail.returnGoodsResp.items,res=>{
                     var str = '<div>'+res.goodsTitle + '|' + res.skuTitle +'</div>'
                     arr.push(str)
                 })
                 var goodsInfoStr = arr.join('')
                 _.extend(this.detail,{goodsInfoStr:goodsInfoStr})
              
                //  this.detail.returnGoodsResp.items.map(res=>{
                //      var str = res.goodsTitle + '|' + res.skuTitle +'<br/>'
                     
                //  })
            })
           },
           gotoReset(type){
               console.log(type)
               refundApi.changeStatu({id:this.id,refundStatus:type}).then(res=>{
                    this.$message({type:'success',message:'操作成功'})
                                  this.dialogVisible = false
               })
           }
        }
    }

</script>
<style >
.text-left{
    text-align: left;
}
    /* .el-input{
        width: 60%;
    }
    .el-select{
        width: 60%;
    }
    .el-autocomplete{
        width: 60%;
    }
    .margin-bottom {
        margin-bottom: 20px;
    }
    .dialog{
        width: 100%;
        min-height:250px;
        overflow-y:auto;
        max-height:300px;
    } */
</style>
