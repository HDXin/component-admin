<template>
    <Page>
        <el-row slot="header"
                :span="24">
            <el-col :span="20">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>广告管理</el-breadcrumb-item>
                    <el-breadcrumb-item>广告编辑</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-form ref="form"
                 :model="form"
                 style="margin-right: 20px"
                 label-width="130px"
                 :rules="rules">
            <el-form-item label="广告名称:"
                          prop="title"
                          style="width:60%;">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        <el-form-item required  label="图片:">
        <Upload v-model='form.image'
                :limit='1'>
          <i class="el-icon-plus"></i>
        </Upload>
      </el-form-item>
            <el-form-item required
                          label="选择日期"
                          prop="startTime">
                <el-date-picker v-model="form.startTime"
                                type="date"
                                placeholder="选择日期时间"
                                :picker-options="purchaseEndDateOptionsStart">
                </el-date-picker>
                -
                <el-date-picker v-model="form.endTime"
                                type="date"
                                placeholder="选择日期时间"
                                :picker-options="purchaseEndDateOptionsEnd">
                </el-date-picker>

            </el-form-item>

            <el-form-item label="链接目标:"
                          style="width:100%"
                          prop="link">
                <el-input v-model="form.link"
                          style="width:55%">

                </el-input>

            </el-form-item>
            <el-form-item label="排序:"
                          prop="displayOrder"
                          style="width: 300px;">
                <el-input type="number"
                          v-model="form.displayOrder"></el-input>
            </el-form-item>
            <el-form-item label="状态:"
                          prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio label="ENABLE"
                             >启用</el-radio>
                    <el-radio label="DISABLE"
                              >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-top: 50px">
                <div class="text-center">
                    <el-button type="primary"
                               style="width:100px"
                               @click="gotoSave('form')">保存</el-button>
                    <el-button style="width:100px"
                               @click="$router.go(-1)">取消</el-button>
                </div>
            </el-form-item>

        </el-form>
    </Page>

</template>
<script>
//    import from

//    import { login as imageUrl } from '../../api/index'
import { SwiperApi } from "@/api";
// import { formatDate } from "../../filter/date-format.js";

export default {
  name: "categoryEdit",

  methods: {
   hasValue(data, rule) {
      Object.keys(data).forEach(function(k) {
        if (rule.hasOwnProperty(k)) {
          rule[k] = data[k];
        }
        return true;
      });
    },
    getDetail(){
        SwiperApi.get({id:this.$route.params.id}).then(res=>{
           this.hasValue(res,this.form);
           this.form.image = [{url:this.form.image}]
           this.form.endTime = new Date( this.form.endTime)
           this.form.startTime = new Date( this.form.startTime)
        })
    },
    gotoSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           var form =  _.clone(this.form)
     form.image = form.image[0].hasOwnProperty('response')?form.image[0].response:form.image[0].url.match(/download(\S*)/)[1]
      _.extend(form,{id:this.$route.params.id})
           SwiperApi.update(form).then(res => {
                this.$message({
                    type:'success',
                    message:'编辑成功'
                })
                this.$router.go(-1)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  data() {
     var quantity = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入大于0的数字'));
                } else {
                    var values =  Number(value)
                    if (!Number.isInteger(values)) {
                        callback(new Error('请输入数字'));
                    }
                    if (values<0) {
                        callback(new Error('请输入大于0的数字'));
                    }
                    callback();
                }
                callback();
            };
    return {
   
      form: {
        title: "",
        status: "ENABLE",
        endTime: "",
        image: [],
        link: "",
        startTime: "",
        displayOrder:''
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        startTime: [
          { required: true, type: "date", message: "请输入开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, type: "date", message: "请输入结束时间", trigger: "blur" }
        ],
        link: [{ required: true, message: "请输入连接地址", trigger: "blur" }],
        displayOrder:[ {required: true, validator: quantity, trigger: 'blur' }],
      }
    };
  },
  mounted: function() {
     this.getDetail()
  },
  computed: {
    purchaseEndDateOptionsEnd: function() {
      var self = this;

      return {
        disabledDate(time) {
          if (self.form.startTime) {
            return time.getTime() < new Date(self.form.startTime).getTime();
          }
        }
      };
    },
    purchaseEndDateOptionsStart: function() {
      var self = this;
      return {
        disabledDate(time) {
          if (self.form.endTime) {
            return time.getTime() > new Date(self.form.endTime).getTime();
          }
        }
      };
    }
  },

  filters: {}

  //
};

function dateFilter(time) {
  let date = new Date(time);
  return formatDate(date, "yyyy-MM-dd");
}
</script>
<style scoped>
.source {
  margin-top: 10px;
  padding: 10px;
  margin-right: 20px;
  background-color: #eff2f7;
  margin-bottom: 20px;
}
</style>
