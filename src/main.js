// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import {
  post,
  fetch,
  patch,
  put
} from './api/ajax'
import store from './store/store'
import {
  XTable,
  Previewer,
  Cell,
  Range,
  XNumber,
  XTextarea,
  Datetime,
  PopupPicker,
  Group,
  XInput,
  XButton,
  Panel,
  Divider,
  LoadMore,
  LoadingPlugin,
  ToastPlugin,
  AlertPlugin,
  TransferDom,
  XHeader,
  ViewBox,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  ConfirmPlugin,
  Badge,
  Tab,
  TabItem
} from 'vux'
import axios from 'axios'
import 'babel-polyfill'
import $ from 'jquery'
import Es6Promise from 'es6-promise'




//兼容低版本浏览器 promise
Es6Promise.polyfill();

//Vuex状态管理
Vue.use(Vuex)

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.component('x-header', XHeader)
Vue.component('view-box', ViewBox)
Vue.component('tabbar', Tabbar)
Vue.component('grid', Grid)
Vue.component('load-more', LoadMore)
Vue.component('divider', Divider)
Vue.component('panel', Panel)
Vue.component('grid-item', GridItem)
Vue.component('tabbar-item', TabbarItem)
Vue.directive('transfer-dom', TransferDom)
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('datetime', Datetime)
Vue.component('popup-picker', PopupPicker)
Vue.component('x-textarea', XTextarea)
Vue.component('badge', Badge)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-number', XNumber)
Vue.component('range', Range)
Vue.component('cell', Cell)
Vue.component('previewer', Previewer)
Vue.component('x-table', XTable)


Vue.config.productionTip = false




// vux点击事件优化
const FastClick = require('fastclick');
FastClick.attach(document.body);

//$http引用axios做ajax请求
Vue.prototype.$http = axios
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;



/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
