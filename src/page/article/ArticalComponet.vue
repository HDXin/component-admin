<template>
    <div>

        <el-row :span='24'>
            <el-col :span='3'>
                <el-select v-model="dataModel.type"
                           placeholder="请选择">
                    <el-option label="文本"
                               value="txt">
                    </el-option>
                    <el-option label="图片"
                               value="image">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span='dataModel.type == "txt"?10:4' :offset="1">
                <el-input v-if='dataModel.type == "txt"'
                          type="textarea"
                          :autosize="{ minRows: 4, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="dataModel.content">
                </el-input>
           
                <Upload v-else v-model='dataModel.imgContent'
                        :limit='1'>
                    <i class="el-icon-plus"></i>
                </Upload>
        
            </el-col>
             <!-- <el-col :span='5' :offset="1">
                 <el-input type="text" v-model='dataModel.link'>
                     <el-button slot="prepend" >链接地址:</el-button> 
                </el-input>
             </el-col> -->
             <el-col :span='3' :offset="1">
                 <el-input type="text" v-model='dataModel.displayOrder'>
                     <el-button slot="prepend" >排序:</el-button> 
                </el-input>
             </el-col>
             <el-col :span='3' :offset="1">
                 <el-button type="danger" @click='gotoRemove'>删除</el-button>
             </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
      return{

      }
  },
  methods: {
     gotoRemove(){
        this.$emit('remove',this.index) 
    }
  },
  props: ["models",'index'],
  computed: {
    dataModel: {
      get() {
        return this.models;
      },
      set(val) {
        this.$emit("update:models", val);
      }
    }
    //  isDisabled:{
    //    get() {
    //     return !this.model;
    //   },
    //   set(val) {
    //     this.$emit("update:model", val);
    //   }  
    // },
  }
};
</script>

