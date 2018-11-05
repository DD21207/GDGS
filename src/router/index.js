import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Forget from '@/views/forgetPass.vue'
import Home from '@/views/home.vue'
import index from '@/views/index.vue'
import newsList from '@/views/newsList.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/Forget',
    name: 'Forget',
    component: Forget
  }
  ,{
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [{
        path: '/index',
        component: index
      }, {
        path: '/newsList',
        component: newsList
      }]
  }]
})
