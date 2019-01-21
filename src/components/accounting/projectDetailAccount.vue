<template>
  <div id="projectDetailAccount" style="height:100%;">
    <div class="header_div"></div>
    <div class="content_div">
      <load-more v-if="isLoad" :show-loading="true" :tip="'正在加载'"></load-more>
      <divider v-if="noData">暂无数据</divider>
      <div class="table_box">
        <x-table :full-bordered="true">
          <tbody>
            <tr>
              <td>项目名称</td>
              <td>{{detailData.projectName}}</td>
            </tr>
            <tr>
              <td>项目地址</td>
              <td>{{detailData.address}}</td>
            </tr>
            <tr>
              <td>项目进度</td>
              <td>{{detailData.progress | formatPercent}}</td>
            </tr>
            <tr>
              <td>控制价</td>
              <td>{{detailData.totalCost}} / {{detailData.budget}}</td>
            </tr>
            <tr>
              <td>应收进度</td>
              <td>{{detailData.receivable}} / {{detailData. receivableAmount}}</td>
            </tr>
            <tr>
              <td>开始时间</td>
              <td>{{detailData.startDate}}</td>
            </tr>
            <tr>
              <td>结束时间</td>
              <td>{{detailData.endDate}}</td>
            </tr>
            <tr>
              <td>现场负责人</td>
              <td>{{detailData.siteLeader}}</td>
            </tr>
            <tr>
              <td>项目采购人</td>
              <td>{{detailData.buyer}}</td>
            </tr>
            <tr>
              <td>设备成本</td>
              <td>{{detailData.equipmentCost}}</td>
            </tr>
             <tr>
              <td>材料成本</td>
              <td>{{detailData.materialCost}}</td>
            </tr>
             <tr>
              <td>人工成本</td>
              <td>{{detailData.workerCost}}</td>
            </tr>
             <tr>
              <td>总成本</td>
              <td>{{detailData.totalCost}}</td>
            </tr>
          </tbody>
        </x-table>
        <p style="margin-top:10px;border-bottom: 1px dashed grey">现场图片：</p>
        <div class="detail_img_box" v-for="(item,index) in detailData.imageURLs">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: "projectDetail",
  data() {
    return {
      projectId: "",
      isLoad: true,
      noData: false,
      detailData: {},
      footer: {
        title: "加载更多"
      }
    }
  },
  components: {},
  filters: {
    formatPercent: function(value) {
      return value + "%"
    }
  },
  mounted: function() {
    this.onloadprojectDetailAccount();
  },
  watch: {},
  methods: {
    onloadprojectDetailAccount() {
      var _this = this;
      this.$store.commit("isShow", " ");
      this.$store.commit("changeTitle", this.$route.query.projectName);
      this.$store.commit("changeBtn", " ");
      this.projectId = this.$route.query.projectId;
  
      this.$fetch(
        "/accounting/project-details.do?projectId=" + this.projectId
      ).then(response => {
        if (response.status === 0) {
          this.isLoad = false;
          if (response.data.length == 0) {
            this.noData = true;
          } else {
            this.detailData = response.data;
          }
          console.log(response.data);
        } else {
          this.$vux.toast.show({
            text: response.msg
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "../../assets/less/common.less";

#projectDetailAccount {
  .content_div {
    width: 100%;

    .table_box{
      padding:0 15px;
      margin-top: 20px;
    }
    margin-bottom: 20px;
  }
}
</style>
