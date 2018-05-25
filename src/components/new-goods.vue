<template>
  <div class="new-goods">
    <div class="slidebanner clearfix" @mouseenter="stop" @mouseleave.stop="beginnext">
      <span class="left_icon" @click="last"><img src="../img/goods/left.png" alt=""></span>
      <div class="banner_wrapper">
        <transition-group tag="ul" name="list">
          <li v-for="(goodDetail, index) in newGoods" :key="index" v-show="currentIndex<=index && currentIndex+3>index">
            <good :goodDetail="goodDetail"></good>
          </li>
        </transition-group>
      </div>
      <span class="right_icon" @click="next"><img src="../img/goods/right.png" alt=""></span>
    </div>
    <div class="newgoods">
      <img src="../img/goods/newTitle.png" alt="最新物品">
      <ul>
        <li v-for="(goodDetail, index) in ninegoods" v-bind:key="index">
          <good :goodDetail="goodDetail"></good>
        </li>
      </ul>
      <a @click="more" class="more" v-show="clickmore"><img src="../img/goods/more.png" alt="点击加载更多"></a>
    </div>
  </div>
</template>

<script>
import good from './good.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      clickmore: true,
      timer: {},
      active: 1,
      index: 0,
      currentIndex: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.slide()
    })
  },
  computed: {
    ...mapState(['newGoods', 'clickmore', 'ninegoods'])
  },

  methods: {
    ...mapMutations(['stop']),
    ...mapActions(['more']),
    autoPlay () {
      this.currentIndex += 3
      if (this.currentIndex > this.newGoods.length - 1) {
        this.currentIndex = 0
      }
    },
    slide () {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
    },
    last () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.newGoods.length
      }
      this.currentIndex -= 3
    },
    next () {
      this.currentIndex += 3
      if (this.currentIndex > this.newGoods.length - 1) {
        this.currentIndex = 0
      }
    }
  },
  components: {
    good
  }
}
</script>
<style scoped>
  .slidebanner {
    width: 1176px;
    margin: 0 auto 50px;
    height: 340px;
    position: relative;
  }

  .new-goods {
    margin-top: 50px;
  }

  span {
    line-height: 340px;
    cursor: pointer;
    position: absolute;
  }

  .left_icon {
    left: 0;
    top: 0;
    margin-right: 36px;
  }

  .right_icon {
    right: 0;
    top: 0;
    margin-left: 36px;
  }

  .banner_wrapper {
    width: 1100px;
    height: 340px;
    overflow: hidden;
    float: left;
    padding-left: 50px;
    margin-left: 20px;
  }

  ul {
    width: 100%;
    height: 100%;
    padding-left: 0;
  }

  ul li {
    display: inline-block;
    margin-right: 10px;
  }
  .newgoods {
    width: 1060px;
    margin:0 auto;
  }
  .newgoods ul {
    margin-top: 10px;
  }
  .newgoods ul li {
    display: inline-block;
    margin-top: 20px;
    margin-right: 20px;
  }
  .newgoods ul li:nth-child(3n) {
    margin-right: 0;
  }
  .newgoods .more {
    display: inline-block;
    margin-top: 10px;
  }
  .newgoods .more img {
    cursor: pointer;
  }
  @media (max-width:1000px) {
  }
</style>
