<template>
  <div id="buyerOrderDetail" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <div class="list_box">
        <ul>
          <li v-for="item in dataList">
            <div class="itemTitle">{{item.category}} - {{item.spec}}
            </div>
            <div class="itemSummary">下单数量：{{item.quantityEst}} {{item.unit}} </div>
            <div class="itemSummary" v-if="item.unitPrice*1 != 0">单价：{{item.unitPrice}}  &nbsp;&nbsp;供应商：{{item.supplier}} </div>
            <x-button mini v-if="item.unitPrice*1 == 0 " class="itemButtonBoxItem" v-bind:class="item.unitPrice*1 == 0 ? '':'completeButton'"  @click.native="gotoConfirm(item)">确认</x-button>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore">加载更多</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom_div"></div>
    <div class="popper_div" v-show="popperShow">
      <div class="popper_input_box">
        <div class="popper_input_box_title">
          确认下单
        </div>
        <div class="popper_input_box_content">
          <p>{{popperData.category}} - {{popperData.spec}}</p>
          <group :gutter="'0px'">
            <x-input title="下单数量" v-model="popperData.quantityEst" :text-align="'right'" :placeholder-align="'right'" :readonly='true'></x-input>
            <x-input title="单价" v-model="popperData.unitPrice" :text-align="'right'" :placeholder-align="'right'" ></x-input>
            <x-input title="供应商" v-model="popperData.supplier" :text-align="'right'" :placeholder-align="'right'" ></x-input>
          </group>
          <div class="btn_div">
            <x-button mini class="cancelButton" @click.native="cancel">取消</x-button>
            <x-button mini class="itemButtonBoxItem" @click.native="Confirm">确认</x-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'buyerOrderDetail',
  data() {
    return {
      username: "",
      pageNum: 1,
      dataList: [],
      orderData: {},
      orderNo: "",
      popperShow: false,
      popperData: {},
      quantityAct:0
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
    this.onloadDetail();
  },
  watch: {

  },
  methods: {
    onloadDetail() {
      var _this = this;
      this.orderData = JSON.parse(sessionStorage.getItem('buyerOrderData') || "[]")
      this.orderNo = sessionStorage.getItem('orderNo');
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', '订单详情')
      this.$store.commit('changeBtn', ' ');
      this.$post('/buyer/order-item-list.do', {
        "projectId": this.orderData.projectId,
        "orderNo": this.orderNo,
        "pageNum": this.pageNum,
        "pageSize": 10
      }).then(response => {
        if (response.status === 0) {
          this.dataList = this.dataList.concat(response.data.list)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });

    },
    loadMore() {
      this.pageNum += 1;
      this.onloadDetail();
    },
    gotoConfirm(item) {
      this.popperData = item;
      this.popperData.supplier = " ";

      this.popperShow = !this.popperShow;
    },
    cancel() {
      this.popperShow = !this.popperShow;
    },
    Confirm() {
      var postData = {
        "projectId": this.orderData.projectId,
        "orderNo": this.orderNo
      };



     if( this.popperData.unitPrice <= 0){
        this.$vux.toast.show({
            text: '单价不能为零',
        })

        return false;
     }
      var data = {
        "id": this.popperData.id,
        "supplier": this.popperData.supplier,
        "unitPrice": this.popperData.unitPrice
      }
      postData['projectOrderItemList'] = [data];


      this.$post('/buyer/confirm-order-item.do', postData).then(response => {
        if (response.status === 0) {
            this.$vux.toast.show({
              text: response.data,
            })
            var _this = this;
            _this.dataList = [];
            _this.onloadDetail()
            setTimeout(function(){
                 _this.popperShow = !_this.popperShow;

            },1000)

        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#buyerOrderDetail {
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
          }

          .itemSummary {
            font-size: 14px;
            padding: 0px 10px 0px;
            // font-weight: 200;
            color: grey;
          }

          .itemButtonBoxItem {
            background: @common_color;
            color: white;
            // margin-top: 5px;
            // margin-left: 5px;
            position: absolute;
            right: 15px;
            margin-top: -40px;
          }

          .completeButton {
            background: grey;
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

  .popper_div {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    // display: none;
    z-index: 99;

    .popper_input_box {
      width: 90%;
      height: 300px;
      margin: 40% auto;
      background: white;
      border-radius: 10px;

      .popper_input_box_title {
        width: 100%;
        text-align: center;
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        font-weight: bold;
        border-bottom: 1px solid lightgrey;
        background: @common_color;
        color: white;
      }

      .popper_input_box_content {
        >p {
          width: 100%;
          padding: 5px 15px;
          font-weight: bold;

        }

      }

      .btn_div {
        padding: 5px 20px;

        .itemButtonBoxItem {
          background: @common_color;
          color: white;
          width: 47%;

        }

        .cancelButton {
          background: #dddddd;
          // border-color: #ddd;
          color: @common_color;
          margin-right: 4%;
          width: 47%
        }

        // .btn_box{
        //   width:auto;
        //   float: right;
        //   padding-right: 15px;
        // }
      }
    }
  }
}

</style>
