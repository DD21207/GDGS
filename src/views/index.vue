<template>
  <div id="index_div" style="height:100%;">
    <div class="header_div"></div>
    <div class="logo_box">
      <div class="logo_img">
        <img :src="logo_url" alt="">
        </div>
        <div class="name_box">
          <span>{{username}}，</span><span>欢迎回来！</span>
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
      logo_url: "../../static/img/logo.jpg",
      username: "",
      functionList:[]
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
            this.logo_url = response.data.headimgurl;
            this.groupList(response.data.usergroupCode)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    groupList(group){
      switch (group){
        case 0:
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
          var functionItem6 = {};
          functionItem6['className'] = 'icon-jilu';
          functionItem6['label'] = '现场负责人'
          functionItem6['url'] = '/siteIndex'
          var functionItem7 = {};
          functionItem7['className'] = 'icon-hesuankemuleixing';
          functionItem7['label'] = '项目采购人'
          functionItem7['url'] = '/buyerIndex'
          // var functionItem8 = {};
          // functionItem8['className'] = 'icon-jindu';
          // functionItem8['label'] = '更新工程进度'
          // functionItem8['url'] = '/equipmentControl'
          // var functionItem9 = {};
          // functionItem9['className'] = 'icon-xiangmu';
          // functionItem9['label'] = '查看所有项目'
          // functionItem9['url'] = '/equipmentControl'
          this.functionList.push(functionItem,functionItem1,functionItem2,functionItem3,functionItem4,functionItem5,functionItem6,functionItem7);
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
          this.functionList.push(functionItem,functionItem1,functionItem2);
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
          this.functionList.push(functionItem,functionItem1,functionItem2,functionItem3,functionItem4,functionItem5);
          break;
        case 4:
          this.$router.push({
            name: 'siteIndex'
          });
          break;
        case 5:
          this.$router.push({
            name: 'buyerIndex'
          });
          break;
      }
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#index_div{
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
    text-align:center;
    img {
      width: 60%;
      border-radius: 50%;
      max-width: 160px;
    }
  }

  .name_box {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    // padding-left: 15px;
    text-align:center;
  }

  // border-bottom: 1px solid lightgrey;
}

.item_box {
  width: 100%;
  height: auto;
  overflow: hidden;
  .weui-grid{
    padding: 10px;
    color:#222;
    text-align:center;
    .weui-grid__icon{
      height:60px;
      width:auto;
    }
    label{
      font-size: 14px;
    }
  }
}
}


</style>
