<template>
  <div id="estItemAdd" style="height:100%;">
    <div class="header_div"></div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">设备</tab-item>
      <tab-item @on-item-click="onItemClick">材料</tab-item>
    </tab>
    <!-- <transition name="slide-fade"> -->
    <div class="detail_div" v-if="showEquipment">
      <group :gutter="'10px'">
        <popup-picker :title="'设备名称'" :data="eCategoryList" v-model="eCategorySelected" :placeholder="'请选择'" @on-change="geteSpecData"></popup-picker>
        <popup-picker :title="'设备规格'" :data="eSpecList" v-model="eSpecSelected" :placeholder="'请选择'"></popup-picker>
        <x-number :title="'设备数量'" v-model="eQuantityEst" button-style="round" :fillable='true' width="100px"></x-number>
      </group>
    </div>
    <!-- </transition> -->
    <!-- <transition name="slide-fade"> -->
    <div class="detail_div" v-if="!showEquipment">
      <group :gutter="'10px'">
        <popup-picker :title="'材料名称'" :data="mCategoryList" v-model="mCategorySelected" :placeholder="'请选择'" @on-change="getmSpecData"></popup-picker>
        <popup-picker :title="'材料规格'" :data="mSpecList" v-model="mSpecSelected" :placeholder="'请选择'"></popup-picker>
        <x-number :title="'材料数量'" v-model="mQuantityEst" button-style="round" :fillable='true' width="100px"></x-number>
      </group>
    </div>
    <!-- </transition> -->
    <div class="button_box">
      <x-button class="edit_btn" @click.native="addSubmit">确定</x-button>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'estItemAdd',
  data() {
    return {
      estItemData: {},
      itemLists: [],
      showEquipment: true,
      eCategoryCode: [],
      eCategoryList: [],
      eCategorySelected: [],
      eSpecCode: [],
      eSpecList: [],
      eSpecSelected: [],
      mCategoryCode: [],
      mCategoryList: [],
      mCategorySelected: [],
      mSpecCode: [],
      mSpecList: [],
      mSpecSelected: [],
      eQuantityEst: 0,
      mQuantityEst: 0
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
    onItemClick() {
      this.showEquipment = !this.showEquipment;
    },
    onloadAdd() {
      var _this = this;
      this.estItemData = JSON.parse(sessionStorage.getItem('estItemData') || "[]")
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.estItemData.projectName);
      this.$store.commit('changeBtn', ' ');

      // 获取设备Category列表
      this.$fetch('/site-header/equipment-category-list.do').then(response => {
        this.eCategoryCode = response.data;
        var list1 = [];
        $.each(response.data, function(index, val) {
          var listItem = {};
          listItem['name'] = val.category;
          listItem['value'] = val.category;
          list1.push(listItem);
        });
        this.eCategoryList.push(list1);
      })

      // 获取材料Category列表
      this.$fetch('/site-header/material-category-list.do').then(response => {
        this.mCategoryCode = response.data;
        var list1 = [];
        $.each(response.data, function(index, val) {
          var listItem = {};
          listItem['name'] = val.spec;
          listItem['value'] = val.spec;
          list1.push(listItem);
        });
        this.mCategoryList.push(list1);
      })
    },
    geteSpecData(value) {
      if (value[0]) {
        let Code = "";
        let category = value[0];
        // 获取设备Spec列表
        this.$fetch('/site-header/equipment-list.do?category=' + category).then(response => {
          this.eSpecCode = response.data;
          var list1 = [];
          $.each(response.data, function(index, val) {
            var listItem = {};
            listItem['name'] = val.spec;
            listItem['value'] = val.spec;
            list1.push(listItem);
          });
          this.eSpecList.push(list1);
        })
      }
    },
    getmSpecData(value) {
      if (value[0]) {
        let Code = "";
        let category = value[0];
        // 获取设备Spec列表
        this.$fetch('/site-header/material-list.do?category=' + category).then(response => {
          this.mSpecCode = response.data;
          var list1 = [];
          $.each(response.data, function(index, val) {
            var listItem = {};
            listItem['name'] = val.spec;
            listItem['value'] = val.spec;
            list1.push(listItem);
          });
          this.mSpecList.push(list1);
        })
      }

    },
    addSubmit() {
      var _this = this;
      if (this.showEquipment == true) {
        let Code = "";
        let Unit = ""
        let selected = _this.eSpecSelected[0];
        $.each(this.eSpecCode, function(index, val) {
          if (val.spec == selected) {
            Code = val.id * 1;
            Unit = val.unit;
          }
        })
        var postData = {
          "projectId": _this.estItemData.projectId,
          "projectName": _this.estItemData.projectName,
          "item": "设备",
          "itemId": Code,
          "category": _this.eCategorySelected[0],
          "spec": _this.eSpecSelected[0],
          "unit": Unit,
          "quantityEst": _this.eQuantityEst
        }
      } else {
        let Code = "";
        let Unit = ""
        let selected = _this.mSpecSelected[0];
        $.each(this.mSpecCode, function(index, val) {
          if (val.spec == selected) {
            Code = val.id * 1;
            Unit = val.unit;
          }
        })
        var postData = {
          "projectId": _this.estItemData.projectId,
          "projectName": _this.estItemData.projectName,
          "item": "材料",
          "itemId": Code,
          "category": _this.mCategorySelected[0],
          "spec": _this.mSpecSelected[0],
          "unit": Unit,
          "quantityEst": _this.mQuantityEst
        }
      }

      this.$post('/site-header/estimate.do',postData ).then(response => {
          if (response.status === 0) {
            this.$vux.toast.show({
              text: response.data,
            })
            setTimeout(function() {
              this.$router.push({
                path: 'estItem',
                query: {
                  projectId:  _this.estItemData.projectId,
                  projectName:  _this.estItemData.projectName
                }
              })
            }, 800)
          } else {
            this.$vux.toast.show({
              text: response.data,
            })
          }
        })

    },


  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#estItemAdd {
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

  .slide-fade-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-leave-active {
    transition: all .0s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(10px);
    opacity: 0;
  }
}

</style>
