<template>
  <div id="MaterialDetails" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <p class="title">详细材料进度</p>
      <div class="list_box">
        <ul>
          <li v-for="(item,index) in projectList" @click="toggleButton(item)" :key="index">
            <div class="itemTitle">{{item.category}} - {{item.spec}}
            </div>
            <div class="itemSummary">估算数量：{{item.quantityEst}}  &nbsp; 实收数量：{{item.quantityAct}}   &nbsp;单位：{{item.unit}}</div>
         <!--    <div class="itemSummary">控制价进度：{{item.costPercent | formatPercent}}   &nbsp;&nbsp;  应收进度：{{item.receivePercent | formatPercent}}</div> -->
          </li>
          <li>
            <p class="moreBtn" @click="loadMore">加载更多</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MaterialDetails',
  data() {
    return {
      username:"",
      pageNum:1,
      projectList: [],
      detailData:{}

    }
  },
  components: {

  },
  filters: {
    formatPercent: function(value) {
      return value + "%"
    },
    projectStatus:function(value) {
        var text = "";
        if(value.progress*1 == 100){
          return text = "已完成"
        }else{
          if(value.needUpdate){
            return text = "未更新"
          }else{
            return text = "已更新"
          }
        }
    }
  },
  mounted: function() {
    this.onloadDetail();
  },
  watch: {

  },
  methods: {
    onloadDetail() {
      var _this = this;
      this.$store.commit('isShow', 'home');
      this.$store.commit('changeTitle', this.$route.query.projectName)
      this.$store.commit('changeBtn', 'home');
      var data  = {};
      data['projectId'] = this.$route.query.projectId;
      data['projectName'] = this.$route.query.projectName;
      sessionStorage.setItem('MaterialDetails',JSON.stringify(data));
      this.detailData = data;

      this.$fetch('/buyer/item-percent-list.do?projectId='+ this.detailData.projectId).then(response => {
        if (response.status === 0) {
            this.projectList = this.projectList.concat(response.data)
        } else {
            this.$vux.toast.show({
              text: response.msg,
            })
        }

      })
    },
    toggleButton(item) {
      var _this = this;
      $.each(_this.projectList, function(index, val) {
        _this.projectList[index].show = false;
      });

      item.show = !item.show;
    },
    loadMore(){
      this.pageNum +=1;
      this.onloadDetail();
    }


  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color:#174192;


#MaterialDetails {
  width: 100%;

  .content_div {
    padding-top: 10px;
    background: #f8f8f8;

    .title {
      padding-left: 20px;
      padding-bottom: 10px;
      // width: 100%;
      border-bottom: 1px solid lightgrey;
      font-weight: bold;
      font-size: 17px;
    }

    .list_box {
      width: 100%;
      height: auto;
      background: white;

      ul {
        list-style: none;

        li {
          border-bottom: 1px solid lightgrey;

          .moreBtn{
            padding: 5px 20px;
            font-size:13px;
            color: @common_color;
          }
          .itemTitle {
            font-size: 15px;
            // font-weight: bold;
            padding: 3px 10px 0;
            .itemBadge{
              position: absolute;
              right: 10px;
              margin-top: 15px;
            }
            .itemTip{
              // height: 20px;
              padding: 0px 7px;
              margin-left: 10px;
              display: inline-block;
              font-size: 11px;
              color: #ff6430;
              border: 1px solid #ff6430;
              border-radius: 5px;
            }
          }

          .itemSummary {
            font-size: 14px;
            padding: 0px 10px 0px;
            // font-weight: 200;
            color: grey;
          }

          .itemButtonBox {
            padding: 5px 10px 10px 10px;
            .itemButtonBoxItem{
              background: @common_color;
              color:white;
              margin-top: 5px;
              margin-left: 5px;
            }

            .completeButton{
              background:grey;
            }
          }
        }

      }
    }
  }



  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(10px);
    opacity: 0;
  }
}

</style>
