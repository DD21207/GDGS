<template>
  <div id="priceList" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <div class="list_box">
        <ul>
          <li v-for="(item,index) in dataList"  :key="index">
            <div class="itemTitle">{{item.category}} - {{item.spec}} <span style="font-size:12px;">平均价：{{item.avgPrice}}</span>
            </div>
            <!-- <div class="itemSummary"></div> -->
            <div class="itemSummary">最高价：{{item.maxPrice}} &nbsp;&nbsp;供应商：{{item.maxSupplier}}</div>
            <div class="itemSummary">最低价：{{item.minPrice}} &nbsp;&nbsp;供应商：{{item.minSupplier}}</div>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore">加载更多</p>
          </li>
        </ul>
      </div>

    </div>
    <div class="bottom_div"></div>
  </div>
</template>

<script>
  export default {
    name: 'priceList',
    data() {
      return {
        username: "",
        pageNum: 1,
        isLoad: true,
        noData: false,
        dataList: [
        ]
      }
    },
    components: {

    },
    filters: {
      formatPercent: function(value) {
        return value + "%"
      }
    },
    mounted: function() {
      this.onloadPrice();
    },
    watch: {

    },
    methods: {
      onloadPrice() {
        var _this = this;
        this.orderData = JSON.parse(sessionStorage.getItem('buyerOrderData') || "[]")
        this.orderNo = sessionStorage.getItem('orderNo');
        this.$store.commit('isShow', ' ');
        this.$store.commit('changeTitle', '查看采购成本')
        this.$store.commit('changeBtn', ' ');

        let dateTime = this.getTime();
        console.log(dateTime);
        this.$fetch('/accounting/price-info-list.do?dateStr=' + dateTime + '&pageNum=' + this.pageNum + '&pageSize=10').then(response => {
          if (response.status === 0) {
            this.isLoad = false;
            if (response.data.length == 0) {
              this.noData = true;
            } else {
              this.dataList = this.dataList.concat(response.data.list);
              console.log(this.dataList)
            }

          } else {
            this.$vux.toast.show({
              text: response.msg,
            })
          }
        });

      },
      loadMore() {
        this.pageNum += 1;
        this.onloadPrice();
      },
      getTime() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        return currentdate;
      },

    }
  }
</script>

<style lang="less">
  @import '../../assets/less/common.less';
  @common_color: #174192;
  #priceList {
    width: 100%;
    .content_div {
      // padding-top: 10px;
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
