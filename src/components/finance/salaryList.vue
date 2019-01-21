<template>
  <div id="salaryList" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <group>
      <datetime title="查看的月份" default-selected-value="month" v-model="month" placeholder="请选择" format="YYYY-MM" @on-change="changeMonth"></datetime >
      </group>
      <div class="list_box">
        <ul>
          <li >
            <div class="itemTitle" style="font-weight: bold;">总费用：<span class="itemBadge" style="font-weight: bold;">{{totalCost}} 元</span>
            </div>
           
          </li>
          <li v-for="(item,index) in salaryList" @click="showDetail(item)" :key="index">
            <div class="itemTitle">{{item.name}} <span class="itemBadge">{{item.salary}} 元</span>
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
  name: 'salaryList',
  data() {
    return {
      username: "",
      pageNum: 1,
      salaryList: [],
      detailData: {},
      popperShow: false,
      projectId: 0,
      receivable: 0,
      projectName:"",
      month:''
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
    this.onloadlogisticalList();
  },
  watch: {

  },
  computed: {
    totalCost: function() {
      var total = 0;
      if (this.salaryList.length != 0) {
        $.each(this.salaryList, function(index, item) {
          total += item.salary
        })
      }
      return total.toFixed(2);
    }
  },
  methods: {
    onloadlogisticalList() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', '后勤工资列表')
      this.$store.commit('changeBtn', 'salary');

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

      var date = new Date();
      var seperator1 = "-";
      var seperator2 = "年";
      var seperator3 = "月";


      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month;
      this.$nextTick(()=>{
          this.month = '2018-12';
      })
    


      var selectedMonth = date.getFullYear() + seperator2 + month + seperator3
    },
    showDetail(item) {
      var _this = this;
      this.$router.push({
        path: 'detailEditFinance',
        query: {
          from:'salary',
          data:{
            salaryMonth:this.month,
            salaryName:item.name,
            salaryCost:item.salary,
            salaryId:item.id
          }
        }
      });
    },
    changeMonth(value){
      var arr = value.split('-');
      var selectedMonth = arr[0]+'年'+ arr[1]+'月';
      this.salaryList = [];
      this.pageNum = 1;
      this.getData(selectedMonth);
    },
    getData(month){
      this.$fetch('/finance/logistical-salary-list.do?pageNum=' + this.pageNum + '&pageSize=10&yearMonth='+month).then(response => {
        if (response.status === 0) {
          this.salaryList = this.salaryList.concat(response.data.list)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    loadMore() {
      var arr = this.month.split('-');
      var selectedMonth = arr[0]+'年'+ arr[1]+'月';
      this.pageNum += 1;
      this.getData(selectedMonth);
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#salaryList {
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
