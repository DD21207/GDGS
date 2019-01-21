<template>
  <div id="ledgerList" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <div class="list_box">
        <ul>
          <li>
            <div class="itemTitle" style="font-weight: bold;">挂靠公司：{{biddingCompany}}</span>
            </div>
          </li>
          <li>
            <div class="itemTitle" style="font-weight: bold;">合同金额：<span class="itemBadge" style="font-weight: bold;">{{total_materialContractAmount}} 元</span>
            </div>
          </li>
          <li>
            <div class="itemTitle" style="font-weight: bold;">累计金额：<span class="itemBadge" style="font-weight: bold;">{{total_cumulativePaymentAmount}} 元</span>
            </div>
          </li>
          <li>
            <div class="itemTitle" style="font-weight: bold;">本次金额：<span class="itemBadge" style="font-weight: bold;">{{total_paymentAmount}} 元</span>
            </div>
          </li>
          <li v-for="(item,index) in ledgerList" @click="toggleButton(item)" :key="index">
            <div class="itemTitle">材料商开票公司：{{item.supplier}}
            </div>
            <div class="itemSummary">合同金额：{{item.materialContractAmount}} 元</div>
            <div class="itemSummary">累计金额：{{item.cumulativePaymentAmount}} 元</div>
            <div class="itemSummary">本次金额：{{item.paymentAmount}} 元</div>
            <div class="itemSummary">
              付款日期：{{item.paymentDate}}
            </div>
            <div class="itemSummary">
              备注：{{item.remark}}
            </div>
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
  name: 'ledgerList',
  data() {
    return {
      username: "",
      pageNum: 1,
      ledgerList: [],
      detailData: {},
      popperShow: false,
      projectId: 0,
      receivable: 0,
      projectName: "",
      biddingCompany: ""
    }
  },
  components: {

  },
  computed: {
    total_materialContractAmount: function() {
      var total = 0;
      if (this.ledgerList.length != 0) {
        $.each(this.ledgerList, function(index, item) {
          total += item.materialContractAmount
        })
      }
      return total.toFixed(2);
    },
    total_cumulativePaymentAmount: function() {
      var total = 0;
      if (this.ledgerList.length != 0) {
        $.each(this.ledgerList, function(index, item) {
          total += item.cumulativePaymentAmount
        })
      }
      return total.toFixed(2);
    },
    total_paymentAmount: function() {
      var total = 0;
      if (this.ledgerList.length != 0) {
        $.each(this.ledgerList, function(index, item) {
          total += item.paymentAmount
        })
      }
      return total.toFixed(2);
    },
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
    this.onloadledgerList();
  },
  watch: {

  },
  methods: {
    onloadledgerList() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.$route.query.projectName)
      this.$store.commit('changeBtn', 'ledger');
      this.projectId = this.$route.query.projectId;
      this.projectName = this.$route.query.projectName;

      // var dateTime = this.getTime();
      this.$post('/get-user-info.do').then(response => {
        if (response.status === 0) {
          this.username = response.data.username;
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });

      this.$fetch('/balance/ledger-data-list.do?pageNum=' + this.pageNum + '&pageSize=10&projectId=' + this.projectId).then(response => {
        if (response.status === 0) {
          this.biddingCompany = response.data.list[0].biddingCompany
          this.ledgerList = this.ledgerList.concat(response.data.list)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })


      sessionStorage.setItem('projectId', this.projectId);
      sessionStorage.setItem('projectName', this.projectName);
      sessionStorage.setItem('biddingCompany', this.biddingCompany);


    },
    toggleButton(item) {
      sessionStorage.setItem('ledgerData', JSON.stringify(item));
      this.$router.push({
        name: 'detailEditLedger',
        query: {
          data:item
        }
      })

    },
    loadMore() {
      this.pageNum += 1;
      this.onloadledgerList();
    },
  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#ledgerList {
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
              margin-top: 0px;
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
