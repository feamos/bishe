<template>
  <div class="goodInfo">
    <div class="left">
      <div
        class="bigImg"
        :style="'background: url(http://47.93.31.220/campus/'+ imgs[0] + ') no-repeat;background-size: 100% 100%'"
      ></div>
      <ul>
        <li
          v-for="(item, index) in imgs"
          :key="index"
          :style="'background: url(http://47.93.31.220/campus/'+ item + ') no-repeat;background-size: 100% 100%'"
        ></li>
      </ul>
    </div>
    <div class="right">
      <p><label>物品分类：</label><span>{{goodInfo.goodSort}}</span></p>
      <p><label>物品名称：</label><span>{{goodInfo.goodName}}</span></p>
      <p class="goodPrice"><label>物品价格：</label><span>￥{{goodInfo.goodPrice}}</span></p>
      <p><label>用户名称：</label><span>{{goodInfo.goodName}}</span></p>
      <p><label>联系方式：</label><span>{{goodInfo.sellerTel}}</span></p>
      <p><label>交易方式：</label><span>线下交易</span></p>
      <p><label>发布时间：</label><span>{{goodDate}}</span></p>
      <p  class="goodDesc"><label>详细描述：</label><span>{{goodInfo.goodDesc}}</span></p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: ['0', '1', '2']
    }
  },
  computed: {
    goodInfo: {
      get () {
        return this.$store.state.goodInfo
      }
    },
    goodDate: {
      get () {
        let date = this.goodInfo.publishTime.slice(0, 11)
        return date
      }
    },
    imgs: {
      get () {
        let n = []
        if (this.goodInfo.goodPicture0) {
          n.push(this.goodInfo.goodPicture0)
        }
        if (this.goodInfo.goodPicture1) {
          n.push(this.goodInfo.goodPicture1)
        }
        if (this.goodInfo.goodPicture2) {
          n.push(this.goodInfo.goodPicture2)
        }
        return n
      }
    }
  },
  mounted () {
    console.log(this.$store.state.goodInfo)
    console.log(this.imgs)
  },
  methods: {
    getImgs () {

    }
  }
}
</script>
<style scoped>
  .goodInfo {
    width: 1197px;
    margin: 0 auto;
    padding-top: 40px;
  }
  .left {
    display: inline-block;
    vertical-align: top;
  }
  .bigImg {
    width: 340px;
    height: 340px;
    border: 1px solid #b2b2b2;
    margin-right: 0;
  }
  ul {
    margin-top: 20px;
    padding-left: 0;
  }
  ul li {
    list-style: none;
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border: 1px solid #b2b2b2;
  }
  .right {
    display: inline-block;
    vertical-align: top;
    width: 800px;
    margin-left: 0px;
  }
  p {
    text-align: left;
    margin: 0 0 15px 0;
    line-height: 18px;
  }
  label {
    width: 200px;
    padding: 0 25px;
    text-align: right;
    font-size: 14px;
    color: #999999;
  }
  span {
    font-size: 18px;
    color: #3e3e3e;
  }
  .right .goodPrice {
    padding: 20px 0;
    background: url("../img/goodDesc/价格bg.png") no-repeat;
  }
  .right .goodPrice span {
    font-size: 30px;
    color: #ffffff;
  }
  .goodDesc {
    border-top: 1px dashed deepskyblue;
    padding-top: 15px;
  }
  .right .goodDesc span {
    display: inline-block;
    width: 666px;
    font-size: 14px;
  }
  .right .goodDesc label {
    vertical-align: top;
  }
</style>
