<template>
  <div id="addNewLedger" style="height:100%;">
    <div class="header_div"></div>
    <div class="detail_div">
      <group :gutter="'10px'">
        <x-input title="项目名称" v-model="projectName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入" :readOnly="true"></x-input>
        <x-input title="挂靠公司" v-model="biddingCompany" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入" :readOnly="added"></x-input>
        <x-input title="开票公司" v-model="supplier" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="合同金额" v-model="materialContractAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="累计金额" v-model="cumulativePaymentAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="本次金额" v-model="paymentAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <datetime title="月份" v-model="paymentDate" placeholder="请选择" format="YYYY-MM-DD"></datetime>
        <x-textarea title="备注" v-model="remark" placeholder="请输入" :autosize='true'></x-textarea>
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
  name: 'addNewLedger',
  data() {
    return {
      projectId: "",
      projectName: "",
      biddingCompany: "",
      supplier: "",
      materialContractAmount: "",
      cumulativePaymentAmount: "",
      paymentAmount: "",
      paymentDate: "",
      remark: "",
      added:false
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
      this.$store.commit('changeTitle', '新增发票台账');
      this.$store.commit('changeBtn', ' ');

      this.projectId = sessionStorage.getItem('projectId');
      this.projectName = sessionStorage.getItem('projectName');
      if(sessionStorage.getItem('biddingCompany')){
            this.biddingCompany = sessionStorage.getItem('biddingCompany');
            this.added = true;
      }



    },
    addSubmit() {
      var _this = this;

      var postData = {
        projectId:this.projectId,
        projectName: this.projectName,
        biddingCompany: this.biddingCompany,
        supplier: this.supplier,
        materialContractAmount: this.materialContractAmount,
        cumulativePaymentAmount: this.cumulativePaymentAmount,
        paymentAmount: this.paymentAmount,
        paymentDate: this.paymentDate,
        remark: this.remark
      }


      this.$post('/balance/add-ledger-data.do', postData).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          setTimeout(function() {
            _this.$router.replace({
              name: 'ledgerList',
              query: {
                projectId:_this.projectId,
                projectName:_this.projectName
              }
            })
            _this.$router.go(-1)
          }, 800)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      })

    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#addNewLedger {
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
