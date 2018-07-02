<template>
  <div class="main-layout">
    <header class="layout-header clearfix">
      <span class="left-menu-placeholder"
            align="left">
             <h2 class="logo">运营管理平台</h2>
        <!-- <img src="../../assets/logo.png" -->
             alt="" />
      </span>
      <el-menu class="offset-left-menu nav-top"
               background-color="#26344b"
               text-color="#fff"
               :default-active="routePath"
               mode="horizontal">
        <!-- <el-menu-item v-menu='{url:item.url}' @click='gotoChange(item)' v-for='item in getMenuList' :index="item.url"  style="margin-right:50px">
                    <span>{{item.name}}</span>
                </el-menu-item> -->
        <template v-for='(item,index)  in getMenuList'>
          <el-menu-item @click='gotoChange(item)'
                        :key='index'
                        :index="changeMenuId(item.menuId)"
                        style="margin-right:25px">
            <span>{{item.name}}</span>
          </el-menu-item>
        </template>

        <!-- <el-menu-item  @click='gotoChange(item)' index='2' style="margin-right:50px">
                    <span>test</span>
                </el-menu-item>
                 -->
        <el-submenu index="user"
                    id='user'
                    class="pull-right"
                    style="margin-right:20px;float:right;">
          <template slot="title">&nbsp;{{getUserName}}</span>
          </template>
          <el-menu-item index="user.fix"
                        @click='dialogFormVisible=true'> 修改密码</el-menu-item>
          <el-menu-item index="user.logout"
                        @click="exit">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </header>

    <LeftSliderBar class="left-menu"></LeftSliderBar>
    <div class="layout-body">
      <PassWordReset :dialogVisible="dialogFormVisible"
                     @on-result-change="dialogFormVisibleChange"></PassWordReset>
      <router-view></router-view>
    </div>

  </div>
</template>

<style lang="less" >
.main-layout .el-submenu.is-active .el-submenu__title {
  // border-bottom-color: transparent;
  color: #1fbba6;
}
.main-layout .el-menu--horizontal .el-submenu:hover .el-submenu__title {
  // border-bottom-color: transparent;
  color: #1fbba6;
}
.main-layout .el-menu--horizontal .el-submenu > .el-menu > li:hover {
  // border-bottom-color: transparent;
  color: #1fbba6;
}
.main-layout {
  padding-top: 60px;
}
.layout-header {
  background: #26344b;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.left-menu-placeholder {
  float: left;
  img {
    margin-top: 10px;
    height: 40px;
    /*text-align: center;*/
    margin-left: 10px;
  }
}
.nav-top {
  padding-left: 15px;
  .el-menu-item {
    padding: 0;
    a {
      display: inline-block;
      padding: 0 20px;
    }
  }
}
.logo {
  position: absolute;
  top: 0;
  background: #26344b;
  z-index: 9999;
  // width: 200px;
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
</style>
<script>
//    import {logoutApi} from "../api/api";
import { user as UserLogic, common } from "./logic";
import PassWordReset from "./PassWordReset.vue";
import LeftSliderBar from "./LeftSliderBar.vue";

export default {
  name: "menu",
  data: function() {
    return {
      list: [],
      selfData: [],
      parentData: [],
      statu: 1,
      routePath: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {}
    };
  },
  computed: {
    getMenuList() {
      if(!UserLogic.getProfile()){
             return this.exit()
      }
      return UserLogic.getProfile().menus;
    },
    getUserId: function() {},
    getUserName: function() {
      if (common.getCommon() == null) {
              return this.exit()
      }
      return common.getCommon().userName;
    }
  },
  watch: {
    $route: "setActiveMenu"
  },

  mounted: function() {
      this.$nextTick(res=>{
        this.setActiveMenu()
    })
  
  },
  components: {
    PassWordReset,
    LeftSliderBar
  },
  methods: {
    changeMenuId(id) {
      return String(id);
    },
    setActiveMenu() {
      this.getSelfData(UserLogic.getProfile().menus, this.$route.path);
      this.list = UserLogic.getProfile().menus;
      if(this.selfData.length>0){
         this.getParentData(
        UserLogic.getProfile().menus,
        this.selfData[0].parentId
      );
      }
      if(this.parentData.length>0){
       this.routePath = String(this.parentData[this.parentData.length - 1]);
      console.log(this.routePath)
      }
     
    },
     matchRouterPath(routerPath, url){
        if (routerPath == url) {
            return true;
        }

        var arr = location.href.split('#');
        var absPath = arr[0] + "#" + routerPath;
        if ( absPath == url) {
            return true;
        }
        return false;
    },
    getSelfData(data, url) {
      var vm = this;
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (this.matchRouterPath(url,  data[i].url)) {
            vm.selfData.push(data[i]);
            break;
          }
          if (data[i].hasOwnProperty("children")) {
            vm.getSelfData(data[i].children, url);
          }
        }
      }
    },
     getParentData(data, parentId) {
      var vm = this;
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (parentId == data[i].menuId) {
            vm.parentData.push(data[i].menuId);
            vm.getParentData(vm.list, data[i].parentId);
          }
          if (data[i].hasOwnProperty("children")) {
            vm.getParentData(data[i].children, parentId);
          }
        }
      }
    },
    gotoChange(item) {
      window.$moduleMain.$emit("menuChange", item);
    },
    dialogFormVisibleChange(value) {
      this.dialogFormVisible = value;
    },
    getPath() {
      let path = this.$route.path;
      // this.routePath =this.$route.path;
      if (/^\/system/.test(path)) {
        this.routePath = "system";
      }
    },
    exit: function() {
      //退出
      let vm = this;
      window.localStorage.clear();
      window.location.href =  '/portal/#/login'

    }
  }
};
</script>

