<template>
    <div>
        <el-table  :data="list"
                  border>
            <el-table-column align="center"
                             label="商品名称">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="商品规格">
                <template slot-scope="scope">
                    {{scope.row.subTitle}}
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="数量">
                <template slot-scope="scope">
                    {{scope.row.goodsCount}}
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="本次拆分数">
                <template slot-scope="scope">
        
                    <el-input @blur='gotoChange($event,scope.row.goodsCount)' v-model.number='scope.row.count' type="number"></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="单价">
                <template slot-scope="scope">
                    {{scope.row.price}}
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="金额">
                <template slot-scope="scope">
                    {{scope.row.total}}
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px;text-align: right">
            <el-col :span='24'>合计商品数:{{count}} &nbsp;&nbsp;&nbsp;&nbsp; 合计金额:{{total}}</el-col>
          
        </el-row>

    </div>
</template>
<script>
export default {
  props: ["value"],
  computed: {
      count(){
          var count = 0;
           _.forEach(this.list,res=>{
               count+=res.goodsCount
           })
           return count
      },
      total(){
           var total = 0;
           _.forEach(this.list,res=>{
               total+=res.total
           })
           return total
      },
    //     list:{
    //       get(){
    //           return this.value
    //       },
    //       set(val){
             
    //           this.$emit('input',val);
    //       }
    //   }
  },
  data() {
    return {
    //   list: []
    };
  },
  methods: {
      gotoChange(event, counts){
        //   console.log(value);
              if (!event.target.value) {
                  return this.$message.error('请输入拆分数')
                } else {
                    // var values =  Number(value)
                    // if (!Number(values)) {
                    //      return this.$message.error('请输正数数字')
                    // }
                    if (event.target.value<0||event.target.value>counts) {
                     
                          event.target.value = 0;
                        // this.list = [];
                        // this.$set(this,'list',arr)
                        // this.list = arr
                           return this.$message.error('请输大于0小于'+counts+'的数量')
                    }
               
                }
                this.$emit('input',this.list)
      
             

      
      }
  },

  watch: {
    // dataList: {
    //   handler(val) {
    //      var arr = _.clone(val);
    //      _.forEach(arr,res=>{
    //          _.extend(res,{count:''})
    //      })
    //      this.list = arr
    //   },
    //   immediate: true,
    //   deep:true
    // },
    value:{
        handler(val) {
        this.list = val
      },
      immediate: true,
      deep:true
    }
  },

};
</script>

