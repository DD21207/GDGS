<template>
  <div id="siteIndex" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <p class="title">{{username}}，欢迎回来</p>
      <div class="list_box">
        <ul>
          <li v-for="item in projectList" @click="toggleButton(item)">
            <div class="itemTitle">{{item.projectName}}
              <badge class="itemBadge" v-if="item.progress*1 != 100"></badge>
            </div>
            <div class="itemSummary">开始时间：{{item.startDate}}  进度：{{item.progress | formatPercent}}</div>
            <transition name="slide-fade">
              <div v-show="item.show" class="itemButtonBox">
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(0,item)">估算设备材料</x-button>
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(1,item)">下达采购材料</x-button>
                <x-button mini class="itemButtonBoxItem" v-bind:class="item.progress*1 == 100 ? 'completeButton':''" :disabled="item.progress*1 == 100" @click.native="hrefClick(2,item)">更新工程进度</x-button>
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(3,item)">查看项目详情</x-button>
              </div>
            </transition>
          </li>
          <li>
            <p class="moreBtn" @click="loadMore">加载更多</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'siteIndex',
  data() {
    return {
      username:"",
      pageNum:1,
      projectList: [],
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
    this.onloadSite();
  },
  watch: {

  },
  methods: {
    onloadSite() {
      var _this = this;
      this.$store.commit('isShow', 'home');
      this.$store.commit('changeTitle', '项目列表')
      this.$store.commit('changeBtn', 'home');
      this.$post('/get-user-info.do').then(response => {
        if (response.status === 0) {
            this.username = response.data.username;
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
      this.$fetch('/site-header/project-list.do?pageNum='+_this.pageNum+'&pageSize=10').then(response => {
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
    loadMore(){
      this.pageNum +=1;
      this.onloadSite();
    },
    hrefClick(status,item){
      this.$router.push({
          path: 'estItem',
          query: {
            projectId:item.id,
            projectName:item.projectName
          }
        })
    }


  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color:#174192;


#siteIndex {
  width: 100%;

  .content_div {
    padding-top: 10px;
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

          .moreBtn{
            padding: 5px 20px;
            font-size:13px;
            color: @common_color;
          }
          .itemTitle {
            font-size: 15px;
            // font-weight: bold;
            padding: 3px 10px 0;
            .itemBadge{
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

          .itemButtonBox {
            padding: 5px 10px 10px 10px;
            .itemButtonBoxItem{
              background: @common_color;
              color:white;
              margin-top: 5px;
              margin-left: 5px;
            }

            .completeButton{
              background:grey;
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
