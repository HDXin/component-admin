<template>
  <div class="img-box">
    <img :src="url" @click="preview" style="cursor: pointer;"
         alt="">
    <el-dialog title="预览" width="20%" :visible.sync="dialogVisible">
      <img :src="url" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>
<script>
import $config from "@/api/config";
export default {
  name: "images",
  props: {
    src: String,
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      previewUrl:'',
      dialogVisible: false  
    }
  },
  computed: {
    url() {
      if (/(http:\/\/)|(https:\/\/)/i.test(this.src)) {
        return this.src;
      } else {
        return `${$config.imageUrl[$config.env.NODE_ENV]}download${this.src}`;
      }
    }
  },
  methods: {
    preview(){
      if(!this.dialog) return;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.img-box{
  display: inline-block;
  &>img{
    width: 100%;
  }
}
</style>


