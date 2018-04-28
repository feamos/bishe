<!--单件商品信息-->

<template>
  <div class="good_component">
    <a href="" @mouseenter="showDetail" @mouseleave="hideDetail">
      <img :src="'http://neuq.shop:8082/campus/goodsPicture/' + goodDetail.goodPicture0 " alt="加入图片地址接口">
    </a>
    <div class="nameAndPrice">
      <span class="nameleft">{{goodDetail.goodName}}</span>
      <span>￥{{goodDetail.goodPrice}}</span>
    </div>
    <div class="goodType">
      <span>{{goodDetail.goodSort}}</span>
    </div>
    <div class="dim" v-show="detailShow" @mouseenter="showDetail" @mouseleave="hideDetail">
      <a href=""><img src="../img/good/dim_bg.png" alt=""></a>
      <div class="detailDesc">
        <a href="" class="descTitle">详细描述</a>
        <a href="" class="desc" v-show="!goodDetail.goodDesc">主人太懒啦，什么也没有留下~</a>
        <a href="" class="desc" v-show="goodDetail.goodDesc">{{goodDetail.goodDesc}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    goodDetail: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
    //  点击路由到商品详细信息页
  }
}
</script>
<style scoped>
  .good_component {
    position: relative;
  }
  a {
    text-decoration: none;
    color: #009efd;
  }
  .good_component > a > img {
    width:340px;
    height: 340px;
  }
  .nameAndPrice {
    position: absolute;
    bottom: 6px;
    left: 0;
    width: 340px;
    height: 35px;
    background: url("../img/good/底部bg.png") no-repeat;
    z-index: 20;
  }
  .nameAndPrice span {
    font-size: 18px;
    padding-left: 5px;
    text-align: right;
    width:44%;
    display: inline-block;
    color: blue;
    height: 35px;
    line-height: 35px;
  }
  .nameAndPrice span:last-child {
    vertical-align: top;
  }
  .nameAndPrice .nameleft {
    padding-left: 5px;
    text-align: left;
    overflow: hidden;
  }

  .goodType {
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 35px;
    background: url("../img/good/标签bg.png") no-repeat;
    z-index: 20;
  }
  .goodType span {
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    margin-left: 0px;
    display: inline-block;
    width: 80%;
    text-align: left;
    color: #fff;
  }
  .dim {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: pointer;
  }
  .detailDesc {
    position: absolute;
    top: 54px;
    width: 340px;
    height: 270px;
    overflow: hidden;
  }
  .descTitle {
    color: #009efd;
    font-size: 18px;
  }
  .desc {
    display: block;
    font-size: 18px;
    margin: 30px 36px;
    color: #3e3e3e;
    line-height: 2.8rem;
  }

</style>
