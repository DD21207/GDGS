<template>
  <div id="login_div">
    <div class="login_box">
      <div class="logo_box">
        <img src="../assets/img/logo.png" alt="" width="70%">
      </div>
        <div class="input_box">
          <div class="input_box_item">
            <span>账 号：</span><input type="text" class="login_input" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input_box_item">
            <span>密 码：</span><input type="password" class="login_input" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="submit_btn" v-on:click="login">
              登 录
          </div>
          <div class="forget_btn" v-on:click="forgetHref">
            忘记密码?
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'login_div',
  data() {
    return {
      username: "",
      password: ""
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {},
  watch: {

  },
  methods: {
    login() {
      this.$post('/login.do', {
        phone: this.username,
        password: this.password
      }).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: '登录成功'
          })
          var _this = this; 
          setTimeout(function(){
            _this.$router.push('/home')
          },1000)

        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    forgetHref(){
      this.$router.push({path:'/Forget',query:{ username:this.username}})
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/login.less';

</style>
