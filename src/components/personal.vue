<template>
  <div class="personal">
    <div class="left">
      <div class="perImg" @click="changeImg" :style="'background:url(' + dataUrl + ') no-repeat;background-size: 100% 100%'">
        <input type="file" style="visibility: hidden" ref="perImg" @change="upImg"></div>
      <p class="userName">fengpeidong</p>
      <p @click="toRouter('/personal/changePassw')" :class="{bg: isBg}"><span class="changPasw">修改密码</span><img src="../img/personal/进入icon.png"></p>
      <p @click="toRouter('/personal/changeGood')"  :class="{bg: !isBg}"><span class="changGood">修改物品信息</span><img src="../img/personal/进入icon.png" alt=""></p>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isBg: true,
      dataUrl: 'data:image/jpg;base64,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'
    }
  },
  methods: {
    toRouter (s) {
      this.$router.push(s)
      this.isBg = !this.isBg
    },
    changeImg () {
      this.$refs.perImg.click()
    },
    upImg () {
      console.log('123')
    }
  }
}
</script>
<style scoped>
  .personal {
    width: 1366px;
    margin: 0 auto;
    padding-top: 20px;
  }
  p {
    line-height: 50px;
  }
  .userName {
    line-height: 30px;
    font-size: 18px;
    font-family: SimHei;
    margin-bottom: 14px;
    text-align: center;
  }
  .left {
    display: inline-block;
    vertical-align: top;
    width: 326px;
    height: 264px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    background: #ffffff;
  }
  .personal .perImg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 24px 122px 0 122px;
  }
  .changPasw {
    padding: 5px 0 5px 75px;
    background: url("../img/personal/密码icon.png") no-repeat 30px 0px;
  }
  .changGood {
    padding: 5px 0 5px 75px;
    background: url("../img/personal/物品icon.png") no-repeat 30px 0px;
  }
  p {
    text-align: left;
    position: relative;
  }
  .left img {
    position: absolute;
    right: 30px;
    top: 20px;
  }
  p:hover {
    background: #f6f6f6;
    cursor: pointer;
  }
  .bg {
    background: #f6f6f6;
  }
</style>
