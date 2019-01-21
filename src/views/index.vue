<template>
  <div id="index_div" style="height:100%;">
    <div class="header_div"></div>
    <div class="logo_box">
      <div class="logo_img">
        <img :src="logo_url" alt="">
        </div>
        <div class="name_box">
          <span>{{username}}</span>
          <p>您的角色为<span style="color:red">{{usergroup}}</span></p>
        </div>
      </div>
      <div class="item_box">
        <grid :cols="3">
          <grid-item v-for="(item,i) in functionList" :key="i" :link="item.url">
            <span slot="icon" class="iconfont" :class="item.className" style="font-size:38px;"></span>
            <label>{{item.label}}</label>
          </grid-item>
        </grid>
      </div>
      <div class="bottom_div">
      </div>
    </div>
</template>
<script>
export default {
  name: 'index_div',
  data() {
    return {
      logo_url: "",
      username: "",
      functionList: [],
      usergroup: "",
      newsList: [],
      newsIndex:0
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.onloadIndex()
  },
  watch: {

  },
  methods: {
    onloadIndex() {
      this.$store.commit('isShow', 'home');
      this.$store.commit('changeTitle', 'GDGS')
      this.$store.commit('changeBtn', 'home');


      this.$post('/get-user-info.do').then(response => {
        if (response.status === 0) {
          this.username = response.data.username;
          this.usergroup = response.data.usergroup;
          if (response.data.headimgurl) {
            this.logo_url = response.data.headimgurl;
          }
          this.groupList(response.data.usergroupCode)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });

      this.$fetch('/news/list.do').then(response => {
        if (response.status === 0) {
          this.newsList = this.newsList.concat(response.data);
          this.newsTip()
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });

      
    },
    newsTip() {
      var _this = this;

      if (_this.newsList.length != 0) {
        if (_this.newsIndex == _this.newsList.length - 1) {
          this.$vux.confirm.show({
            title:'您有'+ _this.newsList.length + '条消息需要处理',
            content: _this.newsList[_this.newsIndex],
            'confirm-text': '确认',
            'cancel-text': '取消',
            // 组件除show外的属性
            onCancel() {
              _this.$vux.confirm.hide()
            },
            onConfirm() {
              _this.$vux.confirm.hide()
            }
          })
        }else{
          this.$vux.confirm.show({
            title:'您有'+ _this.newsList.length + '条消息需要处理',
            content: _this.newsList[_this.newsIndex],
            'confirmText': '下一条',
            'cancelText': '取消',
            // 组件除show外的属性
            onCancel() {
              _this.$vux.confirm.hide()
            },
            onConfirm() {
              _this.newsIndex +=1;
              _this.newsTip()
            }
          })
        }
      }

    },
    groupList(group) {
      switch (group) {
        case 0:
          var functionItem = {};
          functionItem['className'] = 'icon-usergroup';
          functionItem['label'] = '系-用户管理'
          functionItem['url'] = '/userGroup'
          var functionItem1 = {};
          functionItem1['className'] = 'icon-cailiao';
          functionItem1['label'] = '系-材料管理'
          functionItem1['url'] = '/materialControl'
          var functionItem2 = {};
          functionItem2['className'] = 'icon-shebei';
          functionItem2['label'] = '系-设备管理'
          functionItem2['url'] = '/equipmentControl'
          var functionItem14 = {};
          functionItem14['className'] = 'icon-xiangmu';
          functionItem14['label'] = '高-查看所有项目'
          functionItem14['url'] = '/projectListCompany'
          var functionItem15 = {};
          functionItem15['className'] = 'icon-icon-report';
          functionItem15['label'] = '高-查看所有报表'
          functionItem15['url'] = '/reportList'
          var functionItem16 = {};
          functionItem16['className'] = 'icon-wancheng';
          functionItem16['label'] = '高-确认项目完成'
          functionItem16['url'] = '/closeProject'
          var functionItem3 = {};
          functionItem3['className'] = 'icon-xiangmu';
          functionItem3['label'] = '项-项目管理'
          functionItem3['url'] = '/project'
          var functionItem4 = {};
          functionItem4['className'] = 'icon-icon-test';
          functionItem4['label'] = '项-新增项目'
          functionItem4['url'] = '/addNew?from=project'
          var functionItem5 = {};
          functionItem5['className'] = 'icon-delete';
          functionItem5['label'] = '项-回收站'
          functionItem5['url'] = '/delectProject'
          var functionItem6 = {};
          functionItem6['className'] = 'icon-xiangmu';
          functionItem6['label'] = '现-查看所有项目'
          functionItem6['url'] = '/siteIndex'
          var functionItem7 = {};
          functionItem7['className'] = 'icon-xiangmu';
          functionItem7['label'] = '采-查看所有项目'
          functionItem7['url'] = '/buyerIndex'
          var functionItem8 = {};
          functionItem8['className'] = 'icon-materialCost';
          functionItem8['label'] = '会-查看采购成本'
          functionItem8['url'] = '/priceList'
          var functionItem9 = {};
          functionItem9['className'] = 'icon-xiangmu';
          functionItem9['label'] = '会-查看所有项目'
          functionItem9['url'] = '/projectList'
          var functionItem10 = {};
          functionItem10['className'] = 'icon-xiangmu';
          functionItem10['label'] = '财-查看所有项目'
          functionItem10['url'] = '/projectListFinance'
          var functionItem11 = {};
          functionItem11['className'] = 'icon-zhifu';
          functionItem11['label'] = '财-更新支付数据'
          functionItem11['url'] = '/supplierList';
          var functionItem12 = {};
          functionItem12['className'] = 'icon-houqinfuwu';
          functionItem12['label'] = '财-后勤数据录入'
          functionItem12['url'] = '/logisticalList'
          var functionItem13 = {};
          functionItem13['className'] = 'icon-gongzi';
          functionItem13['label'] = '财-工资录入跟踪'
          functionItem13['url'] = '/salaryList';
          var functionItem17 = {};
          functionItem17['className'] = 'icon-xiangmu';
          functionItem17['label'] = '预-查看所有项目'
          functionItem17['url'] = '/projectListBalance'

          this.functionList.push(functionItem, functionItem1, functionItem2, functionItem14, functionItem15, functionItem16, functionItem3, functionItem4, functionItem5, functionItem6, functionItem7, functionItem9, functionItem8, functionItem10, functionItem11, functionItem12, functionItem13, functionItem17);
          break;
        case 1:
          var functionItem = {};
          functionItem['className'] = 'icon-usergroup';
          functionItem['label'] = '用户管理'
          functionItem['url'] = '/userGroup'
          var functionItem1 = {};
          functionItem1['className'] = 'icon-cailiao';
          functionItem1['label'] = '材料管理'
          functionItem1['url'] = '/materialControl'
          var functionItem2 = {};
          functionItem2['className'] = 'icon-shebei';
          functionItem2['label'] = '设备管理'
          functionItem2['url'] = '/equipmentControl'
          this.functionList.push(functionItem, functionItem1, functionItem2);
          break;
        case 2:
          var functionItem14 = {};
          functionItem14['className'] = 'icon-xiangmu';
          functionItem14['label'] = '查看所有项目'
          functionItem14['url'] = '/projectListCompany'
          var functionItem15 = {};
          functionItem15['className'] = 'icon-icon-report';
          functionItem15['label'] = '查看所有报表'
          functionItem15['url'] = '/reportList'
          var functionItem16 = {};
          functionItem16['className'] = 'icon-wancheng';
          functionItem16['label'] = '确认项目完成'
          functionItem16['url'] = '/closeProject'
          this.functionList.push(functionItem14, functionItem15, functionItem16);
          break;
        case 3:
          var functionItem3 = {};
          functionItem3['className'] = 'icon-xiangmu';
          functionItem3['label'] = '项目管理'
          functionItem3['url'] = '/project'
          var functionItem4 = {};
          functionItem4['className'] = 'icon-icon-test';
          functionItem4['label'] = '新增项目'
          functionItem4['url'] = '/addNew?from=project'
          var functionItem5 = {};
          functionItem5['className'] = 'icon-delete';
          functionItem5['label'] = '回收站'
          functionItem5['url'] = '/delectProject'
          this.functionList.push(functionItem3, functionItem4, functionItem5);
          break;
        case 4:
          var functionItem14 = {};
          functionItem14['className'] = 'icon-xiangmu';
          functionItem14['label'] = '查看所有项目'
          functionItem14['url'] = '/siteIndex'
          this.functionList.push(functionItem14);
          break;
        case 5:
          var functionItem14 = {};
          functionItem14['className'] = 'icon-xiangmu';
          functionItem14['label'] = '查看所有项目'
          functionItem14['url'] = '/buyerIndex'
          this.functionList.push(functionItem14);
          break;
        case 6:
          var functionItem8 = {};
          functionItem8['className'] = 'icon-materialCost';
          functionItem8['label'] = '查看采购成本'
          functionItem8['url'] = '/priceList'
          var functionItem9 = {};
          functionItem9['className'] = 'icon-xiangmu';
          functionItem9['label'] = '查看所有项目'
          functionItem9['url'] = '/projectList'
          this.functionList.push(functionItem9, functionItem8);
          break;
        case 7:
          var functionItem10 = {};
          functionItem10['className'] = 'icon-xiangmu';
          functionItem10['label'] = '查看所有项目'
          functionItem10['url'] = '/projectListFinance'
          var functionItem11 = {};
          functionItem11['className'] = 'icon-zhifu';
          functionItem11['label'] = '更新支付数据'
          functionItem11['url'] = '/supplierList';
          var functionItem12 = {};
          functionItem12['className'] = 'icon-houqinfuwu';
          functionItem12['label'] = '后勤数据录入'
          functionItem12['url'] = '/logisticalList'
          var functionItem13 = {};
          functionItem13['className'] = 'icon-gongzi';
          functionItem13['label'] = '工资录入跟踪'
          functionItem13['url'] = '/salaryList';

          this.functionList.push(functionItem10, functionItem11, functionItem12, functionItem13);
          break;
        case 8:
          var functionItem17 = {};
          functionItem17['className'] = 'icon-xiangmu';
          functionItem17['label'] = '查看所有项目'
          functionItem17['url'] = '/projectListBalance'
          this.functionList.push(functionItem17);
          break;
      }
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#index_div {
  .logo_box {
    width: 100%;
    background: #ECF5FF;
    height: 250px;
    padding: 1px;

    .logo_img {
      width: 60%;
      left: 50%;
      margin-left: -31%;
      margin-top: 20px;
      position: relative;
      overflow: hidden;
      text-align: center;

      img {
        width: 50%;
        border-radius: 50%;
        max-width: 160px;
      }
    }

    .name_box {
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
      // padding-left: 15px;
      text-align: center;
    }

    // border-bottom: 1px solid lightgrey;
  }

  .item_box {
    width: 100%;
    height: auto;
    overflow: hidden;

    .weui-grid {
      padding: 10px;
      color: #222;
      text-align: center;

      .weui-grid__icon {
        height: 60px;
        width: auto;
      }

      label {
        font-size: 14px;
      }
    }
  }
}

</style>
