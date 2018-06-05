<template>
  <div class="new-goods">
    <div class="slidebanner clearfix" @mouseenter="stop" @mouseleave.stop="beginnext">
      <span class="left_icon" @click="last"><img src="../img/goods/left.png" alt=""></span>
      <div class="banner_wrapper">
        <transition-group tag="ul" name="list">
          <li v-for="(goodDetail, index) in newGoods" :key="index" v-show="currentIndex<=index && currentIndex+3>index" @click="toGoodInfo(goodDetail)">
            <good :goodDetail="goodDetail"></good>
          </li>
        </transition-group>
      </div>
      <span class="right_icon" @click="next"><img src="../img/goods/right.png" alt=""></span>
    </div>
    <div class="newgoods">
      <img src="../img/goods/newTitle.png" alt="最新物品">
      <ul>
        <li v-for="(goodDetail, index) in latestGoods" v-bind:key="index">
          <good :goodDetail="goodDetail"></good>
        </li>
      </ul>
      <a @click="more" class="more" v-show="clickmore"><img src="../img/goods/more.png" alt="点击加载更多"></a>
    </div>
  </div>
</template>

<script>
import good from './good.vue'
import API from '../common/js/api/api.js'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      clickmore: true,
      timer: {},
      active: 1,
      index: 0,
      currentIndex: 0,
      page: 2
    }
  },
  computed: {
    ...mapState(['newGoods', 'clickmore', 'latestGoods']),
    goodInfo: {
      get () {
        return this.$store.state.goodInfo
      },
      set (value) {
        this.$store.state.goodInfo = value
      }
    },
    study: {
      get () {
        return this.$store.state.study
      },
      set (value) {
        this.$store.state.study = value
      }
    },
    life: {
      get () {
        return this.$store.state.life
      },
      set (value) {
        this.$store.state.life = value
      }
    },
    sports: {
      get () {
        return this.$store.state.sports
      },
      set (value) {
        this.$store.state.sports = value
      }
    },
    clothes: {
      get () {
        return this.$store.state.clothes
      },
      set (value) {
        this.$store.state.clothes = value
      }
    },
    hats: {
      get () {
        return this.$store.state.hats
      },
      set (value) {
        this.$store.state.hats = value
      }
    },
    foods: {
      get () {
        return this.$store.state.foods
      },
      set (value) {
        this.$store.state.foods = value
      }
    },
    others: {
      get () {
        return this.$store.state.others
      },
      set (value) {
        this.$store.state.others = value
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.slide()
    })
    this.getLatestGoods()
    fetch(API.getGoodsBySort + '?sortName=学习', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.study = json.data
      })
    fetch(API.getGoodsBySort + '?sortName=生活', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.life = json.data
      })
    fetch(API.getGoodsBySort + '?sortName=运动', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.sports = json.data
      })
    fetch(API.getGoodsBySort + '?sortName=服饰', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.clothes = json.data
      })
    fetch(API.getGoodsBySort + '?sortName=鞋帽', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.hats = json.data
      })
    fetch(API.getGoodsBySort + '?sortName=食品', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.foods = json.data
      })
    fetch(API.getGoodsBySort + '?sortName=其它', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => {
        this.others = json.data
      })
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
    beginnext () {
      this.slide()
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
    },
    getLatestGoods () {
      fetch(API.getGoodsByNew + '?page=' + this.page, {
        method: 'GET'
      }).then(res => res.json())
        .then(json => {
          this.$store.state.latestGoods = this.$store.state.latestGoods.concat(json.data)
        })
    },
    more () {
      this.page = this.page + 1
      this.getLatestGoods()
    },
    toGoodInfo (good) {
      this.goodInfo = good
      this.$router.push('/goodInfo')
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
