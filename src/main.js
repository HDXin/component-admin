// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
var router = require('./router/_import_'+process.env.NODE_ENV).default


import 'normalize.css'
import ElementUI from 'element-ui'
require("wangeditor/dist/css/wangEditor.less");
// import 'element-ui/lib/theme-default/index.css'
import '../theme/index.css'
import './style/index.less'
import Page from './components/layout'
import Table from './components/table'
import './components/common'
import './filters';
Vue.use(ElementUI);
Vue.use(Page);
Vue.use(Table);

import lodash from './components/common/lodash.js'
Vue.use(lodash);

Object.rmEmpty = ((obj) => {
  let params = Object.assign({}, obj);
  for (let key in params) {
    if (!params[key]) delete params[key];
  }
  return params;
});

import './components/form'
import './components/upload'

Vue.config.productionTip = false

/* eslint-disable no-new */
var global = typeof window === 'object' ? window : this
global.$moduleMain = new Vue({
    el: '#app',
    router,
    render:h => <App />
})