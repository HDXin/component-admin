<script>
import $config from "@/api/config";
export default {
  name: "Upload",
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    limit: Number,
    action: {
      type: String,
      default: `${$config.imageUrl[$config.env.NODE_ENV]}single`
      // required: true
    },
    accept: {
      type: String
      // default:'iamge/*'
    },
    listType: {
      type: String,
      default: "picture-card"
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  computed: {
    fileList: function() {
      return this.value.map(item => {
        if (/(download)|(http:\/\/)/.test(item.url)) {
          return item;
        } else {
          return Object.assign(item, {
            url: `${$config.imageUrl[$config.env.NODE_ENV]}download${item.url}`
          });
        }
      });
    }
  },
  render(h) {
    const uploadData = {
      props: {
        "on-change": this.handleChange,
        "on-progress": this.handleProgress,
        "on-success": this.handleSuccess,
        "on-error": this.handleError,
        "on-preview": this.onPreview,
        "on-remove": this.handleRemove,
        action: this.action,
        "list-type": this.listType,
        "file-list": this.fileList,
        accept: this.accept,
        data: this.data
      }
    };
    return h(
      "div",
      {
        class: {
          "upload-hidden": this.limit == this.fileList.length
        }
      },
      [
        h(
          "el-upload",
          {
            ...uploadData
          },
          [this.$slots.default]
        ),
        this.listType !== "text"
          ? h(
              "el-dialog",
              {
                props: {
                  visible: this.dialogVisible,
                  size: "tiny"
                },
                on: {
                  close: () => {
                    this.dialogVisible = false;
                  },
                  open:() =>{
                    this.dialogVisible = true;
                  }
                }
              },
              [<img src={this.dialogImageUrl} style="width:100%;" />]
            )
          : ""
      ]
    );
  },
  methods: {
    handleChange(file, fileList) {
      this.$emit("input", fileList);
    },
    handleProgress(file) {},
    onPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    handleSuccess(response, file, fileList) {
      this.$emit("input", fileList);
      this.$emit("onSuccess", response, file, fileList);
    },
    handleError(err, file, fileList) {
      this.$emit("input", fileList);
      this.$emit("onError", err, file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(fileList);
      this.$emit("input", fileList);
      this.$emit("onRemove", file, fileList);
    }
  }
};
</script>
<style lang="less">
.upload-hidden {
  .el-upload {
    display: none;
  }
}
</style>

