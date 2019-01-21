<template>
  <div id="supplierDetail" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <div class="list_box">
        <ul>
          <li v-for="(item,index) in supplierDetailList" @click="showDetail(item)" :key="index">
            <div class="itemTitle">{{item.projectName}}
            </div>
            <div class="itemSummary">设备/材料：{{item.category}} - {{item.spec}} </div>
            <div class="itemSummary" >单价：{{item.unitPrice}}  &nbsp;&nbsp;数量：{{item.supplier}}{{item.unit}} </div>
            <div class="itemSummary" >总价：{{item.totalPrice}} </div>
            <x-button mini class="itemButtonBoxItem"  @click.native="gotoConfirm(item)">确认</x-button>
           
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
  name: 'supplierDetail',
  data() {
    return {
      username: "",
      pageNum: 1,
      supplierDetailList: [],
      detailData: {},
      popperShow: false,
      projectId: 0,
      receivable: 0,
      supplier:""
    }
  },
  components: {

  },
  filters: {
    formatPercent: function(value) {
      return value + "%"
    },
  },
  mounted: function() {
    this.onloadsupplierDetail();
  },
  watch: {

  },
  methods: {
    onloadsupplierDetail() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.$route.query.supplier)
      this.$store.commit('changeBtn', ' ');
      this.supplier = this.$route.query.supplier;

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

      this.$fetch('/finance/supplier-price-details.do?pageNum=' + this.pageNum + '&pageSize=10&supplier='+this.supplier).then(response => {
        if (response.status === 0) {
          this.supplierDetailList = this.supplierDetailList.concat(response.data.list)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    showDetail(item) {
      var _this = this;
      $.each(_this.projectList, function(index, val) {
        _this.projectList[index].show = false;
      });

      item.show = !item.show;
    },
    loadMore() {
      this.pageNum += 1;
      this.onloadsupplierDetail();
    },
    gotoConfirm(item) {
      var postData = [];
      var postItem = {
        "projectId": item.projectId,
        "supplier": item.supplier,
        "category": item.category,
        "spec": item.spec,
        "unit": item.unit
      }

      postData.push(postItem);
      this.$post('/finance/confirm-supplier-details.do', postData).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          this.supplierDetailList = [];
          this.pageNum = 1;
          // alert(this.pageNum)
          this.$fetch('/finance/supplier-price-details.do?pageNum=' + this.pageNum + '&pageSize=10&supplier='+this.supplier).then(response => {
            if (response.status === 0) {
              this.supplierDetailList = this.supplierDetailList.concat(response.data.list)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }

          })

        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#supplierDetail {
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
            padding: 0px 10px 0;
            height:35px;
            line-height: 35px;
            .itemBadge {
              position: absolute;
              right: 10px;
              // margin-top: 15px;
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
          

          .itemButtonBoxItem {
            background: @common_color;
            color: white;
            // margin-top: 5px;
            // margin-left: 5px;
            position: absolute;
            right: 15px;
            margin-top: -60px;
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
