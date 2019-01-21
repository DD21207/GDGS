<template>
  <div id="reportList" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <tab>
        <tab-item selected @on-item-click="onItemClick">今日</tab-item>
        <tab-item @on-item-click="onItemClick">本月</tab-item>
      </tab>
      <div class="list_box" v-show="showToday">
        <ul>
          <li >
            <div class="itemTitle" style="font-weight: bold;">新增项目数：<span class="itemBadge" style="font-weight: bold;">{{byDayData.projectTotal}} 个</span>
            </div>
           
          </li>
          <li >
            <div class="itemTitle" style="font-weight: bold;">新增应收总额：<span class="itemBadge" style="font-weight: bold;">{{byDayData.receivableAmountTotal}} 元</span>
            </div>
           
          </li>
          <li >
            <div class="itemTitle" style="font-weight: bold;">新增实收总额：<span class="itemBadge" style="font-weight: bold;">{{byDayData.receivableTotal}} 元</span>
            </div>
           
          </li>
          <li v-for="(item,index) in byDayData.projectList" :key="index">
            <div class="itemTitle">{{item.projectName}}
            </div>
            <div class="itemSummary">应收总额：{{item.receivableAmount}} 元</div>
            <div class="itemSummary">实收总额：{{item.receivable}} 元</div>
          </li>
         
        </ul>
      </div>
      <div class="list_box" v-show="!showToday">
        <ul>
          <li >
            <div class="itemTitle" style="font-weight: bold;">新增项目数：<span class="itemBadge" style="font-weight: bold;">{{byMonthData.projectTotal}} 个</span>
            </div>
           
          </li>
          <li >
            <div class="itemTitle" style="font-weight: bold;">新增应收总额：<span class="itemBadge" style="font-weight: bold;">{{byMonthData.receivableAmountTotal}} 元</span>
            </div>
           
          </li>
          <li >
            <div class="itemTitle" style="font-weight: bold;">新增实收总额：<span class="itemBadge" style="font-weight: bold;">{{byMonthData.receivableTotal}} 元</span>
            </div>
           
          </li>
          <li v-for="(item,index) in byMonthData.projectList" :key="index">
            <div class="itemTitle">{{item.projectName}}
            </div>
            <div class="itemSummary">应收总额：{{item.receivableAmount}} 元</div>
            <div class="itemSummary">实收总额：{{item.receivable}} 元</div>
          </li>
         
        </ul>
      </div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'reportList',
  data() {
    return {
      showToday:true,
      username: "",
      pageNum: 1,
      byDayData:{},
      byMonthData:{}
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
    this.onloadprojectList();
  },
  watch: {

  },
  methods: {
    onloadprojectList() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', '报表列表')
      this.$store.commit('changeBtn', ' ');

      var dateTime = this.getTime();
      this.$post('/get-user-info.do').then(response => {
        if (response.status === 0) {
          this.username = response.data.username;
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });

      this.$fetch('/company/project-report.do?dateStr='+dateTime).then(response => {
        if (response.status === 0) {
          this.byDayData = response.data.byDay;
          this.byMonthData = response.data.byMonth;
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    toggleButton(item) {
      this.$router.push({
            path: 'projectDetailCompany',
            query: {
              projectId: item.id,
              projectName: item.projectName
            }
          });
    },
    loadMore() {
      this.pageNum += 1;
      this.onloadprojectList();
    },
    onItemClick(){
      this.showToday = !this.showToday;
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


#reportList {
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
