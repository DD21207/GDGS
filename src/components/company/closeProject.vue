<template>
  <div id="closeProject" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <div class="list_box">
        <ul>
          <li v-for="(item,index) in projectList" v-if="item.needUpdate">
            <div class="itemTitle">{{item.projectName}}
            </div>
            <div class="itemSummary">应收总额：{{item.receivableAmount}}</div>
            <div class="itemSummary">实收总额：{{item.receivable}} </div>
            <x-button mini class="itemButtonBoxItem" @click.native="gotoConfirm(item)">确认项目完成</x-button>
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
  name: 'closeProject',
  data() {
    return {
      username: "",
      pageNum: 1,
      projectList: [],
      orderData: {},
      orderNo: "",
      popperShow: false,
      popperData: {},
      quantityAct: 0
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
    this.onloadProject();
  },
  watch: {

  },
  methods: {
    onloadProject() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', '项目列表')
      this.$store.commit('changeBtn', ' ');
      this.$fetch('/company/project-list.do?pageNum=' + this.pageNum + '&pageSize=10').then(response => {
        if (response.status === 0) {
          this.projectList = this.projectList.concat(response.data.list)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }

      })
    },
    loadMore() {
      this.pageNum += 1;
      this.onloadProject();
    },
    gotoConfirm(item) {
      var _this = this;
      this.$fetch('/company/close-project.do?projectId=' + item.id).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          setTimeout(function() {
            _this.projectList = [];
            _this.pageNum = 1;
            // alert(this.pageNum)
            _this.$fetch('/company/project-list.do?pageNum=' + this.pageNum + '&pageSize=10').then(response => {
              if (response.status === 0) {
                _this.projectList = _this.projectList.concat(response.data.list)
              } else {
                _this.$vux.toast.show({
                  text: response.msg,
                })
              }

            })
          }, 800)
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


#closeProject {
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
            margin-top: -45px;
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
      height: 250px;
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
