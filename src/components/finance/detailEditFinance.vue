<template>
  <div id="detailEditFinance" style="height:100%;">
    <div class="header_div"></div>
    <div class="detail_div" v-if="this.$route.query.from == 'logistical'">
      <group :gutter="'10px'">
        <datetime title="月份" default-selected-value="month" v-model="logisticalMonth" placeholder="请选择" format="YYYY-MM"></datetime>
        <x-input title="名称" v-model="logisticalName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入" :readonly='true'></x-input>
        <x-input title="费用" v-model="logisticalCost" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.$route.query.from == 'salary'">
      <group :gutter="'10px'">
        <datetime title="月份" default-selected-value="month" v-model="salaryMonth" placeholder="请选择" format="YYYY-MM"></datetime>
        <x-input title="名称" v-model="salaryName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入" :readonly='true'></x-input>
        <x-input title="工资" v-model="salaryCost" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
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
  name: 'detailEditFinance',
  data() {
    return {
      logisticalId: "",
      logisticalMonth: "",
      logisticalName: "",
      logisticalCost: "",
      from: "",
      salaryId: "",
      salaryMonth: "",
      salaryName: "",
      salaryCost: ""
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
      this.from = this.$route.query.from;
      switch (this.$route.query.from) {
        case 'logistical':
          this.$nextTick(() => {
            this.logisticalId = this.$route.query.data.logisticalId
            this.logisticalMonth = this.$route.query.data.logisticalMonth;
            this.logisticalName = this.$route.query.data.logisticalName;
            this.logisticalCost = this.$route.query.data.logisticalCost;
          })
          this.$store.commit('changeTitle', '编辑后勤数据');
          this.$store.commit('changeBtn', ' ');

          break;
        case 'salary':
          this.$nextTick(() => {
            this.salaryId = this.$route.query.data.salaryId;
            this.salaryMonth = this.$route.query.data.salaryMonth;
            this.salaryName = this.$route.query.data.salaryName;
            this.salaryCost = this.$route.query.data.salaryCost;
          })
          this.$store.commit('changeTitle', '编辑后勤工资');
          this.$store.commit('changeBtn', ' ');

          break;
      }

    },
    editSubmit() {
      var _this = this;
      switch (this.$route.query.from) {
        case 'logistical':

          this.$post('/finance/update-logistical-data.do', {
            "id": _this.logisticalId,
            "cost": _this.logisticalCost
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.replace({
                  name: 'logisticalList'
                })
                _this.$router.go(-1)
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }
          });
          break;
        case 'salary':
          this.$post('/finance/update-logistical-salary.do', {
            "id": _this.salaryId, //列表中的唯一id
            "salary": _this.salaryCost
          }).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.replace({
                  name: 'salaryList'
                })
                _this.$router.go(-1)
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.msg,
              })
            }
          });
          break;
      }
    },
    delectSubmit() {
      var _this = this;
      switch (this.$route.query.from) {
        case 'logistical':
          this.$fetch('/finance/delete-logistical-data.do?id=' + _this.logisticalId).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.replace({
                  name: 'logisticalList'
                })
                _this.$router.go(-1)
              }, 800)
            } else {
              this.$vux.toast.show({
                text: response.data,
              })
            }
          });
          break;
        case 'salary':
          this.$fetch('/finance/delete-logistical-salary.do?id=' + _this.salaryId).then(response => {
            if (response.status === 0) {
              this.$vux.toast.show({
                text: response.data,
              })
              setTimeout(function() {
                _this.$router.replace({
                  name: 'salaryList'
                })
                _this.$router.go(-1)
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
    changeMonth(value) {
      var arr = value.split('-');
      var selectedMonth = arr[0] + '年' + arr[1] + '月';
      return selectedMonth;
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#detailEditFinance {
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
