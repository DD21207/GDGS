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
import projectDetail from '@/components/siteHeader/projectDetail.vue'
import buyerIndex from '@/components/buyer/buyerIndex.vue'
import MaterialDetails from '@/components/buyer/MaterialDetails.vue'
import buyerOrderList from '@/components/buyer/buyerOrderList.vue'
import buyerOrderDetail from '@/components/buyer/buyerOrderDetail.vue'
import projectList from '@/components/accounting/projectList.vue'
import projectDetailAccount from '@/components/accounting/projectDetailAccount.vue'
import checkTotal from '@/components/accounting/checkTotal.vue'
import priceList from '@/components/accounting/priceList.vue'
import projectListFinance from '@/components/finance/projectList.vue'
import projectDetailFinance from '@/components/finance/projectDetailFinance.vue'
import supplierList from '@/components/finance/supplierList.vue'
import supplierDetail from '@/components/finance/supplierDetail.vue'
import logisticalList from '@/components/finance/logisticalList.vue'
import addNewFinance from '@/components/finance/addNewFinance.vue'
import salaryList from '@/components/finance/salaryList.vue'
import detailEditFinance from '@/components/finance/detailEditFinance.vue'
import projectListCompany from '@/components/company/projectList.vue'
import projectDetailCompany from '@/components/company/projectDetailCompany.vue'
import ledgerListCompany from '@/components/company/ledgerList.vue'
import reportList from '@/components/company/reportList.vue'
import closeProject from '@/components/company/closeProject.vue'
import projectListBalance from '@/components/balance/projectList.vue'
import projectDetailBalance from '@/components/balance/projectDetailBalance.vue'
import ledgerList from '@/components/balance/ledgerList.vue'
import addNewLedger from '@/components/balance/addNewLedger.vue'
import detailEditLedger from '@/components/balance/detailEditLedger.vue'
import showTable from '@/views/showTable.vue'











Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
  {
    path: '/',
    name: 'gdgs',
    redirect: '/Home'
  }, 
  {
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
      component: Edit,
      meta: {
        keepAlive: true
      },
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
    }, {
      path: '/siteIndex',
      name: 'siteIndex',
      component: siteIndex
    }, {
      path: '/estItem',
      name: 'estItem',
      component: estItem
    }, {
      path: '/estItemAdd',
      name: 'estItemAdd',
      component: estItemAdd
    }, {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    }, {
      path: '/addOrder',
      name: 'addOrder',
      component: addOrder
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    }, {
      path: '/updateProgress',
      name: 'updateProgress',
      component: updateProgress
    }, {
      path: '/projectDetail',
      name: 'projectDetail',
      component: projectDetail
    }, {
      path: '/buyerIndex',
      name: 'buyerIndex',
      component: buyerIndex
    }, {
      path: '/MaterialDetails',
      name: 'MaterialDetails',
      component: MaterialDetails
    }, {
      path: '/buyerOrderList',
      name: 'buyerOrderList',
      component: buyerOrderList
    }, {
      path: '/buyerOrderDetail',
      name: 'buyerOrderDetail',
      component: buyerOrderDetail
    }, {
      path: '/projectList',
      name: 'projectList',
      component: projectList
    }, {
      path: '/projectDetailAccount',
      name: 'projectDetailAccount',
      component: projectDetailAccount
    }, {
      path: '/checkTotal',
      name: 'checkTotal',
      component: checkTotal
    }, {
      path: '/priceList',
      name: 'priceList',
      component: priceList
    },
    {
      path: '/projectListFinance',
      name: 'projectListFinance',
      component: projectListFinance
    }, {
      path: '/projectDetailFinance',
      name: 'projectDetailFinance',
      component: projectDetailFinance
    }, {
      path: '/supplierList',
      name: 'supplierList',
      component: supplierList
    }, {
      path: '/supplierDetail',
      name: 'supplierDetail',
      component: supplierDetail
    }, {
      path: '/logisticalList',
      name: 'logisticalList',
      component: logisticalList
    },  {
      path: '/salaryList',
      name: 'salaryList',
      component: salaryList
    }, {
      path: '/addNewFinance',
      name: 'addNewFinance',
      component: addNewFinance
    }, {
      path: '/detailEditFinance',
      name: 'detailEditFinance',
      component: detailEditFinance
    }, {
      path: '/projectListCompany',
      name: 'projectListCompany',
      component: projectListCompany
    }, {
      path: '/projectDetailCompany',
      name: 'projectDetailCompany',
      component: projectDetailCompany
    }, {
      path: '/ledgerListCompany',
      name: 'ledgerListCompany',
      component: ledgerListCompany
    }, {
      path: '/reportList',
      name: 'reportList',
      component: reportList
    }, {
      path: '/closeProject',
      name: 'closeProject',
      component: closeProject
    }, {
      path: '/projectListBalance',
      name: 'projectListBalance',
      component: projectListBalance
    }, {
      path: '/projectDetailBalance',
      name: 'projectDetailBalance',
      component: projectDetailBalance
    }, {
      path: '/ledgerList',
      name: 'ledgerList',
      component: ledgerList
    }, {
      path: '/addNewLedger',
      name: 'addNewLedger',
      component: addNewLedger
    }, {
      path: '/detailEditLedger',
      name: 'detailEditLedger',
      component: detailEditLedger
    }, {
      path: '/showTable',
      name: 'showTable',
      component: showTable
    }]
  }]
})
