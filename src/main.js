// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import {post,fetch,patch,put} from './api/ajax'
import store from './store/store'
import { LoadingPlugin, ToastPlugin, AlertPlugin,TransferDom,XHeader,ViewBox, Tabbar, TabbarItem,Grid, GridItem} from 'vux'
import axios from 'axios' 
import 'babel-polyfill'
import Es6Promise from 'es6-promise'




//兼容低版本浏览器 promise
Es6Promise.polyfill();

//Vuex状态管理
Vue.use(Vuex)

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)


Vue.component('x-header', XHeader)
Vue.component('view-box', ViewBox)
Vue.component('tabbar', Tabbar)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('tabbar-item', TabbarItem)
Vue.directive('transfer-dom', TransferDom)


Vue.config.productionTip = false




// vux点击事件优化
const FastClick = require('fastclick');
FastClick.attach(document.body);

//$http引用axios做ajax请求
Vue.prototype.$http = axios
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
