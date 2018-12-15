<template>
  <div id="detailEdit" style="height:100%;">
    <div class="header_div"></div>
    <div class="detail_div" v-if="this.$route.query.from == 'usergroup'">
      <group :gutter="'40px'">
        <x-input title="姓名" v-model="username" :text-align="'right'" :placeholder-align="'right'" :readonly='true'></x-input>
        <x-input title="电话" v-model="phone" :text-align="'right'" :placeholder-align="'right'" :readonly='true'></x-input>
        <popup-picker :title="'角色'" :data="list" v-model="role" :placeholder="'请选择'"></popup-picker>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.$route.query.from == 'materialControl'">
      <group :gutter="'40px'">
        <x-input title="名称" v-model="category" :text-align="'right'" :placeholder-align="'right'"></x-input>
        <x-input title="规格" v-model="spec" :text-align="'right'" :placeholder-align="'right'"></x-input>
        <x-input title="单位" v-model="unit" :text-align="'right'" :placeholder-align="'right'"></x-input>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.$route.query.from == 'equipmentControl'">
      <group :gutter="'40px'">
        <x-input title="名称" v-model="category" :text-align="'right'" :placeholder-align="'right'"></x-input>
        <x-input title="规格" v-model="spec" :text-align="'right'" :placeholder-align="'right'"></x-input>
        <x-input title="单位" v-model="unit" :text-align="'right'" :placeholder-align="'right'"></x-input>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.$route.query.from == 'project'">
      <group :gutter="'20px'">
        <x-input title="项目名称" v-model="projectData.projectName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="发包方名称" v-model="projectData.issuingContract" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="工程地址" v-model="projectData.address" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <datetime title="开始时间" v-model="projectData.startDate" placeholder="请选择" v-if="hackReset"></datetime>
        <datetime title="结束时间" v-model="projectData.endDate" placeholder="请选择" v-if="hackReset"></datetime>
        <popup-picker :title="'现场负责人'" :data="siteList" v-model="siteLeader" :placeholder="'请选择'"></popup-picker>
        <popup-picker :title="'项目采购人'" :data="buyerList" v-model="buyer" :placeholder="'请选择'"></popup-picker>
        <x-input title="应收金额" v-model="projectData.receivableAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="控制价" v-model="projectData.budget" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-textarea title="施工内容" v-model="projectData.content" placeholder="请输入" :autosize='true'></x-textarea>
      </group>
    </div>
    <div class="button_box">
      <x-button class="edit_btn" @click.native="editSubmit">修改</x-button>
      <x-button type="warn" @click.native="delectSubmit">删除</x-button>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'detailEdit',
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
      siteLeader:[],
      buyer:[],
      projectData: {
        "projectName": "",
        "issuingContract": "",
        "address": "",
        "startDate": "",
        "endDate": "",
        "content": "",
        "siteLeader": "aaa",
        "buyer": "",
        "receivableAmount": "",
        "budget": "",
        "id": 0
      },
      siteList:[],
      buyerList:[],
      hackReset: false,
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {

    this.onloadEdit();
  },
  watch: {

  },
  methods: {
    onloadEdit() {
      var _this = this;
      this.$store.commit('isShow', ' ');
      console.log(this.$route.query.data)
      switch (this.$route.query.from) {
        case 'usergroup':
          this.username = this.$route.query.data.username;
          this.phone = this.$route.query.data.phone;
          this.role.push(this.$route.query.data.usergroup);
          this.$store.commit('changeTitle', '编辑用户');
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
        case 'materialControl':
          this.category = this.$route.query.data.category;
          this.spec = this.$route.query.data.spec;
          this.unit = this.$route.query.data.unit;
          this.$store.commit('changeTitle', '编辑材料');
          this.$store.commit('changeBtn', ' ');
          break;
        case 'equipmentControl':
          this.category = this.$route.query.data.category;
          this.spec = this.$route.query.data.spec;
          this.unit = this.$route.query.data.unit;
          this.$store.commit('changeTitle', '编辑设备');
          this.$store.commit('changeBtn', ' ');
          break;
        case 'project':
          this.projectData = this.$route.query.data;
          this.siteLeader.push(this.projectData.siteLeader);
          this.buyer.push(this.projectData.buyer);
          this.$store.commit('changeTitle', '编辑项目');
          this.$store.commit('changeBtn', ' ');
          this.hackReset = false
          this.$nextTick(() => {
              this.hackReset = true
            })
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
    editSubmit() {
      var _this = this;
      switch (this.$route.query.from) {
        case 'usergroup':
          let usergroupCode = "";
          let usergroup = _this.role[0];
          $.each(this.groupCodeList, function(index, val) {
            if (val.name == usergroup) {
              usergroupCode = val.value * 1;
            }
          });
          this.$post('/update-user.do', {
            "id": _this.$route.query.data.id,
            "usergroup": usergroup,
            "usergroupCode": usergroupCode
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'userGroup'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'materialControl':
          this.$post('/platform/material/update.do', {
            "id": _this.$route.query.data.id,
            "category": _this.category,
            "spec": _this.spec,
            "unit": _this.unit
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'materialControl'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'equipmentControl':
          this.$post('/platform/equipment/update.do', {
            "id": _this.$route.query.data.id,
            "category": _this.category,
            "spec": _this.spec,
            "unit": _this.unit
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'equipmentControl'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'project':
          var re = /^[0-9]+.?[0-9]*$/; 
          if (!re.test(_this.projectData.receivableAmount) && !re.test(_this.projectData.budget)) {
            alert("应收金额和控制价应为数字。");
            break;
          }
          _this.projectData.siteLeader = _this.siteLeader[0];
          _this.projectData.buyer = _this.buyer[0];
          _this.projectData.updateTime = null;
          this.$post('/project/update.do', _this.projectData).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'project'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
      }
    },
    delectSubmit() {
      var _this = this;
      switch (this.$route.query.from) {
        case 'usergroup':
          this.$post('/delete-user.do?userID=' + _this.$route.query.data.id).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'userGroup'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'materialControl':
          this.$post('/platform/material/delete.do?materialID=' + _this.$route.query.data.id).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'materialControl'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'equipmentControl':
          this.$post('/platform/equipment/delete.do?equipmentID=' + _this.$route.query.data.id).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'equipmentControl'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'project':
          this.$post('/project/update.do', {
            "id":  _this.$route.query.data.id, //这个是必须的! 项目的唯一id
            "status": "delete" //这个必须写死delete
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.push({
                  name: 'project'
                })
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
      }
    }

  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';

#detailEdit {
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
