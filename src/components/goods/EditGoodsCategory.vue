<template>
  <el-dialog title="编辑"
             size="small"
             @open="open"
             :close-on-click-modal="false"
             :visible.sync="dialogVisible">
    <el-row>
      <el-col :span="20"
              :offset="1">
        <el-form label-width="200px"
                 :model="model"
                 :rules="rules"
                 ref="form">
          <el-form-item label="图标"
                        prop="icon">
            <Upload :limit="1"
                    :data="{notCompress:true}"
                    v-model="model.icon">
              <i class="el-icon-plus"></i>
            </Upload>
            <div>上传图片尺寸60*60</div>
          </el-form-item>
          <k-form-item label="类别名称"
                       v-model="model.name"
                       prop="name"></k-form-item>
          <!-- <k-form-item label="类别代码" v-model="model.code"></k-form-item> -->
          <el-form-item>
            <el-button type="primary"
                       @click="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </el-dialog>
</template>
<script>
import { GoodsCategoryApi } from "@/api";
export default {
  props: ["id", "visible"],
  data() {
    return {
      model: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        icon:[{required: true, message: "请上传图片", trigger: "change",type:'array' }]
      }
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.getInfo();
      });
    },
    getInfo() {
      GoodsCategoryApi.get({ categoryId: this.id })
        .then(data => {
          data.icon = [{url:data.icon}];
          this.model = data;
        })
        .catch(err => {
          this.$message({
            message: err,
            message,
            type: "error"
          });
        });
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
         let params = Object.assign({},this.model, { parentId: this.parentId });
        params.icon = params.icon[0].response || params.icon[0].url.match(/download(\S*)/)[1];
        GoodsCategoryApi.update(params)
          .then(res => {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.$emit("on-success");
          })
          .catch(err => {
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      });
    }
  }
};
</script>

