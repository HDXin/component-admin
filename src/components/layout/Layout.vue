<template>
    <el-container>
        <el-aside class="layout-sider">
            <h2 class="logo">组件管理</h2>
            <LayoutSider></LayoutSider>
        </el-aside>
        <el-container class="layout-container">
            <el-header class="layout-header">
                <LayoutHeader></LayoutHeader>
            </el-header>
            <el-main class="layout-content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import LayoutHeader from "./Header";
import LayoutSider from "./Sider";
export default {
  computed: {},
  components: {
    LayoutHeader,
    LayoutSider
  }
};
</script>
<style lang="less" scoped>
// .layout {
//     // display: flex;
//     position: relative;
// }

.layout-sider {
  z-index: 999;
  width: 200px !important;
  padding-top: 60px;
  min-height: 100vh;
  background-color: #26344b;
  transition: 0.9s width ease-in-out;
}

.logo {
  position: absolute;
  top: 0;
  background: #26344b;
  z-index: 9999;
  width: 300px;
  height: 30px;
  padding: 15px;
  margin: 0;
  color: #fff;
  line-height: 32px;
  text-align: left;
  font-size: 22px;
  font-weight: normal;
  transition: 0.9s width ease-in-out;
}
.layout-header {
  width: 100%;
  height: 60px !important;
  background: #26344b;
  padding-left: 20px;
}

.layout-content {
  background: #ffffff;
  min-height: 83vh;
  padding: 0;
}
</style>
