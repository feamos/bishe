<template>
  <div class="banner_wrapper">
    <transition-group tag="ul" name="list">
      <li v-for="(goodDetail, index) in studyGoods" :key="index">
        <good :goodDetail="goodDetail"></good>
      </li>
    </transition-group>
  </div>
</template>

<script>
import good from './good'
import store from '../vuex/store'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['studyGoods'])
  },
  components: {
    good
  },
  store
}
</script>
<style scoped>
  .banner_wrapper {
    margin:0 auto;
    width:1300px;
    overflow: hidden;
    float: left;
    margin-left: 320px;
  }

  ul {
    width: 100%;
    height: 100%;
    padding-left: 0;
  }

  ul li {
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 40px;
  }
</style>
