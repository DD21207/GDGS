<template>
  <div id="addOrder" style="height:100%;">
    <div class="header_div"></div>
    <div class="input_div" v-show="addEquipment">
    	<p class="title">创建订单</p>
    	<div class="input_box">
    		<group :gutter="'0px'">
	    		<x-input title="联系人" v-model="contact" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
	    		<x-input title="联系电话" v-model="phone" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input>
          <datetime v-model="arriveTime" format="YYYY-MM-DD HH" title="到货时间"></datetime>
	    	<!-- 	<x-input title="到货时间" v-model="arriveTime" :text-align="'right'" :placeholder-align="'right'" placeholder="请输入"></x-input> -->
	    	</group>
	    	<p class="tips">已添加材料列表</p>
	    	<group :gutter="'0px'">
	    		<x-number :title="item.category+' - '+item.spec" v-model="item.quantityEst" :text-align="'right'"  placeholder="请输入" v-for="(item, index) in list" button-style="round" :fillable='true' width="100px"  :key="index"></x-number>
	    		
	    	</group>
    	</div>
    	<div class="button_box">
	      <x-button class="edit_btn" @click.native="addItemChange">继续添加材料</x-button>
	      <x-button class="edit_btn" @click.native="addSubmit">确定下单</x-button>
	    </div>
    </div>
    <div class="add_box" v-show="!addEquipment">
    	<!-- <tab>
	      <tab-item selected @on-item-click="onItemClick">设备</tab-item>
	      <tab-item @on-item-click="onItemClick">材料</tab-item>
	    </tab> -->
	    <!-- <transition name="slide-fade"> -->
	    <!-- <div class="detail_div" v-if="showEquipment">
	      <group :gutter="'10px'">
	        <popup-picker :title="'设备名称'" :data="eCategoryList" v-model="eCategorySelected" :placeholder="'请选择'" @on-change="geteSpecData"></popup-picker>
	        <popup-picker :title="'设备规格'" :data="eSpecList" v-model="eSpecSelected" :placeholder="'请选择'" @on-change="getEUnit"></popup-picker>
	        <x-number :title="'设备数量'" v-model="eQuantityEst" button-style="round" :fillable='true' width="100px"></x-number>
	         <x-input title="数量单位" v-model="eUnit" :text-align="'right'" :placeholder-align="'right'" :readonly='true'></x-input>
	      </group>
	    </div> -->
	    <!-- </transition> -->
	    <!-- <transition name="slide-fade"> -->
	    <div class="detail_div" v-if="!showEquipment">
	      <group :gutter="'10px'">
	        <popup-picker :title="'材料名称'" :data="mCategoryList" v-model="mCategorySelected" :placeholder="'请选择'" @on-change="getmSpecData"></popup-picker>
	        <popup-picker :title="'材料规格'" :data="mSpecList" v-model="mSpecSelected" :placeholder="'请选择'" @on-change="getMUnit"></popup-picker>
	        <x-number :title="'材料数量'" v-model="mQuantityEst" button-style="round" :fillable='true' width="100px"></x-number>
	        <x-input title="数量单位" v-model="mUnit" :text-align="'right'" :placeholder-align="'right'" :readonly='true'></x-input>
	      </group>
	    </div>
	    <!-- </transition> -->
	    <div class="button_box">
	      <x-button class="edit_btn" @click.native="addItem">确定</x-button>
	    </div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
export default {
  name: 'addOrder',
  data() {
    return {
      addEquipment:true,
      contact:"",
      phone:"",
      address:"",
      arriveTime:"",
      orderData: {},
      itemLists: [],
      showEquipment: false,
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
      mQuantityEst: 0,
      eUnit:"",
      mUnit:"",
      eId:"",
      mId:"",
      list:[]
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    this.onloadAdd();
  },
  computed: {
	    itemNum: function () {
	    	var _this = this;
	    	var zeroList = [];
	    	if(_this.list.length != 0){
	    		$.each(_this.list,function(index,item){
					if(item.quantityEst == 0){
						zeroList.push(index)
		           }
		    	})
	    	}
	        return zeroList;
	    }
	},
  watch: {
  		itemNum:function(curVal,oldVal){
  			var _this = this;
    　　　　 if(curVal.length != 0 && curVal.length != oldVal.length ){
    			_this.list.splice(curVal[0],1)
    		}
　　　　}
  },
  methods: {
    onItemClick() {
      this.showEquipment = !this.showEquipment;
    },
    onloadAdd() {
      var _this = this;
      this.orderData = JSON.parse(sessionStorage.getItem('orderData') || "[]")
      this.$store.commit('isShow', ' ');
      this.$store.commit('changeTitle', this.orderData.projectName);
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
          listItem['name'] = val.category;
          listItem['value'] = val.category;
          list1.push(listItem);
        });
        this.mCategoryList.push(list1);
      })
    },
    geteSpecData(value) {
      if (value[0]) {
        this.eSpecList = [];
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
        this.mSpecList = [];
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
    getEUnit(value){
      let _this = this;
      $.each(this.eSpecCode, function(index, val) {
        if (val.spec == value[0]) {
          _this.eId = val.id * 1;
          _this.eUnit = val.unit;
        }
      })
    },
    getMUnit(value){
      let _this = this;
      $.each(this.mSpecCode, function(index, val) {
        if (val.spec == value[0]) {
          _this.mId = val.id * 1
          _this.mUnit = val.unit;
        }
      })
    },
    addItem() {
      var _this = this;
      if (this.showEquipment == true) {
        var Data = {
          "item": "设备",
          "itemId": _this.eId,
          "category": _this.eCategorySelected[0],
          "spec": _this.eSpecSelected[0],
          "unit": _this.eUnit,
          "quantityEst": _this.eQuantityEst
        }
        var isExist = false;
        $.each(_this.list,function(index,val){
        	var test = val.category + val.spec;
        	var test1 = _this.eCategorySelected[0] + _this.eSpecSelected[0]
        	if( test == test1){
        		isExist = true;
        		return false;
        	}
        })
        if( isExist == false){
        	_this.list.push(Data)
        }else{
        	const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
			this.$vux.confirm.show({
			  content:'该设备/材料已经添加，如果要修改数量，请按确定到列表修改，选错请按取消！',
			  onCancel () {
			  },
			  onConfirm () {
			  	_this.addEquipment = true;
			  }
			})
        }
        
      } else {
        var Data = {
          "item": "材料",
          "itemId": _this.mId,
          "category": _this.mCategorySelected[0],
          "spec": _this.mSpecSelected[0],
          "unit": _this.mUnit,
          "quantityEst": _this.mQuantityEst
        }
        _this.list.push(Data)
      }

      console.log(_this.list)
      this.addEquipment = !this.addEquipment;

    },
    addItemChange(){
    	this.eCategorySelected  = []; 
    	this.eSpecSelected = [];
    	this.eQuantityEst = 0;
    	this.eUnit = " ";
    	this.mCategorySelected  = []; 
    	this.mSpecSelected = [];
    	this.mQuantityEst = 0;
    	this.mUnit = " ";
    	this.addEquipment = !this.addEquipment;
    },
    addSubmit(){
    	var _this = this;
    	var postData = {
		  "projectId":_this.orderData.projectId,
		  "contact":_this.contact,
		  "phone":_this.phone,
		  "address":_this.orderData.address, //写死的, 从/site-header/project-list.do获取
		  "arriveTime":_this.arriveTime+":00:00",
		  "projectOrderItemList":_this.list
		};





    	this.$post('/site-header/order-create.do',postData ).then(response => {
          if (response.status === 0) {
            this.$vux.toast.show({
              text: response.data,
            })
            setTimeout(function() {
              _this.$router.push({
                path: 'orderList',
                query: {
                  projectId:  _this.orderData.projectId,
                  projectName:  _this.orderData.projectName,
                  address:     _this.orderData.address
                }
              })
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

#addOrder {
  padding-bottom: 100px;
	.input_div{
		padding-top: 10px;
	  

	    .title {
	    	background: #f8f8f8;
	      padding-left: 20px;
	      padding-bottom: 10px;
	      // width: 100%;
	      font-weight: bold;
	      font-size: 17px;
	    }
	    .input_box{
	    	background:white;
	    	height:auto;
	    	width:100%;
			
			.tips{
				padding-left: 10px;
		      padding-bottom: 10px;
		      width: 100%;
		      font-size: 15px;
		      color:black;
			   border-bottom: 1px solid lightgrey;

			}
	    }
	}


  .button_box {
    margin-top: 30px;
    padding: 15px;
	background:white;
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
