<template>
  <div id="login_div">
    <div class="login_box" v-show="isShow">
      <div class="logo_box">
        <img src="../assets/img/logo.png" alt="" width="70%">
      </div>
        <div class="input_box">
          <div class="input_box_item">
            <span>账 号：</span><input type="text" class="login_input" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input_box_item">
            <span>密 码：</span><input type="password" class="login_input" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
          </div>
          <div class="submit_btn" v-on:click="login">
            绑定微信并登陆
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
      password: "",
      isShow: false
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    if (this.$route.params.needLogin) {
      this.isShow = this.$route.params.needLogin;
    } else {
      this.$post('/get-user-info.do').then(response => {
        if (response.status === 0) {
          var _this = this;
          if (response.data.usergroupCode == 4) {
            setTimeout(function() {
              _this.$router.push('/siteIndex')
            }, 1000)
          } else {
            setTimeout(function() {
              _this.$router.push('/home')
            }, 1000)
          }
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    }


  },
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
          if (response.data.usergroupCode == 4) {
            setTimeout(function() {
              _this.$router.push('/siteIndex')
            }, 1000)
          } else if (response.data.usergroupCode == 5) {
            setTimeout(function() {
              _this.$router.push('/buyerIndex')
            }, 1000)
          }else{
            setTimeout(function() {
              _this.$router.push('/home')
            }, 1000)
          }

        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    forgetHref() {
      this.$router.push({ path: '/Forget', query: { username: this.username } })
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/login.less';

</style>
