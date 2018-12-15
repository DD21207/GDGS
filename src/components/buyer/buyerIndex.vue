<template>
  <div id="buyerIndex" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <p class="title">{{username}}，欢迎回来</p>
      <div class="list_box">
        <ul>
          <li v-for="(item,index) in projectList" @click="toggleButton(item)" :key="index">
            <div class="itemTitle">{{item.projectName}}   
            </div>
            <div class="itemSummary">开始时间：{{item.startDate}}  &nbsp;&nbsp; 进度：{{item.progress | formatPercent}}</div>
            <div class="itemSummary">控制价进度：{{item.costPercent | formatPercent}}   &nbsp;&nbsp;  材料进度：{{item.materialPercent | formatPercent}}</div>
            <transition name="slide-fade">
              <div v-show="item.show" class="itemButtonBox">
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(0,item)">材料详细进度</x-button>
                <x-button mini class="itemButtonBoxItem" @click.native="hrefClick(1,item)">采购订单列表</x-button>
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
  name: 'buyerIndex',
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
    },
    projectStatus:function(value) {
        var text = "";
        if(value.progress*1 == 100){
          return text = "已完成"
        }else{
          if(value.needUpdate){
            return text = "未更新"
          }else{
            return text = "已更新"
          }
        }
    }
  },
  mounted: function() {
    this.onloadBuyer();
  },
  watch: {

  },
  methods: {
    onloadBuyer() {
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
      this.$fetch('/buyer/project-list.do?pageNum='+_this.pageNum+'&pageSize=20').then(response => {
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
      this.onloadBuyer();
    },
    hrefClick(status,item){
      switch (status) {
        case 0:
          this.$router.push({
            path: 'MaterialDetails',
            query: {
              projectId:item.id,
              projectName:item.projectName
            }
          });
          break;
        case 1:
          this.$router.push({
            path: 'buyerOrderList',
            query: {
              projectId:item.id,
              projectName:item.projectName
            }
          });
          break;
      }
    }


  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';
@common_color:#174192;


#buyerIndex {
  width: 100%;

  .content_div {
    padding-top: 10px;
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
            .itemTip{
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
