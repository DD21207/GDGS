<template>
  <div id="home_div" style="height:100%;">
    <view-box ref="viewBox">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack:back}">
        <div>
        {{Name}}
        </div>
        <div slot="right">
          <span class="iconfont" :class="btn" style="font-size: 20px;font-weight: bold;" @click="test"></span>
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
        back:false,
        Name:"",
        btn:""
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
      // this.$store.commit('changeBtn', 'home');
  },
  computed: {
      count () {
        return this.$store.state.showBack
      },
      titleContent (){
        return this.Name = this.$store.state.titleName    
      },
      btnContent(){
        return this.btn = this.$store.state.rightBtn;
      }
  },
  watch: {
    count(val){
      this.back = val;
    },
    titleContent(val){
       this.Name = val;
    },
    btnContent(val){
       this.btn = val;
    }
  },
  methods: {
    test(){
      let view = this.$store.state.rightView;
      if( view == 'userGroup'){
        this.$router.push({
          name: 'addNew',
          params: {
            from: 'user'
          }
        });
      }else if(view == 'materialControl'){
        this.$router.push({
          name: 'addNew',
          params: {
            from: 'material'
          }
        });
      }else if(view == 'equipmentControl'){
        this.$router.push({
          name: 'addNew',
          params: {
            from: 'equipment'
          }
        });
      }else if(view == 'setting'){
        this.$router.push({
          name: 'Edit'
        });
      }else if(view == 'estItem'){
        this.$router.push({
          name: 'estItemAdd'
        });
      }
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';
</style>
