<template>
  <div id="editPass_div">
    <div class="header_div"></div>
    <div class="content_div">
      <group :gutter="'40px'">
        <x-input title="旧密码" v-model="oldPassword" :type="pwdType" :text-align="'right'" :placeholder-align="'right'" required>
          <span slot="right" class="iconfont icon-eye" @click="changeType(0)" style="margin-left: 15px;"></span>
        </x-input>
        <x-input title="新密码" v-model="password" :type="pwdType1" :text-align="'right'" :placeholder-align="'right'" required>
          <span slot="right" class="iconfont icon-eye" @click="changeType(1)" style="margin-left: 15px;"></span>
        </x-input>
        <x-input title="确认密码" v-model="repassword" :type="pwdType2" :text-align="'right'" :placeholder-align="'right'" required>
          <span slot="right" class="iconfont icon-eye" @click="changeType(2)" style="margin-left: 15px;"></span>
        </x-input>
      </group>
    </div>
    <div class="button_box">
      <x-button class="edit_btn" @click.native="edit">修改</x-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'editPass_div',
  data() {
    return {
      password: "",
      repassword: "",
      oldPassword: "",
      pwdType1: "password",
      pwdType2: "password",
      pwdType: "password"
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.$store.commit('changeTitle', '修改密码');
    this.$store.commit('changeBtn', ' ');
    this.$store.commit('isShow', ' ');
    // this.$nextTick(function () {
    //   this.username = this.$route.query.username;  
    // })
  },
  watch: {

  },
  methods: {
    edit() {
      var _this = this;
      if (this.password != this.repassword) {
        this.$vux.toast.show({
          text: '两次密码输入不一致。',
        })
        return false;
      }
      this.$post('/reset-password.do?passwordOld=' + this.oldPassword + '&passwordNew=' + this.password).then(response => {
        if (response.status === 0) {

          this.$vux.toast.show({
            text: '修改密码成功',
          })
          setTimeout(function() {
            _this.$router.push('/home')
          }, 800)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    changeType(status) {
      switch (status) {
        case 0:
          this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
          break;
        case 1:
          this.pwdType1 = this.pwdType1 === 'password' ? 'text' : 'password'
          break;
        case 2:
          this.pwdType2 = this.pwdType2 === 'password' ? 'text' : 'password'
          break;
      }
    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#editPass_div {
  padding-bottom: 100px;

  .button_box {
    margin-top: 20px;
    padding: 15px;

    .edit_btn {
      background: #174192;
      color: white;
    }
  }
}

</style>
