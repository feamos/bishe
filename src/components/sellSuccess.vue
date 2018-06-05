<template>
  <div class="sellSuccess">
      <img src="../img/sellSuccess/successTitle.png" alt="">
      <router-link to="/oldgoods">去<span>二手</span>看看我发布的二手物品<span>>></span></router-link>
      <router-link to="" class="personal">去<span>个人中心</span>编辑我发布的二手物品<span>>></span></router-link>
  </div>
</template>

<script type="text/javascript">
</script>

<style scoped>
  .sellSuccess{
    margin-top: 115px;
    margin-left: 280px;
    width: 1349px;
    height: 847px;
    background: url('../img/sellSuccess/successBg.png') no-repeat;
  }
  .sellSuccess img{
    margin:60px 0 60px -300px;
  }
  .sellSuccess a{
    display: block;
    margin-left: -21px;
    font-size: 14px;
    color: #3e3e3e;
  }
  .sellSuccess a span {
    color:#009afd;
  }
  .sellSuccess .personal {
    margin-top: 30px;
  }
  @media (max-height: 768px) and (max-width:1366px) {
    .sellSuccess {
      margin-top: 0;
      padding-top: 60px;
      margin-left: 0;
    }
    .sellSuccess a {
      margin-top: 30px;
    }
    .sellSuccess img {
      margin: 0px 0 0 -400px;
    }
  }
</style>
