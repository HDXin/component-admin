<template>
    <div class="com-page"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(255, 255, 255, 0.3)">
        <div class="com-page-header">
            <slot name="header"></slot>
        </div>
        <div class="com-page-body">
            <slot></slot>
        </div>
        <div class="com-page-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style scoped>
.com-page-header {
  padding: 10px 15px;
  background-color: #eff2f7;
}
.com-page-body {
  padding: 15px;
  min-height: 75vh;
}
.com-page-footer {
  text-align: right;
  padding-right: 15px;
}
</style>
<script>
export default {
  name: "Page",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>