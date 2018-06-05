<template>
  <div class="foot">
    <p><a id="firstA">关于我们</a><a>联系我们</a><a>广告投放</a><a>版权声明</a><a>免责声明</a></p>
    <p><span class="span1">版权所有 2018 NEUQZone （www.neuqzone.cn)</span></p>
    <p><span class="span2">Copyright © 2018 www.neuqzone.cn All rights reserved.</span></p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
  .foot {
    margin: 0 auto;
    width: 1366px;
    background: url('../img/footer/footer.png') no-repeat;
    padding-top: 60px;
    color: white;
    height: 200px;
  }
  .foot p {
    margin-top: 10px;
    text-align: center;
  }
  #firstA {
    border-left: none;
  }
  .foot p a {
    padding-left: 14px;
    padding-right: 14px;
    border-left: 1px solid white;
    color: white;
  }
</style>
