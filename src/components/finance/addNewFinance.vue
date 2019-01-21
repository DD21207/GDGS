<template>
  <div id="addNewFinance" style="height:100%;">
    <div class="header_div"></div>
    <div class="detail_div" v-if="this.from == 'logistical'">
      <group :gutter="'10px'">
        <datetime title="月份" default-selected-value="month" v-model="logisticalMonth" placeholder="请选择" format="YYYY-MM"></datetime >
        <x-input title="名称" v-model="logisticalName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="费用" v-model="logisticalCost" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
      </group>
    </div>
    <div class="detail_div" v-else-if="this.from == 'salary'">
      <group :gutter="'10px'">
         <datetime title="月份" default-selected-value="month" v-model="salaryMonth" placeholder="请选择" format="YYYY-MM"></datetime >
        <x-input title="名称" v-model="salaryName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="工资" v-model="salaryCost" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
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
  name: 'addNewFinance',
  data() {
    return {
      logisticalMonth:"",
      logisticalName:"",
      logisticalCost:"",
      from:"",
      salaryMonth:"",
      salaryName:"",
      salaryCost:""
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
        this.from = this.$route.query.from;
      }
      switch (this.from) {
        case 'logistical':
          this.$store.commit('changeTitle', '新增后勤数据');
          this.$store.commit('changeBtn', ' ');
          break;
        case 'salary':
          this.$store.commit('changeTitle', '新增后勤工资');
          this.$store.commit('changeBtn', ' ');
          break;
        
      }
    },
    addSubmit() {
      var _this = this;
      if (this.$route.query.from) {
        this.from = this.$route.query.from;
      } else {
        this.from = this.$route.query.from;
      }
      switch (this.from) {
        case 'logistical':
          var postData = {
            "yearMonth":this.changeMonth(this.logisticalMonth), 
            "item":this.logisticalName,
            "cost":this.logisticalCost
          };

    
          this.$post('/finance/add-logistical-data.do', postData).then(response => {
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
          })
          break;
        case 'salary':
          var postData = {
            "yearMonth":this.changeMonth(this.salaryMonth), 
            "name":this.salaryName,
            "salary":this.salaryCost
          };

    
          this.$post('/finance/add-logistical-salary.do', postData).then(response => {
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
          })
          break;
        
      }
    },
    changeMonth(value){
      var arr = value.split('-');
      var selectedMonth = arr[0]+'年'+ arr[1]+'月';
      return selectedMonth;
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#addNewFinance {
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
