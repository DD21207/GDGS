<template>
  <div id="detailEditLedger" style="height:100%;">
    <div class="header_div"></div>
    <div class="detail_div">
      <group :gutter="'10px'">
        <x-input title="项目名称" v-model="listData.projectName" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入" :readOnly="true"></x-input>
        <x-input title="挂靠公司" v-model="listData.biddingCompany" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入" :readOnly="true"></x-input>
        <x-input title="开票公司" v-model="listData.supplier" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="合同金额" v-model="listData.materialContractAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="累计金额" v-model="listData.cumulativePaymentAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <x-input title="本次金额" v-model="listData.paymentAmount" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
        <datetime title="月份" v-model="listData.paymentDate" placeholder="请选择" format="YYYY-MM-DD"></datetime>
        <x-textarea title="备注" v-model="listData.remark" placeholder="请输入" :autosize='true'></x-textarea>
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
  name: 'detailEditLedger',
  data() {
    return {
      listData: {
        projectId: "",
        projectName: "",
        biddingCompany: "",
        supplier: "",
        materialContractAmount: "",
        cumulativePaymentAmount: "",
        paymentAmount: "",
        paymentDate: "",
        remark: "",
        id: ""
      }
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
      this.$store.commit('changeTitle', '编辑发票台账');
      this.$store.commit('changeBtn', ' ');
      this.$nextTick(() => {

        if(typeof(this.$route.query.data) == "object"){
           this.listData = this.$route.query.data;
           console.log(this.$route.query.data)
        }else{
           this.listData = JSON.parse(sessionStorage.getItem('ledgerData') || "[]")
        }

      })


    },
    editSubmit() {
      var _this = this;
      var data = {
        "id": this.listData.id, //列表中的唯一id
        "supplier": this.listData.supplier, //可选, 没有的时候不用出现这个字段 材料商开票公司
        "materialContractAmount": this.listData.materialContractAmount, //可选, 没有的时候不用出现这个字段 签订材料合同金额
        "cumulativePaymentAmount": this.listData.cumulativePaymentAmount, //可选, 没有的时候不用出现这个字段 签订材料合同金额
        "paymentAmount": this.listData.paymentAmount, //可选, 没有的时候不用出现这个字段 签订材料合同金额
        "paymentDate": this.listData.paymentDate, //可选, 没有的时候不用出现这个字段 签订材料合同金额
        "remark": this.listData.remark //可选, 没有的时候不用出现这个字段 签订材料合同金额
      }
      this.$post('/balance/update-ledger-data.do', data).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          setTimeout(function() {
            _this.$router.replace({
              name: 'ledgerList',
              query: {
                projectId: _this.listData.projectId,
                projectName: _this.listData.projectName
              }
            })
            _this.$router.go(-1)
          }, 800)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      });
    },
    delectSubmit() {
      var _this = this;
      this.$fetch('/balance/delete-ledger-data.do?id=' + _this.listData.id).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          setTimeout(function() {
            _this.$router.replace({
              name: 'ledgerList',
              query: {
                projectId: _this.listData.projectId,
                projectName: _this.listData.projectName
              }
            })
            _this.$router.go(-1)
          }, 800)
        } else {
          this.$vux.toast.show({
            text: response.data,
          })
        }
      });
    }

  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#detailEditLedger {
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
