<template>
  <div id="addNew" style="height:100%;">
    <div class="header_div"></div>
    <div class="detail_div" v-if="this.from == 'user'">
      <group :gutter="'40px'">
        <x-input title="姓名" v-model="username" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="电话" v-model="phone" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <popup-picker :title="'角色'" :data="list" v-model="role" :placeholder="'请选择'"></popup-picker>
      </group>
      <p class="tips">提示：用户的初始密码为88888。</p>
    </div>
    <div class="detail_div" v-else-if="this.from == 'material'">
      <group :gutter="'40px'">
        <x-input title="名称" v-model="category" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="规格" v-model="spec" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="单位" v-model="unit" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.from == 'equipment'">
      <group :gutter="'40px'">
        <x-input title="工程名称" v-model="category" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="规格" v-model="spec" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="单位" v-model="unit" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.from == 'project'">
      <group :gutter="'20px'">
        <x-input title="项目名称" v-model="projectData.projectName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="发包方名称" v-model="projectData.issuingContract" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="工程地址" v-model="projectData.address" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <datetime title="开始时间" v-model="projectData.startDate" placeholder="请选择"></datetime>
        <datetime title="结束时间" v-model="projectData.endDate" placeholder="请选择"></datetime>
        <popup-picker :title="'现场负责人'" :data="siteList" v-model="siteLeader" :placeholder="'请选择'"></popup-picker>
        <popup-picker :title="'项目采购人'" :data="buyerList" v-model="buyer" :placeholder="'请选择'"></popup-picker>
        <x-input title="应收金额" v-model="projectData.receivableAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="控制价" v-model="projectData.budget" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-textarea title="施工内容" v-model="projectData.content" placeholder="请输入" :autosize='true'></x-textarea>
      </group>
    </div>
    <div class="button_box">
      <x-button class="edit_btn" @click.native="addSubmit">确定</x-button>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'addNew',
  data() {
    return {
      username: "",
      phone: "",
      role: [],
      list: [],
      groupCodeList: [],
      category: "",
      spec: "",
      unit: "",
      from: "",
      siteLeader: [],
      buyer: [],
      projectData: {
        "projectName": "",
        "issuingContract": "",
        "address": "",
        "startDate": "",
        "endDate": "",
        "content": "",
        "siteLeader": "",
        "buyer": "",
        "receivableAmount": "",
        "budget": ""
      },
      siteList:[],
      buyerList:[]
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.onloadAdd();
  },
  watch: {

  },
  methods: {
    onloadAdd() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      if (this.$route.query.from) {
        this.from = this.$route.query.from;
      } else {
        this.from = this.$route.params.from;
      }
      switch (this.from) {
        case 'user':
          this.$store.commit('changeTitle', '新增用户');
          this.$store.commit('changeBtn', ' ');
          this.$post('/list-user-group.do').then(response => {
            this.groupCodeList = response.data;
            var list1 = [];
            $.each(response.data, function(index, val) {
              var listItem = {};
              listItem['name'] = val.name;
              listItem['value'] = val.name;
              list1.push(listItem);
            });
            this.list.push(list1);
          })
          break;
        case 'material':
          this.$store.commit('changeTitle', '新增材料');
          this.$store.commit('changeBtn', ' ');
          break;
        case 'equipment':
          this.$store.commit('changeTitle', '新增设备');
          this.$store.commit('changeBtn', ' ');
          break;
        case 'project':
          this.$store.commit('changeTitle', '新增项目');
          this.$store.commit('changeBtn', ' ');
          this.$fetch('/project/user-list.do').then(response => {
            var list1 = [];
            $.each(response.data.Site, function(index, val) {
              var listItem = {};
              listItem['name'] = val.name;
              listItem['value'] = val.name;
              list1.push(listItem);
            });
            this.siteList.push(list1);
            var list2 = [];
            $.each(response.data.Buyer, function(index, val) {
              var listItem = {};
              listItem['name'] = val.name;
              listItem['value'] = val.name;
              list2.push(listItem);
            });
            this.buyerList.push(list2);
          })
          break;
      }
    },
    addSubmit() {
      var _this = this;
      if (this.$route.query.from) {
        this.from = this.$route.query.from;
      } else {
        this.from = this.$route.params.from;
      }
      switch (this.from) {
        case 'user':
          let usergroupCode = "";
          let usergroup = _this.role[0];
          $.each(this.groupCodeList, function(index, val) {
            if (val.name == usergroup) {
              usergroupCode = val.value * 1;
            }
          })
          this.$post('/register.do', {
            "username": _this.username,
            "phone": _this.phone,
            "password": "888888",
            "usergroup": usergroup,
            "usergroupCode": usergroupCode
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.msg,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'userGroup'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }
          })
          break;
        case 'material':
          this.$post('/platform/material/add.do', {
            "category": _this.category,
            "spec": _this.spec,
            "unit": _this.unit
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.msg,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'materialControl'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }
          })
          break;
        case 'equipment':
          this.$post('/platform/equipment/add.do', {
            "category": _this.category,
            "spec": _this.spec,
            "unit": _this.unit
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.msg,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'equipmentControl'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }
          })
          break;
        case 'project':
          var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
          if (!re.test(_this.projectData.receivableAmount) && !re.test(_this.projectData.budget)) {
            alert("应收金额和控制价应为数字。");
            break;
          }
          _this.projectData.siteLeader = _this.siteLeader[0];
          _this.projectData.buyer = _this.buyer[0];
          this.$post('/project/add.do', _this.projectData).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.msg,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'project'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }
          })
          break;
      }
    },


  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#addNew {
  padding-bottom: 100px;

  .button_box {
    margin-top: 30px;
    padding: 15px;

    .edit_btn {
      background: #174192;
      color: white;
    }
  }

  .tips {
    padding-left: 15px;
    margin-top: 10px;
    font-size: 14px;
    color: grey;
  }
}

</style>
