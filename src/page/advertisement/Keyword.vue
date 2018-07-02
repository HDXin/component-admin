<template>
  <page>
      <el-breadcrumb separator=">" slot="header">
        <el-breadcrumb-item>热门关键词</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData">
        <el-table-column label="热门关键词">
          <template slot-scope="{row}">
            <el-input v-model="row.value" type="textarea" :disabled="disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <el-button type="primary" slot-scope="scope" size="small" @click="submit(scope.row,scope.$index)">{{disabled ? '编辑' : '保存'}}</el-button>
        </el-table-column>
      </el-table>
  </page>
</template>
<script>
import { KeywordApi } from "@/api";
export default {
  data () {
    return {
      tableData:[],
      disabled:true
    }
  },
  mounted () {
    this.getList();
  },
  methods: {
    submit(row,index){
      if(this.disabled) return this.disabled = false;
      let params = {
        name: index==0?"keyword":"STORE_CITIES",
        value: row.value
      }
      KeywordApi.create(params).then(res =>{
        // this.getList();
        this.disabled = true;
      }).catch(err =>{
        this.$message({
          message: err.message,
          type: 'error'
        });
      })
    },
    getList(){
      KeywordApi.query().then(res =>{
        this.tableData = res.items;
      }).catch(err =>{
        this.$message({
          message: err.message,
          type: 'error'
        });
      })
    }
  }
}
</script>

