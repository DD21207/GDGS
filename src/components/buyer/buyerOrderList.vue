<template>
  <div id="buyerOrderList" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <tab>
        <tab-item selected @on-item-click="onItemClick">未完成</tab-item>
        <tab-item @on-item-click="onItemClick">已完成</tab-item>
      </tab>
      <div class="list_box" v-show="!showComplete">
        <ul>
          <li v-for="(item,index) in nonCompleteList" @click="toggleButton(item)" :key="index">
            <div class="itemTitle">地址：{{item.address}}
            </div>
            <div class="itemSummary">创建时间：{{item.createTime}}</div>
            <div class="itemSummary">到达时间：{{item.arriveTime}}</div>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore(1)">加载更多</p>
          </li>
        </ul>
      </div>
      <div class="list_box" v-show="showComplete">
        <ul>
          <li v-for="(item,index) in completeList" @click="toggleButton(item)" :key="index">
            <div class="itemTitle">地址：{{item.address}}
            </div>
            <div class="itemSummary">创建时间：{{item.createTime}}</div>
            <div class="itemSummary">到达时间：{{item.arriveTime}}</div>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore(2)">加载更多</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'buyerOrderList',
  data() {
    return {
      username: "",
      pageNum: 1,
      nonPageNum: 1,
      completeList: [],
      nonCompleteList: [],
      detailData: {},
      showComplete: false
    }
  },
  components: {

  },
  filters: {
    formatPercent: function(value) {
      return value + "%"
    },
    projectStatus: function(value) {
      var text = "";
      if (value.progress * 1 == 100) {
        return text = "已完成"
      } else {
        if (value.needUpdate) {
          return text = "未更新"
        } else {
          return text = "已更新"
        }
      }
    }
  },
  mounted: function() {
    this.onloadOrder();
  },
  watch: {

  },
  methods: {
    onloadOrder() {
      var _this = this;
      this.$store.commit('isShow', 'home');
      this.$store.commit('changeTitle', this.$route.query.projectName)
      this.$store.commit('changeBtn', 'home');
      var data = {};
      data['projectId'] = this.$route.query.projectId;
      data['projectName'] = this.$route.query.projectName;
      sessionStorage.setItem('buyerOrderData', JSON.stringify(data));
      this.detailData = data;

      this.getComplete();
      this.getNonComplete();

    },
    getComplete() {
      this.$fetch('/buyer/order-list.do?projectId=' + this.detailData.projectId + '&pageNum=' + this.pageNum + '&pageSize=10&statusCode=2').then(response => {
        if (response.status === 0) {
          this.completeList = this.completeList.concat(response.data.list)
          console.log(this.completeList)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    getNonComplete() {
      this.$fetch('/buyer/order-list.do?projectId=' + this.detailData.projectId + '&pageNum=' + this.nonPageNum + '&pageSize=10&statusCode=1').then(response => {
        if (response.status === 0) {
          this.nonCompleteList = this.nonCompleteList.concat(response.data.list)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

        console.log(this.NonCompleteList)

      })
    },
    toggleButton(item) {
      sessionStorage.setItem('orderNo', item.orderNo);
      this.$router.push({
        name: 'buyerOrderDetail',
        query: {
          projectId: item.projectId,
          orderNo: item.orderNo
        }
      })
    },
    loadMore(status) {
      if (status == 1) {
        this.nonPageNum += 1;
        this.getNonComplete();
      } else if (status == 2) {
        this.pageNum += 1;
        this.getComplete();
      }

    },
    onItemClick() {
      this.showComplete = !this.showComplete;
    }


  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#buyerOrderList {
  width: 100%;

  .content_div {
    // padding-top: 10px;
    background: #f8f8f8;

    .title {
      padding-left: 20px;
      padding-bottom: 10px;
      width: 100%;
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

          .moreBtn {
            padding: 5px 20px;
            font-size: 13px;
            color: @common_color;
          }

          .itemTitle {
            font-size: 15px;
            // font-weight: bold;
            padding: 3px 10px 0;

            .itemBadge {
              position: absolute;
              right: 10px;
              margin-top: 15px;
            }

            .itemTip {
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

            .itemButtonBoxItem {
              background: @common_color;
              color: white;
              margin-top: 5px;
              margin-left: 5px;
            }

            .completeButton {
              background: grey;
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
