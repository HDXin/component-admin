<template>
    <page>
        <el-row slot="header"
                :span="24">
            <el-col :span="22">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$route.params.id?'编辑文章':'创建文章'}}</el-breadcrumb-item>
                </el-breadcrumb>

            </el-col>
            <el-col :span="2">
                <el-button @click='gotoAdd' type="primary">新增</el-button>
            </el-col>
        </el-row>
        <el-form labelPosition="left"
                 :model="queryParams"
                 labelWidth="100px"
                 size="small">
            <el-form-item label="文章标题:"
                         >
                <el-input v-model='queryParams.title' style="width:50%"></el-input>
            </el-form-item>
            <el-form-item>
                <div v-for="(item,index) in list"
                     :key='index'>
                    <el-col :span='24'
                            style="margin-top:20px">
                        <ArticalComponet :models.sync='item'
                                         :index='index'
                                         @remove='remove'></ArticalComponet>
                    </el-col>
                </div>
            </el-form-item>
            <el-form-item style="text-align:center"
                          v-if='list.length != 0'>
                <el-button @click='save'
                           size="large"
                           type='primary'>保存</el-button>
            </el-form-item>
        </el-form>

    </page>

</template>
<style>
.image-type {
  width: 375px;
}
</style>
<script>
import ArticalComponet from "./ArticalComponet.vue";
import { articalApi } from "@/api";
export default {
  mounted() {
    if (this.$route.params.id) {
      this.list = [];
      this.getDetail();
    }
  },

  methods: {
    getDetail() {
      articalApi.get({ id: this.$route.params.id }).then(item => {
        this.queryParams.title = item.title;
        this.list = item.contentItemList.map(res => {
          if (res.type == "txt") {
            return res;
          } else {
            return { ...res, imgContent: [{ url: res.content }] };
          }
        });
      });
    },
    save() {
      var list = this.list.map(item => {
        if (item.type == "txt") {
          delete item["imgContent"];
          return item;
        } else {
          if (this.$route.params.id) {
            if (item.imgContent.length) {
              item.content = item.imgContent[0].hasOwnProperty("response")
                ? item.imgContent[0].response
                : item.imgContent[0].url.match(/download(\S*)/)[1];
            } 
               delete item["imgContent"];
                return item;
          } else {
            item.content = item.imgContent[0].response;
            delete item["imgContent"];
            return item;
          }
          //处理图片
        }
      });
      var form = { ...this.queryParams, contentItemList: list };

      if (this.$route.params.id) {
        var forms = _.extend({id:this.$route.params.id},form)
          articalApi.update(forms).then(res => {
        this.$message({
          type: "success",
          message: "编辑成功"
        });
        this.$router.go(-1)
      });
      }else{
     articalApi.create(form).then(res => {
        this.$message({
          type: "success",
          message: "创建成功"
        });
              this.$router.go(-1)
      });
      }
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    gotoAdd() {
      this.list.push({
        type: "txt",
        content: "",
        displayOrder: "",
        imgContent: []
      });
    }
  },
  components: {
    ArticalComponet
  },
  data() {
    return {
      queryParams: {
        title: ""
      },
      list: [
        { type: "txt", content: "", displayOrder: "", imgContent: [] }
      ]
    };
  }
};
</script>