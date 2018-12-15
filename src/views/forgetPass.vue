<template>
  <div id="forget_div">
    <div class="forget_box">
      <div class="logo_box">
        <img src="../assets/img/logo.png" alt="" width="70%">
      </div>
        <div class="input_box">
          <div class="input_box_item">
            <div class="title_box">
              账 号：
            </div>
            <div class="input_div">
              <input type="text" class="forget_input" placeholder="请输入账号" v-model="username" />
            </div>
          </div>
          <div class="input_box_item">
            <div class="title_box">
              密 码：
            </div>
            <div class="input_div">
              <input type="password" class="forget_input" placeholder="请输入密码" v-model="password" />
            </div>
          </div>
          <div class="input_box_item">
            <div class="title_box">
              确认密码：
            </div>
            <div class="input_div">
              <input type="password" class="forget_input" placeholder="请再次确认密码" v-model="repassword" />
            </div>
          </div>
          <div class="input_box_item" style="margin-left: -10px;">
            <div class="input_div" style="width: calc(100% - 100px)"><input type="text" class="forget_input" placeholder="请输入验证码" v-model="forgetToken" style="margin-left: 0;margin-right: 3%;" />
            </div>
            <div class="title_box" style="width:100px;">
              <div class="message_btn" :class="{disabled: !this.canClick}" v-on:click="getCode">
                {{content}}
              </div>
            </div>
          </div>
          <div class="submit_btn" v-on:click="revise">
            修 改
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'reg_div',
  data() {
    return {
      password: "",
      repassword: "",
      forgetToken: "",
      username: "",
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.$nextTick(function () {
      this.username = this.$route.query.username;  
    })
  },
  watch: {

  },
  methods: {
    revise() {
      this.username = this.$route.query.username;
      if (this.password != this.repassword) {
        this.$vux.toast.show({
          text: '两次密码输入不一致。',
        })
        return false;
      }
      this.$post('/forget-reset-password.do?phone=' + this.username + '&passwordNew=' + this.password + '&forgetToken=' + this.forgetToken ).then(response => {
        if (response.status === 0) {
          // this.$router.push('/home')
          this.$vux.toast.show({
            text: '修改密码成功',
          })
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    getCode() {
      // this.username = this.$route.query.username;
      if (this.username != "") {
        this.$post( '/get-verify-code.do?phone=' + this.username ).then(response => {
          if (response.status === 0) {
            // this.$router.push('/home')
            this.$vux.toast.show({
              text: "获取验证码成功",
            })
            if (!this.canClick) return //改动的是这两行代码
            this.canClick = false
            this.content = this.totalTime + 's后重新发送'
            let clock = window.setInterval(() => {
              this.totalTime--
              this.content = this.totalTime + 's后重新发送'
              if (this.totalTime < 0) {
                window.clearInterval(clock)
                this.content = '重新发送验证码'
                this.totalTime = 10
                this.canClick = true //这里重新开启
              }
            }, 1000)
          } else {
            this.$vux.toast.show({
              text: response.msg,
            })
          }

        })
      }else{
        
      }
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/login.less';

</style>
