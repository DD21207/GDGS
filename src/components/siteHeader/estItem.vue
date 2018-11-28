<template>
  <div id="estItem" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div" >
      <load-more v-if="isLoad" :show-loading="true" :tip="'正在加载'"></load-more>
      <divider v-if="noData">暂无数据</divider>
      <panel header="材料列表" :list="list" :type="type" @on-click-item="itemClick" :footer="footer" @on-click-footer="loadMore"></panel>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'materialControl',
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
    this.onloadEstItem();
  },
  watch: {

  },
  methods: {
    onloadEstItem() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.$route.query.projectName);
      this.$store.commit('changeBtn', 'estItem');
      var data  = {};
      data['projectId'] = this.$route.query.projectId;
      data['projectName'] = this.$route.query.projectName;
      sessionStorage.setItem('estItemData',JSON.stringify(data));

      this.$post('/site-header/est-item-list.do?',{
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
                var userData = {};
                userData['title'] = val.spec;
                userData['desc'] = '名称：'+val.category+'/   数量：'+val.quantityEst+val.unit
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
          params: {
            data: item.meta.data,
            from: 'materialControl'
          }
        })
    },
    loadMore(){
      this.pageNum +=1;
      this.onloadEstItem();
    }
  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#estItem {
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
