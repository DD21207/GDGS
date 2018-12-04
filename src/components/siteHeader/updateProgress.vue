<template>
  <div id="updateProgress" style="height:100%;">
    <div class="header_div"></div>
    <div class="input_div" v-show="addEquipment">
      <p class="title">更新进度</p>
      <div class="input_box">
        <group :gutter="'0px'">
          <cell title="当前进度" :inline-desc="progress+' %'" primary="content">
            <range v-model="progress"></range>
          </cell>
          <x-input title="人工成本" v-model="workerCost" :text-align="'right'" :placeholder-align="'right'" v-show="progress == 100" placeholder="请输入"></x-input>
        </group>
        <p class="tips">设备成本列表
          <x-button mini class="edit_btn" @click.native="addItemChange">添加设备</x-button>
        </p>
        <group :gutter="'0px'">
          <div v-for="(item, index) in list" class="item_box">
            <x-number :title="item.category+' - '+item.spec" v-model="item.quantityAct" :text-align="'right'" placeholder="请输入" button-style="round" :fillable='true' width="100px" :key="index"></x-number>
            <p class="totalBox">成本：{{item | totalFormat}}</p>
          </div>
        </group>
        <p class="tips">上传现场图片
          <x-button mini class="edit_btn" @click.native="addImg">添加图片</x-button>
        </p>
        <div style="margin-top:10px;">
          <div class="imgItem" v-for="(item, index) in localIdImgs">
            <img class="previewerImg" :src="item.src" width="100" @click="show(index)">
            <span class="iconfont icon-shanchu delectImg" @click="removeImg(index)" ></span>
          </div>
          <div class="clear">
          </div>
          <div v-transfer-dom>
            <previewer ref="previewer" :list="localIdImgs" :options="options">
            </previewer>
          </div>
        </div>
      </div>
      <div class="button_box">
        <x-button class="edit_btn" @click.native="addSubmit">确定更新</x-button>
      </div>
    </div>
    <div class="add_box" v-show="!addEquipment">
      <div class="detail_div" v-if="showEquipment">
        <group :gutter="'10px'">
          <popup-picker :title="'设备名称'" :data="eCategoryList" v-model="eCategorySelected" :placeholder="'请选择'" @on-change="geteSpecData"></popup-picker>
          <popup-picker :title="'设备规格'" :data="eSpecList" v-model="eSpecSelected" :placeholder="'请选择'" @on-change="getEUnit"></popup-picker>
          <x-number :title="'设备数量'" v-model="eQuantityEst" button-style="round" :fillable='true' width="100px"></x-number>
          <x-input title="数量单位" v-model="eUnit" :text-align="'right'" :placeholder-align="'right'" :readonly='true'></x-input>
          <x-input title="单价" v-model="ePrice" :text-align="'right'" :placeholder-align="'right'"></x-input>
        </group>
      </div>
      <div class="button_box">
        <x-button class="edit_btn" @click.native="addItem">确定</x-button>
      </div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>
<script>
import wx from 'weixin-jsapi'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole


export default {
  name: 'updateProgress',
  data() {
    return {
      addEquipment: true,
      contact: "",
      phone: "",
      address: "",
      arriveTime: "",
      progressData: {},
      itemLists: [],
      showEquipment: true,
      eCategoryCode: [],
      eCategoryList: [],
      eCategorySelected: [],
      eSpecCode: [],
      eSpecList: [],
      eSpecSelected: [],
      eQuantityEst: 0,
      eUnit: "",
      eId: "",
      list: [],
      progress: 0,
      ePrice: 0,
      workerCost: "",
      localIdImgs: [],
      serverId: [],
      options: {

      }

    }
  },
  components: {

  },
  filters: {
    totalFormat: function(val) {
      return val.unitPrice * val.quantityAct * 1
    }
  },
  mounted: function() {
    // let vConsole = new VConsole() // 初始化
    this.getUrlConfig();
    this.onloadUpdate();

  },
  computed: {
    itemNum: function() {
      var _this = this;
      var zeroList = [];
      if (_this.list.length != 0) {
        $.each(_this.list, function(index, item) {
          if (item.quantityEst == 0) {
            zeroList.push(index)
          }
        })
      }
      return zeroList;
    }
  },
  watch: {
    itemNum: function(curVal, oldVal) {
      var _this = this;
      if (curVal.length != 0 && curVal.length != oldVal.length) {
        _this.list.splice(curVal[0], 1)
      }
    }
  },
  methods: {
    onItemClick() {
      this.showEquipment = !this.showEquipment;
    },
    onloadUpdate() {
      var _this = this;
      if (this.$route.query.projectName) {
        this.$store.commit('changeTitle', this.$route.query.projectName);
        this.progressData['projectId'] = this.$route.query.projectId;
        this.progressData['projectName'] = this.$route.query.projectName;
        this.progress = this.$route.query.progress;
      } else {
        this.progressData = JSON.parse(sessionStorage.getItem('progressData') || "[]")
        this.$store.commit('changeTitle', this.progressData.projectName);
        this.progress = this.progressData.progress;

      }

      this.$store.commit('isShow', ' ');
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

    getEUnit(value) {
      let _this = this;
      $.each(this.eSpecCode, function(index, val) {
        if (val.spec == value[0]) {
          _this.eId = val.id * 1;
          _this.eUnit = val.unit;
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
          "quantityAct": _this.eQuantityEst,
          "unitPrice": _this.ePrice
        }
        var isExist = false;
        $.each(_this.list, function(index, val) {
          var test = val.category + val.spec;
          var test1 = _this.eCategorySelected[0] + _this.eSpecSelected[0]
          if (test == test1) {
            isExist = true;
            return false;
          }
        })
        if (isExist == false) {
          _this.list.push(Data)
        } else {
          const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
          this.$vux.confirm.show({
            content: '该设备/材料已经添加，如果要修改数量，请按确定到列表修改，选错请按取消！',
            onCancel() {},
            onConfirm() {
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
    addItemChange() {
      this.eCategorySelected = [];
      this.eSpecSelected = [];
      this.eQuantityEst = 0;
      this.ePrice = 0;
      this.eUnit = " ";
      this.addEquipment = !this.addEquipment;
    },
    addSubmit() {
      var _this = this;
      var time = _this.getTime();
      if( _this.workerCost != ""){
        var workerCost =  _this.workerCost
      }else{
        var workerCost = null;
      }
      var postData = {
        "id": _this.progressData.projectId.toString(),
        "dateStr": time,
        "workerCost":workerCost,
        "mediaId": _this.serverId,
        "progress": _this.progress.toString(),
        "projectOrderItemList": _this.list
      };

      this.$post('/site-header/project-update.do', postData).then(response => {
        if (response.status === 0) {
          this.$vux.toast.show({
            text: response.data,
          })
          setTimeout(function() {
            _this.$router.push({
              path: 'siteIndex',
            })
          }, 800)
        } else {
          this.$vux.toast.show({
            text: response.msg,
          })
        }
      })
    },
    getUrlConfig() {
      this.$fetch('/wechat/get-config.do').then(response => {
        if (response.status === 0) {
          let data = response.data
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ["chooseImage", "uploadImage", "downloadImage", ]
            // 必填，需要使用的JS接口列表
          });
          wx.error(function(res) {
            console.log(res)
          });
        }

      }, response => {
        console.log("请求失败了!!!!")
      })
    },
    addImg() {
      let _this = this;
      wx.checkJsApi({
        jsApiList: [
          'chooseImage',
          'uploadImage',
          'getLocalImgData',
          'downloadImage'
        ],
        success: function(res) {
          console.log(JSON.stringify(res));
        }
      });
      wx.chooseImage({
        // count: _this.imgaesMaxLenght -  _this.localIdImgs.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // 判断 ios 
          if (window.__wxjs_is_wkwebview) {
            _this.wxgetLocalImgData(localIds);
          } else {
            localIds.forEach((item, index) => {
              var data = {};
              data["src"] = item
              _this.localIdImgs.push(data);
            });
          }
          _this.wxuploadImage(localIds);

        },
        fail: function(res) {
          console.log("失败")
        }
      });
    },
    wxuploadImage(localIds) {
      let _this = this;
      var i = 0;
      var length = localIds.length;
      var upload = function() {
        let loacId = localIds[i];
        if (window.__wxjs_is_wkwebview) {
          if (loacId.indexOf("wxlocalresource") != -1) {
            loacId = loacId.replace("wxlocalresource", "wxLocalResource");
          }
        }
        wx.uploadImage({
          localId: loacId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function(res) {
            //    alert(res.serverId);
            var serverId = res.serverId

            _this.serverId.push(serverId);
            console.log(_this.serverId)

            i++;
            i < length && upload();
          },
          fail: function(error) {
            alert("失败11")
          }
        });
      }
      upload();
    },
    wxgetLocalImgData(localIds) {
      let _this = this;
      var i = 0;
      var length = localIds.length;
      var upload = function() {
        wx.getLocalImgData({
          localId: localIds[i], // 图片的localID
          success: function(res) {
            let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            localData = localData.replace('jgp', 'jpeg');
            var data = {};
            data["src"] = localData
            _this.localIdImgs.push(data);
            console.log(_this.localIdImgs)

            // if (_this.localIdImgs.length >= _this.imgaesMaxLenght) {
            //   _this.imgLenght = false
            // }
            i++;
            i < length && upload();
          }
        });
      }
      upload();
    },
    removeImg(index) {
      var _this = this;
      _this.localIdImgs.splice(index, 1);
      _this.serverId.splice(index, 1);

    },
    show(index) {
      this.$refs.previewer.show(index)
    },
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      return currentdate;
    }
  }
}

</script>
<style lang="less">
@import '../../assets/less/common.less';

#updateProgress {
  padding-bottom: 100px;

  .input_div {


    .title {
      background: #f8f8f8;
      padding-left: 20px;
      padding-top: 10px;

      padding-bottom: 10px;
      width: 100%;
      font-weight: bold;
      font-size: 17px;
    }

    .input_box {
      background: white;
      height: auto;
      width: 100%;

      .tips {
        padding-left: 10px;
        padding-bottom: 10px;
        width: 100%;
        font-size: 15px;
        color: black;
        border-bottom: 1px solid lightgrey;

      }

      .imgItem {
        width: 30%;
        float: left;
        padding-bottom: 10px;
        margin-left: 10px;
        padding-top: 10px;
        position: relative;

        .delectImg {
          position: absolute;
          display: block;
          right: 0;
          top: 0;
          margin-left: 14px;
          font-size: 24px;
          margin-top: -10px;
        }
      }

      .clear {
        clear: both
      }
    }

    .item_box {
      border-top: 1px solid lightgrey;

      .totalBox {
        text-align: right;
        padding: 5px 15px;
        font-size: 15px;
        color: grey;
      }
    }
  }


  .button_box {
    margin-top: 30px;
    padding: 15px;
    background: white;

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

    .edit_btn {
      background: #174192;
      color: white;
      margin-left: 20px;
    }
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
