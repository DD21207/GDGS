<template>
  <div id="delectDiv" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div" >
      <load-more v-if="isLoad" :show-loading="true" :tip="'正在加载'"></load-more>
      <divider v-if="noData">暂无数据</divider>
      <panel header="项目列表" :list="list" :type="type" @on-click-item="itemClick" :footer="footer" @on-click-footer="loadMore"></panel>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'delectDiv',
  data() {
    return {
      isLoad:true,
      noData: false,
      footer:{
        title:'加载更多'
      },
      type: '2',
      list: [],
      pageNum:1
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.onloadProject();
  },
  watch: {

  },
  methods: {
    onloadProject() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', '项目回收站');
      this.$store.commit('changeBtn', ' ');
      this.$fetch('/project/list.do?pageNum='+_this.pageNum+'&pageSize=10&status=del').then(response => {
        if (response.status === 0) {
          this.isLoad = false;
          if(response.data.length == 0){
            this.noData = true;
          }else{
            $.each(response.data.list, function(index, val) {
                var userData = {};
                userData['title'] = val.projectName;
                userData['desc'] = '金额：'+val.budget+'/   负责人：'+val.siteLeader
                userData['meta'] = {};
                userData.meta['id'] = val.id;
                userData.meta['data'] = val;
                _this.list.push(userData)
            });
          }
          console.log(response.data)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    itemClick(item){
      const _this = this;
      this.$vux.confirm.show({
        content:'确认恢复该项目',
        'confirm-text':'确认',
        'cancel-text':'取消',
        // 组件除show外的属性
        onCancel () {
          _this.$vux.confirm.hide()
        },
        onConfirm () {
          _this.$post('/project/update.do', {
            "id":  item.meta.data.id, 
            "status": "new added" 
          }).then(response => {
            if (response.status === 0) {
              _this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'Home'
                })
              }, 800)
            } else {
              _this.$vux.toast.show({
                text: response.msg,
              })
            }
          });
        }
      })
      // this.$router.push({
      //     name: 'detailEdit',
      //     query: {
      //       data: item.meta.data,
      //       from: 'project'
      //     }
      //   })
    },
    loadMore(){
      this.pageNum +=1;
      this.onloadProject();
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#delProject {
  .content_div {
    width: 100%;
    .weui-panel__hd{
      color:#222;
      font-size: 17px;
      font-weight: bold;
    }
    .weui-media-box{
      padding: 10px;
      .weui-media-box__title{
        font-size: 15px;
      }
    }
  }
}

</style>
