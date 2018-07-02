<template>
    <div>
        <el-form ref='form'
                 :model="form"
                 :inline="true"
                 :rules="rules">
            <el-row>
                <el-col :span="4">
                    <el-form-item label="规格"
                                  prop='attrValue'>
                        <el-input v-model="form.attrValue"
                                  placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="单价"
                                  prop='price'>
                        <el-input v-model="form.price"
                                  placeholder="">
                                  <el-button slot="append">元</el-button>
                                  </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="原价"
                                  prop='priceTicket'>
                        <el-input v-model="form.priceTicket"
                                  placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item class='productForm'>
                        <!-- <el-button type='default'
                                   @click="gotoSave"
                                   size="mini">保存</el-button> -->
                        <el-button type='danger'
                                   @click=gotoRemove
                                   size="mini">删除</el-button>
                        <el-button type="success"
                                   size="mini"
                                   @click="gotoAdd"
                                   v-if='length-1==index'>添加</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>
<script>
export default {
  props: ["index", "length", "item"],
  watch: {
    item: {
      handler(val) {
          this.$nextTick(()=>{
                  this.form = val
          })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    gotoAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("saveForm", this.index, this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$emit("saveForm", this.index, this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoRemove() {
      this.$emit("remove", this.index);
    }
  },
  data() {
    var amounts = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入数字"));
      } else {
        var values = Number(value);
        if (!Number(values)) {
          callback(new Error("请输入数字"));
        }
        if (values < 0) {
          callback(new Error("请输入大于0的数字"));
        }
        callback();
      }
      callback();
    };
    var quantity = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入数量"));
      } else {
        var values = Number(value);
        if (!Number.isInteger(values)) {
          callback(new Error("请输入数字"));
        }
        if (values < 0) {
          callback(new Error("请输入大于0的数字"));
        }
        callback();
      }
      callback();
    };
    return {
      rules: {
           attrValue: [{ required: true, message:'请输入商品规格',trigger: "blur" }],
        price: [{ required: true, validator: amounts, trigger: "blur" }],
        priceTicket: [{ required: true, validator: amounts, trigger: "blur" }]
      },
      form: {
        priceTicket: "",
        price: "",
        attrValue: ""
      }
    };
  }
};
</script>
<style>
  .productForm{
    padding-top:40px;
  }
</style>


