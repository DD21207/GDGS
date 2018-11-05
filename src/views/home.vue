<template>
  <div id="home_div" style="height:100%;">
    <view-box ref="viewBox">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack:back}">
        <div>
        GDGS
        </div>
        <div slot="right">
          <span class="iconfont icon-set"></span>
        </div>
      </x-header>
      <router-view>
      </router-view>
      <tabbar slot="bottom">
        <tabbar-item link="/index" :selected="$route.path == '/index'">
        <span slot="icon" class="iconfont icon-home" style="font-size:20px;"></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :badge="newsNum" link="/newsList" :selected="$route.path == '/newsList'">
        <span slot="icon" class="iconfont icon-custom-news" style="font-size:20px;"></span>
        <span slot="label">News</span>
      </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>
<script>
export default {
  name: 'home_div',
  data() {
    return {
        newsNum: "2",
        back:true
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {},
  watch: {

  },
  methods: {

  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';
</style>
