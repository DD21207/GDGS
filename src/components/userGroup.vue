<template>
  <div id="userGroup" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div" >
      <load-more v-if="isLoad" :show-loading="true" :tip="'正在加载'"></load-more>
      <divider v-if="noData">暂无数据</divider>
      <panel header="用户列表" :list="list" :footer="footer" :type="type" @on-click-item="itemClick" @on-click-footer="loadMore"></panel>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'userGroup',
  data() {
    return {
      isLoad:true,
      noData: false,
      type: '2',
      list: [],
      footer:{
        title:'加载更多'
      },
      pageNum:1
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.onloadUser();
  },
  watch: {

  },
  methods: {
    onloadUser() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', '用户管理');
      this.$store.commit('changeBtn', 'userGroup');
      this.$fetch('/list-user.do?pageNum='+_this.pageNum+'&pageSize=10').then(response => {
        if (response.status === 0) {
          this.isLoad = false;
          if(response.data.length == 0){
            this.noData = true;
          }else{
            $.each(response.data.list, function(index, val) {
                var userData = {};
                userData['title'] = val.username;
                userData['desc'] = '职位：'+val.usergroup+'  电话：'+val.phone;
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
      this.$router.push({
          name: 'detailEdit',
          query: {
            data: item.meta.data,
            from: 'usergroup'
          }
        })
    },
    loadMore(){
      this.pageNum +=1;
      this.onloadUser();
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#userGroup {
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
