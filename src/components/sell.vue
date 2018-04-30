<template>
  <div class="sell">
    <iframe id="rfFrame" name="rfFrame" style="display:none;"></iframe> <div class="title">
    <img src="../img/sell/title.png" alt="买二手物品">
  </div>
    <p class="topreminder">带 “<span id="red"> * </span>”号 的为必填</p>
    <!-- 将form表单提交的窗口指向隐藏的ifrmae,并通过ifrmae提交数据。 -->
    <form action="http://192.168.23.1/my/GoodsServlet" class="sellForm" ref="form"
          target="rfFrame" method="post" name="rfFrame" enctype="multipart/form-data">

      <div class="four">
        <label for="fenlei"><span id="red">*</span>物品分类：</label>
        <Select id="fenlei" v-model="model1" style="width:100px;">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <div class="four">
        <label for="goodName" class="require"><span id="red">*</span>物品名称：</label>
        <input type="text" name="goodName" id="goodName" maxlength="10" v-model="goodInfo.goodName"
               @focus="reWriteName">
        <span class="wrong" v-show="emptyName">请输入物品名称！</span>
        <p class="reminder">• 请控制在10字以内</p>
      </div>

      <selectPicture></selectPicture>

      <div class="goodprice">
        <label for="goodprice" class="require"><span id="red">*</span>物品价格：</label>
        <input type="text" class="pricenumber" id="goodprice" v-model="goodInfo.goodPrice">
      </div>

      <div class="four">
        <label for="sellerTel" class="require"><span id="red">*</span>联系方式：</label>
        <input type="text" class="pricenumber" name="sellerTel" id="sellerTel" v-model="goodInfo.sellerTel"
               @focus="reWriteTel">
        <p class="reminder">• QQ、微信、手机号等均可</p>
      </div>

      <div class="six">
        <label for="goodDesc" class="gooddes"><span id="red">*</span>物品描述：</label>
        <textarea name="goodDesc" id="goodDesc" cols="30" rows="10" maxlength="200" @input="goodDescInput"
                  v-model="goodInfo.goodDesc" class="goodtext"></textarea>
        <p class="reminder">• 包括几成新、有无破损、物品原价等</p>
      </div>

      <div class="btn-sub">
        <span @click="uploadGood">发布</span>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import selectPicture from './selectpicture.vue'
//  import router from '../../router'
export default {
  data () {
    return {
      goodName: '123',
      cityList: [
        {
          value: 'sdf ',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        },
        {
          value: 'hangzhou',
          label: '杭州市'
        },
        {
          value: 'nanjing',
          label: '南京市'
        },
        {
          value: 'chongqing',
          label: '重庆市'
        }
      ],
      model1: ''
    }
  },
  computed: {
    goodInfo: {
      get () {
        return this.$store.state.goodInfo
      },
      set (value) {
        this.$store.commit('updateGood', value)
      }
    }
  },
  components: {
    selectPicture
  },
  methods: {
    uploadGood () {
      console.log(this.$store.state.goodInfo)
    }
  }
}
//  export default {
//
//    data () {
//      return {
//        target: null,
//        isON: true,
//        remanent: 200,
//        desc: '',
//        goodName: '',
//        emptyName: false,
//        sellerTel: '',
//        emptyTel: false,
//        goodPrice: '',
//        emptyPrice: false,
//        wrong: false,
//        data: ''
//      }
//    },
//
//    methods: {
//      // 价格的选中
//      radioON () {
//        this.isON = !this.isON
//      },
//
//      // 文本框动态显示剩余个数
//      goodDescInput () {
//        var texVal = this.desc.length
//        this.remanent = 200 - texVal
//      },
//
//      // 提交报错
//      submit () {
//        this.wrong = false
//        if (this.goodName === '') {
//          this.emptyName = true
//          this.wrong = true
//        }
//        if (this.sellerTel === '') {
//          this.emptyTel = true
//          this.wrong = true
//        }
//        if (this.goodPrice === '' && this.isON === true) {
//          this.emptyPrice = true
//          this.wrong = true
//        }
//        if (this.wrong === true) {
//          alert('请完善物品信息')
//        }
//        // 如果没有错则提交
//        if (this.wrong === false) {
//          // let file = this.$refs.form;
//          // var file = $('.sellForm').serialize();
//       var formData = new FormData($('.sellForm')[0]);
//          // formData.append('file','sadsafsafs');
//          var that = this
//          this.$http.post("http://neuq.shop/my/GoodsServlet", formData)
//            .then(data => {
//              console.log(data)
//              that.data = data
//            })
//            .catch(error => {
//              console.log(error)
//            })
//        }
//
//         // 提交表单
//      },
//      // 用户重新填写名称
//      reWriteName () {
//        this.emptyName = false
//        // router.push({path:'sellSuccess'});
//        // this.$refs.form.target = 'rfFrame';
//      },
//
//      // 用户重新填写联系方式
//      reWriteTel () {
//        this.emptyTel = false
//      },
//
//      // 用户重新填写价格
//      reWritePrice () {
//        this.emptyPrice = false
//      },
//
//       // 用户选择联系后详谈
//      changePrice () {
//        this.emptyPrice = false
//      }
//    }
//
//    components: {
//      selectPicture
//    }
//  }
</script>

<style scoped>
  .sell {
    width: 1349px;
    height:2000px;
    margin: 0 auto;
    background: url("../img/sell/亭子bg.png") no-repeat 0px 120px;
  }

  .sell .title {
    text-align: left;
    padding-left: 80px;
  }
  #red {
    font-size: 20px;
    vertical-align: middle;
    color: #fe8454;
  }
  .four {
    margin-top: 10px;
  }
  .topreminder {
    margin: 0;
    padding-top: 50px;
    text-align: left;
    padding-left: 214px;
  }

  .sellForm {
    text-align: left;
  }
  label {
    display: inline-block;
    width:205px;
    line-height: 22px;
    text-align: right;
  }
  .goodprice {
    padding-top: 10px;
  }
  #goodName {
    border-radius: 5px;
    outline: none;
    height: 30px;
    padding: 3px 0 3px 10px;
    border: 1px solid #dddee1;
  }
  .pricenumber {
    border-radius: 5px;
    outline: none;
    height: 30px;
    padding: 3px 0 3px 10px;
    border: 1px solid #dddee1;
  }
  .reminder {
    margin-top: 5px;
    padding-left: 210px;
    color: gray;
  }
  .six {
    padding-top: 10px;
  }
  .gooddes {
    vertical-align: top;
  }
  .goodtext {
    outline: none;
    border-radius: 5px;
    width: 504px;
    height: 160px;
    outline: none;
    padding: 3px 0 3px 10px;
    resize: none;
    overflow: hidden;
  }
  .btn-sub {
    text-align: center;
    padding-top: 20px;
  }
  .btn-sub span {
    display: inline-block;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    border: 1px solid #7e8c8d;
    background: #009efd;
    cursor: pointer;
  }
  .btn-sub span:hover {
    background: gray;
    color: #fff;
  }
</style>
