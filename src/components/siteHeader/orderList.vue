<template>
  <div id="orderList" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div" >
      <load-more v-if="isLoad" :show-loading="true" :tip="'正在加载'"></load-more>
      <divider v-if="noData">暂无数据</divider>
      <panel header="采购订单列表" :list="list" :type="type" @on-click-item="itemClick" :footer="footer" @on-click-footer="loadMore"></panel>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'orderList',
  data() {
    return {
      isLoad:true,
      noData: false,
      type: '2',
      list: [],
      pageNum:1,
      footer:{
        title:'加载更多'
      }
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.onloadOrderList();
  },
  watch: {

  },
  methods: {
    onloadOrderList() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.$route.query.projectName);
      this.$store.commit('changeBtn', 'addOrder');
      var data  = {};
      data['projectId'] = this.$route.query.projectId;
      data['projectName'] = this.$route.query.projectName;
      data['address'] = this.$route.query.address;
      sessionStorage.setItem('orderData',JSON.stringify(data));

      this.$post('/site-header/order-list.do',{
          "projectId":this.$route.query.projectId,
          "pageNum":_this.pageNum,
          "pageSize":10
      }).then(response => {
        if (response.status === 0) {
          this.isLoad = false;
          if(response.data.length == 0){
            this.noData = true;
          }else{
            $.each(response.data.list, function(index, val) {
                // var createTime = val.createTime.split(" ")[0]
                var userData = {};

                userData['title'] = '订单号：'+val.orderNo;
                userData['desc'] = '到达时间：'+val.arriveTime
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
      sessionStorage.setItem('orderNo',item.meta.data.orderNo);
      this.$router.push({
          name: 'orderDetail',
          query: {
            projectId: item.meta.data.projectId,
            orderNo: item.meta.data.orderNo
          }
        })
    },
    loadMore(){
      this.pageNum +=1;
      this.onloadOrderList();
    }
  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#orderList {
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
