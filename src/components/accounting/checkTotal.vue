<template>
  <div id="checkTotal" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <tab>
        <tab-item selected @on-item-click="onItemClick">设备</tab-item>
        <tab-item @on-item-click="onItemClick">材料</tab-item>
      </tab>
      <div class="list_box" v-show="showEquipment">
        <ul>
          <li v-for="(item,index) in equipmentList" :key="index">
            <div class="itemTitle">{{item.category}} - {{item.spec}}
            </div>
            <div class="itemSummary">数量：{{item.quantityAct}} &nbsp; 单价：{{item.unitPrice}} &nbsp; 总价：{{item.totalPrice}}</div>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore(0)">加载更多</p>
          </li>
        </ul>
        <div class="totalBox">
          总价：{{totalEquipment}}
        </div>
        <div class="btn_box">
          <x-button class="edit_btn" @click.native="addSubmit">确定</x-button>
        </div>
      </div>
      <div class="list_box" v-show="!showEquipment">
        <ul>
          <li v-for="(item,index) in materialList" :key="index">
            <div class="itemTitle">{{item.category}} - {{item.spec}}
            </div>
            <div class="itemSummary">数量：{{item.quantityAct}} &nbsp; 单价：{{item.unitPrice}} &nbsp; 总价：{{item.totalPrice}}</div>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore(1)">加载更多</p>
          </li>
        </ul>
        <div class="totalBox">
          总价：{{totalMaterial}}
        </div>
        <div class="btn_box">
          <x-button class="edit_btn" @click.native="addSubmit">确定</x-button>
        </div>
      </div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'checkTotal',
  data() {
    return {
      username: "",
      ePageNum: 1,
      mPageNum: 1,
      materialList: [],
      detailData: {},
      showEquipment: true,
      projectId: "",
      equipmentList: [],
      totalEquipment: 0,
      totalEquipmentData: [],
      totalMaterial: 0,
      totalMaterialData: []
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
    this.onloadcheckTotal();
  },
  watch: {

  },
  methods: {
    onloadcheckTotal() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.$route.query.projectName)
      this.$store.commit('changeBtn', 'home');
      this.projectId = this.$route.query.projectId;

      var dateTime = this.getTime();
      this.getEquipment();
      this.getMaterial();
    },
    getEquipment() {
      this.$fetch('/accounting/price-details.do?projectId=' + this.projectId + '&pageNum=' + this.ePageNum + '&pageSize=10&item=设备').then(response => {
        if (response.status === 0) {
          this.equipmentList = this.equipmentList.concat(response.data.list)
          this.totalEquipment = this.getTotal(this.equipmentList);
          this.totalEquipmentData = [];
          this.totalEquipmentData = this.totalData(this.equipmentList);
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    getMaterial() {
      this.$fetch('/accounting/price-details.do?projectId=' + this.projectId + '&pageNum=' + this.mPageNum + '&pageSize=10&item=材料').then(response => {
        if (response.status === 0) {
          this.materialList = this.materialList.concat(response.data.list)
          this.totalMaterial = this.getTotal(this.materialList);
          this.totalMaterialData = [];
          this.totalMaterialData = this.totalData(this.materialList);
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    loadMore(status) {
      if (status == 0) {
        this.ePageNum += 1;
        this.getEquipment();
      } else if (status == 1) {
        this.mPageNum += 1;
        this.getMaterial();
      }

    },
    getTotal(list) {
      var total = 0;
      $.each(list, function(index, val) {
        total += val.totalPrice;
      });
      return total;
    },
    totalData(list) {
      var totalData = [];
      $.each(list, function(index, val) {
        var total = {
          "id": val.id,
          "projectId": val.projectId,
          "orderNo": val.orderNo,
          "item": val.item
        };
        totalData.push(total)
      });
      return totalData;
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
    onItemClick() {
      this.showEquipment = !this.showEquipment;
    },
    addSubmit() {
      if (this.showEquipment) {
        this.$post('/accounting/confirm-price-details.do', this.totalEquipmentData).then(response => {
          if (response.status === 0) {
            this.$vux.toast.show({
              text: response.data,
            })
            this.ePageNum = 1;
            this.equipmentList = [];
            this.getEquipment();

          } else {
            this.$vux.toast.show({
              text: response.msg,
            })
          }
        });
      }else{
        this.$post('/accounting/confirm-price-details.do', this.totalMaterialData).then(response => {
          if (response.status === 0) {
            this.$vux.toast.show({
              text: response.data,
            })
            this.mPageNum = 1;
            this.materialList = [];
            this.getMaterial();
          } else {
            this.$vux.toast.show({
              text: response.msg,
            })
          }
        });
      }
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#checkTotal {
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

      .totalBox {
        margin-top: 20px;
        margin-bottom: 10px;
        padding: 0 10px;
        font-weight: bold;
      }

      .btn_box {
        padding: 0 10px;

        .edit_btn {
          background: #174192;
          color: white;
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
