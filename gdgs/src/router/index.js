import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Forget from '@/views/forgetPass.vue'
import Edit from '@/views/editPass.vue'
import Home from '@/views/home.vue'
import index from '@/views/index.vue'
import newsList from '@/views/newsList.vue'
import userGroup from '@/components/userGroup.vue'
import detailEdit from '@/components/detailEdit.vue'
import addNew from '@/components/addNew.vue'
import materialControl from '@/components/materialControl.vue'
import equipmentControl from '@/components/equipmentControl.vue'
import project from '@/components/project.vue'
import delectProject from '@/components/delect.vue'
import siteIndex from '@/components/siteHeader/siteIndex.vue'
import estItem from '@/components/siteHeader/estItem.vue'
import estItemAdd from '@/components/siteHeader/estItemAdd.vue'
import orderList from '@/components/siteHeader/orderList.vue'
import addOrder from '@/components/siteHeader/addOrder.vue'
import orderDetail from '@/components/siteHeader/orderDetail.vue'
import updateProgress from '@/components/siteHeader/updateProgress.vue'



Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    name: 'gdgs',
    redirect: '/Home'},{
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/Forget',
    name: 'Forget',
    component: Forget
  }, {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [{
      path: '/index',
      component: index
    }, {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    }, {
      path: '/newsList',
      component: newsList
    }, {
      path: '/userGroup',
      name: 'userGroup',
      component: userGroup
    }, {
      path: '/materialControl',
      name: 'materialControl',
      component: materialControl
    }, {
      path: '/equipmentControl',
      name: 'equipmentControl',
      component: equipmentControl
    }, {
      path: '/project',
      name: 'project',
      component: project
    }, {
      path: '/delectProject',
      name: 'delectProject',
      component: delectProject
    }, {
      path: '/detailEdit',
      name: 'detailEdit',
      component: detailEdit
    }, {
      path: '/addNew',
      name: 'addNew',
      component: addNew
    },{
      path: '/siteIndex',
      name: 'siteIndex',
      component: siteIndex
    },{
      path: '/estItem',
      name: 'estItem',
      component: estItem
    },{
      path: '/estItemAdd',
      name: 'estItemAdd',
      component: estItemAdd
    },{
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },{
      path: '/addOrder',
      name: 'addOrder',
      component: addOrder
    },{
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },{
      path: '/updateProgress',
      name: 'updateProgress',
      component: updateProgress
    }]
  }]
})
