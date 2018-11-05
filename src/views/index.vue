<template>
  <div id="index_div" style="height:100%;">
    <div class="header_div"></div>
      <div class="logo_box">
        <div class="logo_img">
          <img :src="logo_url" alt="">
        </div>
        <div class="name_box">
          <span>{{username}}，</span><span>欢迎回来！</span>
        </div>
      </div>
      <div class="item_box">
        <grid :cols="3">
          <grid-item label="Grid" v-for="i in 9">
            <img slot="icon" src="../../static/img/logo.jpg">
        </grid-item>
        </grid>
      </div>
    </div>
</template>
<script>
export default {
  name: 'index_div',
  data() {
    return {
      logo_url: "../../static/img/logo.jpg",
      username: "DD"
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

.logo_box {
  width: 100%;
  background: #ECF5FF;
  height: 250px;
  padding: 1px;

  .logo_img {
    width: 60%;
    left: 50%;
    margin-left: -30%;
    margin-top: 20px;
    position: relative;
    overflow: hidden;

    img {
      width: 60%;
      border-radius: 50%;
    }
  }

  .name_box {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  // border-bottom: 1px solid lightgrey;
}

.item_box {
  width: 100%;
  height: auto;
  overflow: hidden;
}

</style>
