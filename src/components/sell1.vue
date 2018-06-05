<template>
  <div class="sell">
    <div class="title">
      <img src="../img/sell/title.png" alt="卖二手物品">
    </div>
    <p><label></label><span class="textTip">带"<span class="red">*</span>"的为必填</span></p>
    <p>
      <label><span class="red">*</span>物品分类</label>
      <Select v-model="godInfor.goodSort" size="small" style="width:100px">
        <Option v-for="item in godClass" :value="item" :key="item">{{ item }}</Option>
      </Select>
    </p>
    <div class="wupin">
      <label for="gName"><span class="red">*</span>物品名称</label>
      <input type="text" id="gName" v-model="godInfor.goodName">
      <p class="textTip"><label></label><span>·请控制在十字以内</span></p>
    </div>
    <p>
      <label>上传物品图片</label>
      <a href="javascript:;" class="file">选择图片
        <input type="file" name="" id="file2" accept="image" @change="upImage">
      </a>
    </p>
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div class="btn">
        <button type="button" id="button" @click="commit('base64')">确定</button>
        <button type="button" id="cancel" @click="cancel">取消</button>
      </div>
      <vueCropper
        ref="cropper2"
        :img="example2.img"
        :outputSize="example2.size"
        :outputType="example2.outputType"
        :info="example2.info"
        :canScale="example2.canScale"
        :autoCrop="example2.autoCrop"
        :autoCropWidth="example2.autoCropWidth"
        :autoCropHeight="example2.autoCropHeight"
        :fixed="example2.fixed"
        :fixedNumber="example2.fixedNumber"
      ></vueCropper>
    </div>
    <p class="textTip"><label></label><span class="textTip">·图片不大于1M，最多可上传3张图片</span></p>
    <div id="imgPre">
      <ul>
        <li
          v-for="(item, index) in imgsArr"
          :style="'background: url(' + item + ') no-repeat;background-size: 100% 100%'"
          :key="index"
          @mouseenter="enDelIcon()"
          @mouseleave="leDelIcon()">
          <span id="del" v-show="delIcon" @click="slectDel(index)"></span></li>
      </ul>
    </div>
    <p>
      <label><span class="red">*</span>物品价格</label><input type="radio" id="one" name="radio" :value="godInfor.goodPrice"  @click="srPrice" checked>
      <label for="one"><input type="number" id="PRICE" :class="{activeBg: isActive, 'activedBg': isActived}" v-model.number="godInfor.goodPrice" @focus="selectCheck" @blur="quitCheck"></label>
      <input type="radio" id="two" value="联系后详谈" name="radio" v-model="godInfor.godPrice">
      <label for="two" class="slBg" @click="slPrice"></label>
    </p>
    <p><label><span class="red">*</span>联系方式</label><input type="text" v-model="godInfor.sellerTel"></p>
    <p id="textTip0"><label></label><span class="textTip">·QQ、微信、手机号等均可</span></p>
    <p><label class="textDesc">物品详细描述</label><textarea name="" id="desc0" cols="40" rows="7" maxlength=200 v-model="godInfor.goodDesc"></textarea></p>
    <p id="textTip1"><label></label><span class="textTip">·包括几成新、有误破损、物品原价等</span></p>
    <div class="submit">
      <span @click="subBtn"></span>
    </div>
  </div>
</template>
<script>
import vueCropper from '../../node_modules/vue-cropper'
import API from '../common/js/api/api.js'
export default {
  data () {
    return {
      delIcon: false,
      godClass: ['学习', '生活', '运动', '服饰', '鞋帽', '食品', '其它'],
      isActive: true,
      isActived: false,
      panel: false,
      imgCropperData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      },
      example2: {
        img: '',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        fixed: true,
        fixedNumber: [4, 4]
      },
      imgsArr: []
    }
  },
  computed: {
    godInfor: {
      get () {
        return this.$store.state.godInfor
      }
    }
  },
  methods: {
    selectCheck () {
      this.godInfor.godPrice = ''
      document.getElementById('one').checked = true
      this.isActive = !this.isActive
      this.isActived = !this.isActived
    },
    quitCheck () {
      this.isActive = !this.isActive
      this.isActived = !this.isActived
    },
    slPrice () {
      this.godPrice = ''
    },
    srPrice () {
      document.getElementById('PRICE').focus()
    },
    //      创建url路径
    getObjectURL (file) {
      var url = null
      if (window.createObjectURL !== undefined) {
        //      basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        //      mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        //      webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    upImage (e) {
      if (this.imgsArr.length >= 3) {
        this.$Message.info('最多上传三张图片！')
        return false
      }
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      let type = files[0].type
      let size = files[0].size
      if (this.imgCropperData.accept.indexOf(type) === -1) {
        alert('请选择我们支持的图片格式！')
        return false
      }
      if (size > 5242880) {
        alert('请选择5M以内的图片！')
        return false
      }
      this.picValue = files[0]
      this.example2.img = this.getObjectURL(this.picValue)
      console.log(this.example2.img)
      //      每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.example2.img)
      }
      this.panel = true
      //      连续选择同一张图片，由于路径没有变化，所以不会触发onchange事件，清空files
      document.getElementById('file2').value = ''
    },
    dataURItoBlob (dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], {type: mimeString})
    },
    commit (type) {
      this.$refs.cropper2.getCropData((data) => {
        this.imgsArr.push(data)
      })
      this.panel = false
    },
    cancel () {
      this.panel = false
      document.getElementById('file2').value = ''
    },
    enDelIcon () {
      this.delIcon = true
    },
    leDelIcon () {
      this.delIcon = false
    },
    slectDel (i) {
      this.imgsArr.splice(i, 1)
    },
    subBtn () {
      if (!(this.godInfor.goodSort && this.godInfor.goodName && this.godInfor.sellerTel && this.godInfor.goodPrice && this.godInfor.goodDesc)) {
        this.$Message.info('请填写正确的信息！')
        return false
      }
      let submitGood = this.$store.state.godInfor
      submitGood.goodPicture0 = this.imgsArr[0].split(',')[1]
      if (this.imgsArr[1]) {
        submitGood.goodPicture1 = this.imgsArr[1].split(',')[1]
      }
      if (this.imgsArr[2]) {
        submitGood.goodPicture2 = this.imgsArr[2].split(',')[1]
      }
      submitGood.userName = this.$store.state.head.userName
      fetch(API.publishGoods, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitGood)
      }).then((res) => res.json())
        .then(json => {
          if (json.status === 200) {
            this.$Message.info('发布成功！')
            this.$router.push('/sellSuccess')
          }
        })
    }
  },
  components: {
    vueCropper
  }
}
</script>
<style scoped>
  ul li {
    list-style: none;
    display: inline-block;
  }
  input {
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    padding: 3px 0 3px 5px;
  }
  label {
    width: 100px;
    display: inline-block;
    text-align: right;
    margin-right: 8px;
  }
  .textDesc {
    vertical-align: top;
  }
  .red {
    color: #fe8454;
  }
  .sell {
    padding-top: 35px;
    margin-left: 270px;
    text-align: left;
    background: url('../img/sell/亭子bg.png') no-repeat  0;
  }
  .sell p {
    margin: 12px 0 0 0;
    line-height: 30px;
  }
  .sell {
    font-size: 14px;
  }
  .sell .textTip {
    font-size: 8px;
    margin: 3px 0 0 0;
    line-height: 12px;
    display: none;
  }
  .sell .wupin {
    margin: 12px 0 0 0;
  }
  #textTip1 {
    font-size: 8px;
    margin: -8px 0 0 0;
    line-height: 12px;
  }
  #textTip0 {
    font-size: 8px;
    margin: 3px 0 0 0;
    line-height: 12px;
  }
  .sell #PRICE {
    width: 110px;
    border: 0px;
  }
  .sell .activeBg {
    background: url('../img/sell/框-未选中时.png') no-repeat 3px 3px;
  }
  .sell .activedBg {
    background: url('../img/sell/框-点击输入时.png') no-repeat 3px 3px;
  }
  #desc0, #desc1 {
    padding: 5px 0 0 5px;
    line-height: 21px;
    font-size: 14px;
    resize: none;
  }
  .sell .slBg {
    width: 100px;
    height: 36px;
    vertical-align: bottom;
    display: inline-block;
    background: url('../img/sell/联系后详谈.png') no-repeat 5px 2px;
  }
  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  .sell .container {
    height: 100%;
    width: 100%;
  }
  .container {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
  }
  .container .btn {
    height: 60px;
    position: relative;
  }
  .btn #button, .btn #cancel {
    position: absolute;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background: white;
  }
  #button {
    right: 10px;
    top: 10px;
  }
  #cancel {
    left: 10px;
    top: 10px;
  }
  #imgPre {
    padding: 5px 0 0 112px;
  }
  #imgPre ul li {
    width: 220px;
    height: 220px;
    position: relative;
    border: 1px solid gray;
    margin-right: 4px;
  }
  #del {
    width: 20px;
    height: 20px;
    display: inline-block;
    position: absolute;
    cursor: pointer;
    right: -4px;
    top: 0;
    background: url('../img/sell/删除icon.png') no-repeat;
  }
  .delIcon {
    display: none;
  }
  .submit {
    height: 200px;
    padding: 10px 0 0 200px;
  }
  .submit span {
    width: 105px;
    height: 30px;
    display: inline-block;
    background: url('../img/sell/未填完.png') no-repeat;
  }
  .submit span:hover {
    background: url('../img/sell/全填完后.png') no-repeat;
    cursor: pointer;
  }
  @media (max-height: 768px) and (max-width:1366px) {
    .sell {
      padding: 35px 0 0 200px;
      margin-left: 0px;
    }
  }
</style>
