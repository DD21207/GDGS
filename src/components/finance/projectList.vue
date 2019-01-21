<template>
  <div id="projectListFinance" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <div class="list_box">
        <ul>
          <li v-for="(item,index) in projectList" @click="toggleButton(item)" :key="index">
            <div class="itemTitle">{{item.projectName}}  <span class="itemTip" v-if="item.status == 'finished'">已完成</span>
            </div>
            <div class="itemSummary">控制价进度：{{item.costPercent | formatPercent}}</div>
            <div class="itemSummary">时间进度：{{item.daysPercent | formatPercent}} &nbsp; 施工进度：{{item.progress | formatPercent}}</div>
            <transition name="slide-fade">
              <div v-show="item.show" class="itemButtonBox">
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(0,item)">查看项目详情</x-button>
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(1,item)">更新实收数据</x-button>
              </div>
            </transition>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore">加载更多</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="popper_div" v-show="popperShow">
      <div class="popper_input_box">
        <div class="popper_input_box_title">
          更新项目实收数据
        </div>
        <div class="popper_input_box_content">
          <p>项目名称：{{projectName}}</p>
          <group :gutter="'0px'">
            <x-input title="实收数据" v-model="receivable" :text-align="'right'" :placeholder-align="'right'"></x-input>
          </group>
          <div class="btn_div">
            <x-button mini class="cancelButton" @click.native="cancel">取消</x-button>
            <x-button mini class="itemButtonBoxItem" @click.native="Confirm">确认</x-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'projectListFinance',
  data() {
    return {
      username: "",
      pageNum: 1,
      projectList: [],
      detailData: {},
      popperShow: false,
      projectId: 0,
      receivable: 0,
      projectName:""
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
      this.$store.commit('changeTitle', '项目列表')
      this.$store.commit('changeBtn', ' ');

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

      this.$fetch('/finance/project-list.do?pageNum=' + this.pageNum + '&pageSize=10').then(response => {
        if (response.status === 0) {
          this.projectList = this.projectList.concat(response.data.list)
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
    loadMore() {
      this.pageNum += 1;
      this.onloadprojectList();
    },
    hrefClick(status, item) {
      switch (status) {
        case 0:
          this.$router.push({
            path: 'projectDetailFinance',
            query: {
              projectId: item.id,
              projectName: item.projectName
            }
          });
          break;
        case 1:
          if (item.status == 'finished') {
            this.$vux.toast.show({
              text: '项目已完成！！！',
            })
            return false;
          }
          this.popperShow = true;
          this.projectId = item.id;
          this.receivable = item.receivable;
          this.projectName = item.projectName;
          break;
      }
    },
    cancel() {
      this.popperShow = false;
    },
    Confirm() {
      this.$post('/finance/receivable-update.do', {
        "projectId": this.projectId,
        "receivable": this.receivable
      }).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          this.projectList = [];
          this.pageNum = 1;
          // alert(this.pageNum)
          this.$fetch('/finance/project-list.do?pageNum=' + this.pageNum + '&pageSize=10').then(response => {
            if (response.status === 0) {
              this.projectList = this.projectList.concat(response.data.list)
              this.popperShow = false;
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
          this.popperShow = false;
        }

      })
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color: #174192;


#projectListFinance {
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
