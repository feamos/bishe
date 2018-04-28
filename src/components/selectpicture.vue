<template>
  <div ref="box" class="selectPicture">
    <div class="uploadimg">
      <label for="goodPicture" class="optional"><span style="color: #fe8454;font-size: 20px;vertical-align: middle">*</span>上传物品图片：</label>
      <a class="file"><input type="file" id="goodPicture" @change="handleFileChange(null,null,1)" ref="inputer1" @click="whichShow(1)"
                                 accept="image/jpeg,image/jpg,image/png" name="goodPicture1"></a>
      <p class="tip">• 图片不大于1M,最多可上传3张图片</p>
      <p class="tip" v-show="showTip">• 第一张图片将作为发布后的封面图片</p>
      <p class="tip" v-show="showTip">• 请拖动剪裁框进行剪裁</p>
    </div>
    <!--选择第一张图片-->
    <div class="show1" v-show="firstShow">
      <span class="delete" @click="deletePic(1)"><img src="../img/sell/deleteIcon.png" alt=""></span>
      <div class="picture" :style="'backgroundImage:url('+headerImage1+')'">
      </div>
    </div>

    <!--选择第二张图片-->
    <div class="secondPic" v-show="firstShow">
      <label for="secondSel" class="secondAdd" v-show="!secondShow"></label>
      <input type="file" accept="image/jpeg,image/jpg,image/png" id="secondSel" name="goodPicture2"
             @change="handleFileChange(null,null,2)" ref="inputer2" @click="whichShow(2)" v-show="!secondShow"/>
      <div class="show2" v-show="secondShow">
        <span class="delete" @click="deletePic(2)"><img src="../img/sell/deleteIcon.png" alt=""></span>
        <div class="picture" :style="'backgroundImage:url('+headerImage2+')'">
        </div>
      </div>
    </div>

    <!--选择第三张图片-->
    <div class="thirdPic" v-show="secondShow">
      <label for="thirdSel" class="thirdAdd" v-show="!thirdShow"></label>
      <input type="file" accept="image/jpeg,image/jpg,image/png" id="thirdSel" name="goodPicture3"
             @change="handleFileChange(null,null,3)" ref="inputer3" @click="whichShow(3)" v-show="!thirdShow"/>
      <div class="show3" v-show="thirdShow">
        <span class="delete" @click="deletePic(3)"><img src="../img/sell/deleteIcon.png" alt=""></span>
        <div class="picture" :style="'backgroundImage:url('+headerImage3+')'">
        </div>
      </div>
    </div>

    <!--剪裁 图片-->
    <div class="img-inputer__preview-box" v-show="panel">
      <div>
        <img :src="dataUrl" class="img-inputer__preview-img" ref="imgContainer" id="image">
      </div>
      <button type="button" id="button" @click="crop()">确定</button>
    </div>

  </div>

</template>

<script type="text/javascript">
import 'exif-js/exif'
import Cropper from 'cropperjs'

export default{
  props: {
    value: {
      default: undefined
    },

    bottomText: {
      default: '点击或拖拽图片以修改',
      type: String
    }
  },

  data () {
    return {
      // 转base64后
      dataUrl: '',
      url: '',
      panel: false,
      showTip: false,
      headerImage1: '',
      headerImage2: '',
      headerImage3: '',
      firstShow: false,
      secondShow: false,
      thirdShow: false,
      thirdReadyShow: false,
      id: 0
    }
  },

  methods: {

    // 拖拽图片
    addDropSupport () {
      let BOX = this.$refs.box
      BOX.addEventListener('drop', e => {
        e.preventDefault()
        this.errText = ''
        // dataTransfer承载着拖拽数据
        let filelist = e.dataTransfer.files
        if (filelist.length === 0) {
          return false
        }
        // 格式限制
        if (filelist[0].type.indexOf('image') === -1) {
          this.errText = '请选择图片文件'
          return false
        }
        // 限制只能拖拽一张图片
        if (filelist.length > 1) {
          this.errText = '暂时只支持单张拖拽'
          return false
        }

        this.handleFileChange(null, filelist[0])
      })
    },

    handleFileChange (e, FIFE, id) {
      var ref = `inputer${id}`
      let inputDom = this.$refs[ref]
      // 通过DOM取文件数据
      this.file = inputDom.files[0] || FIFE

      this.url = this.getObjectURL(this.file)

      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url)
      }

      this.panel = true

      // 拿到用户上传图片的尺寸
      //  控制剪裁图片的大小
      //        var reader = new FileReader();
      //        reader.readAsDataURL(this.file);
      //        var self = this;
      //        reader.onloadend = function(){
      //          var image = new Image();
      //          image.src = this.result;
      //          image.onload = function() {
      //            var ele = self.$refs.imgContainer,
      //                width = this.width,
      //                height = this.height;
      //            if(width > height){
      //              ele.style.width = '400px';
      //            }else if(width <= height && height < 2000){
      //              ele.style.width = '300px';
      //            }else{
      //              ele.style.height = '400px';
      //            }
      //            self.panel = true;
      //          };
      //        }
      //
      //        this.imgPreview(this.file);
      //
      //        //获取到文件的名字
      //        this.fileName = this.file.name;
      //
      //        //获得文件大小
      //        let size = Math.floor(this.file.size / 1024);
      //
      //        //触发这个组件对象的input事件
      //        this.$emit('input', this.file);
    },

    getObjectURL (file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },

    crop () {
      this.panel = false
      var croppedCanvas

      if (!this.croppable) {
        return
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas()
      console.log(this.cropper)

      if (this.id === 1) {
        this.headerImage1 = croppedCanvas.toDataURL()
      } else if (this.id === 2) {
        this.headerImage2 = croppedCanvas.toDataURL()
        this.thirdReadyShow = true
      } else {
        this.headerImage3 = croppedCanvas.toDataURL()
      }

      this.postImg()
      if (this.headerImage1) {
        this.firstShow = true
      }
      if (this.headerImage2) {
        this.secondShow = true
      }
      if (this.headerImage3) {
        this.thirdShow = true
      }
    },

    // 用户上传的是第几张图片
    whichShow (id) {
      this.showTip = true
      this.id = id
    },

    // 删除图片
    deletePic (deleteId) {
      if (deleteId === 3) {
        this.headerImage3 = ''
        this.thirdShow = false
      }
      if (deleteId === 2) {
        if (this.headerImage3) {
          this.headerImage2 = this.headerImage3
          this.headerImage3 = ''
          this.thirdShow = false
        } else {
          this.headerImage2 = ''
          this.secondShow = false
        }
      }
      if (deleteId === 1) {
        if (this.headerImage2 && this.headerImage3) {
          this.headerImage1 = this.headerImage2
          this.headerImage2 = this.headerImage3
          this.headerImage3 = ''
          this.thirdShow = false
        } else if (this.headerImage2 && !this.headerImage3) {
          this.headerImage1 = this.headerImage2
          this.headerImage2 = ''
          this.secondShow = false
        } else if (!this.headerImage2) {
          this.headerImage1 = ''
          this.firstShow = false
        }
      }
    },

    postImg () {
      // 这边写图片的上传
    },

    // 阻止浏览器的默认行为
    preventDefaultEvent (eventName) {
      document.addEventListener(eventName, function (e) {
        e.preventDefault()
      }, false)
    }
  },

  mounted () {
    ['dragleave', 'drop', 'dragover', 'dragenter'].forEach(e => {
      this.preventDefaultEvent(e)
    })
    this.addDropSupport()
    // 初始化这个裁剪框
    var self = this
    var image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function () {
        self.croppable = true
      }
    })
  }
}
</script>

<style >
  @import "../common/css/scss/base.scss";

  .selectPicture {
    position: relative;
    .uploadimg {
      margin-top: 10px;
      .optional {
        display: inline-block;
        line-height: 26px;
        width: 205px;
        text-align: right;
      }
      .file {
        width: 100px;
        height: 30px;
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 2px 10px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        vertical-align: middle;
        background: url('../img/sell/选择图片按钮.png');
        cursor: pointer;
        input {
          position: absolute;
          font-size: 100px;
          right: 0;
          top: 0;
          opacity: 0;
        }
      }
      .tip {
        padding-left: 200px;
        margin-top: 5px;
        color: gray;
      }
    }
    .img-inputer__preview-box {
      position: fixed;
      z-index: 1000;
      top: 80px;
      left: 0px;
      background: rgba(0, 0, 0, .1);
      width: 1361px;
      #button {
        position: absolute;
        right: 100px;
        top: 5px;
        width: 70px;
        height: 40px;
        z-index: 1001;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        background: -webkit-linear-gradient(#009EFD, #2CF196)
      }
      img {
        max-width: 100%;
        width: 500px;
        height: 550px;
      }
    }
    .show1 {
      margin-left: 102px;
      margin-top: 20px;
      width: 200px;
      height: 200px;
      position: relative;
      .delete {
        position: absolute;
        right: -8px;
        top: -8px;
        cursor: pointer;
      }
      .picture {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .picture {

      background: url('../img/sell/边框.png');
    }

    //选择第二张图片
    .secondPic {
      .secondAdd {
        position: absolute;
        top: 100px;
        left: 321px;
        width: 200px;
        height: 200px;
        border: 1px solid #b2b2b2;
        background: url("../img/sell/add.png") no-repeat;
        z-index: 999;
      }
      input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
      }
      .show2 {
        position: absolute;
        top: 100px;
        left: 321px;
        width: 200px;
        height: 200px;
        .delete {
          position: absolute;
          right: -8px;
          top: -8px;
          cursor: pointer;
        }
        .picture {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }

    //选择第三张图片
    .thirdPic {
      .thirdAdd {
        position: absolute;
        top: 100px;
        left: 541px;
        width: 200px;
        height: 200px;
        border: 1px solid #b2b2b2;
        background: url("../img/sell/add.png") no-repeat;
        z-index: 999;
      }
      input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
      }
      .show3 {
        position: absolute;
        top: 100px;
        left: 541px;
        width: 200px;
        height: 200px;
        .delete {
          position: absolute;
          right: -8px;
          top: -8px;
          cursor: pointer;
        }
        .picture {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
  }

  .cropper-container {
    font-size: 0;
    line-height: 0;

    position: relative;

    -webkit-user-select: none;

    -moz-user-select: none;

    -ms-user-select: none;

    user-select: none;

    direction: ltr;
    -ms-touch-action: none;
    touch-action: none
  }

  .cropper-container img {
    /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .cropper-wrap-box {
    overflow: hidden;
  }

  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }

  .cropper-modal {
    opacity: 0.1;
    background-color: #000;
  }

  .cropper-view-box {
    display: block;
    overflow: hidden;

    width: 100%;
    height: 100%;

    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }

  .cropper-dashed {
    position: absolute;

    display: block;

    opacity: .5;
    border: 0 dashed #eee
  }

  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px
  }

  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px
  }

  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;

    display: block;

    width: 0;
    height: 0;

    opacity: .75
  }

  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: ' ';
    background-color: #eee
  }

  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px
  }

  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;

    display: block;

    width: 100%;
    height: 100%;

    opacity: .1;
  }

  .cropper-face {
    top: 0;
    left: 0;

    background-color: #fff;
  }

  .cropper-line {
    background-color: #39f
  }

  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize
  }

  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize
  }

  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize
  }

  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize
  }

  .cropper-point {
    width: 5px;
    height: 5px;

    opacity: .75;
    background-color: #39f
  }

  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize
  }

  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize
  }

  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize
  }

  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize
  }

  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize
  }

  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize
  }

  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize
  }

  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1
  }

  @media (min-width: 768px) {

    .cropper-point.point-se {
      width: 15px;
      height: 15px
    }
  }

  @media (min-width: 992px) {

    .cropper-point.point-se {
      width: 10px;
      height: 10px
    }
  }

  @media (min-width: 1200px) {

    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: .75
    }
  }

  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: ' ';
    opacity: 0;
    background-color: #39f
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    position: absolute;

    display: block;

    width: 0;
    height: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

</style>
