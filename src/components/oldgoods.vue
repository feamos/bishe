<template>
  <div class="oldgoods">
    <div class="top-nav">
      <div class="left">
        <input class="search" v-model="searchtext" type="text" @keyup.enter="keyenter">
        <router-link to="/search" class="search_icon" ><img src="../img/goods/search-icon.png" ref="searchDom" alt="搜索"></router-link>
        <a class="sell" @click="toSell"><img src="../img/goods/sell.png" alt="卖二手商品"></a>
      </div>
      <span class="right">
        <ul>
          <li>
            <router-link to="/oldgoods/study">
              <div  @mouseenter="showActive(1)"  @click="selectActive(1)"   @mouseleave="hideActive()">
                <img src="../img/goods/study.png" alt="学习">
                <img v-show="active === 1 || index === 1" class="hide_tab" src="../img/goods/study_1.png" alt="学习">
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/oldgoods/life">
              <div @mouseenter="showActive(2)"  @click="selectActive(2)" @mouseleave="hideActive()">
                <img src="../img/goods/life.png" alt="生活">
                <img v-show="active === 2 || index === 2" class="hide_tab" src="../img/goods/life_1.png" alt="生活">
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/oldgoods/sport">
              <div @mouseenter="showActive(3)"   @click="selectActive(3)" @mouseleave="hideActive()">
                <img src="../img/goods/sport.png" alt="运动">
                <img v-show="active === 3  || index === 3" class="hide_tab" src="../img/goods/sport_1.png" alt="运动">
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/oldgoods/clothes">
              <div @mouseenter="showActive(4)"  @click="selectActive(4)" @mouseleave="hideActive()">
                <img src="../img/goods/clothes.png" alt="服饰">
                <img v-show="active === 4 || index === 4" class="hide_tab" src="../img/goods/clothes_1.png" alt="服饰">
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/oldgoods/hat">
              <div @mouseenter="showActive(5)"   @click="selectActive(5)" @mouseleave="hideActive()">
                <img src="../img/goods/hat.png" alt="鞋帽">
                <img v-show="active === 5 || index === 5" class="hide_tab" src="../img/goods/hat_1.png" alt="鞋帽">
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/oldgoods/food">
              <div @mouseenter="showActive(6)"  @click="selectActive(6)" @mouseleave="hideActive()">
                <img src="../img/goods/food.png" alt="食品">
                <img v-show="active === 6 || index === 6" class="hide_tab" src="../img/goods/food_1.png" alt="食品">
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/oldgoods/other">
              <div @mouseenter="showActive(7)"   @click="selectActive(7)" @mouseleave="hideActive()">
                <img src="../img/goods/other.png" alt="其它">
                <img v-show="active === 7  || index === 7" class="hide_tab" src="../img/goods/other_1.png" alt="其他">
              </div>
            </router-link>
          </li>
        </ul>
      </span>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
import store from '../vuex/store'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  mounted () {
    this.huode()
  },
  computed: {
    ...mapState(['searchtext', 'active', 'index'])
  },
  methods: {
    ...mapMutations(['showActive', 'selectActive', 'hideActive']),
    ...mapActions(['huode']),
    keyenter () {
      this.$refs.searchDom.click()
    },
    toSell () {
      //        if (!this.userName) {
      //          this.$router.push('/register')
      //        } else {
      //          this.$router.push('/sell')
      //        }
      this.$router.push('/sell')
    }
  },
  store
}
</script>

<style scoped>
  .top-nav {
    padding-left: 340px;
    padding-right: 150px;
    padding-top: 20px;
    mrigin:0 auto;
  }
  .left {
    width: 360px;
    height: 104px;
    position: absolute;
    float: left;
    background: url("../img/goods/search.png") no-repeat;
  }
  .search {
    width: 260px;
    height: 40px;
    color: #009efd;
    position: absolute;
    top: 8px;
    left: 20px;
    font-size: 2.4rem;
    line-height: 24px;
    border: none;
    outline:none;
  }
  .search_icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .sell {
    position: absolute;
    width: 260px;
    height: 24px;
    top:80px;
    left: 27px;
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  ul {
    margin-left: 26px;
    padding-left: 200px;
  }
  ul li {
    display: inline-block;
    margin-left: 13px;
    width: 100px;
    height: 100px;
  }
  ul li a {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  ul li a .hide_tab {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  /*@media (max-height: 962px),(max-width: 1920px) {*/
    /*.top-nav {*/
      /*padding-left: 340px;*/
      /*padding-right: 150px;*/
    /*}*/
    /*ul {*/
      /*padding-left: 200px;*/
    /*}*/
  /*}*/
  @media (max-width: 1366px) {
    .top-nav {
      padding-left: 80px;
      padding-right: 0px;
    }
    ul {
      padding-left: 300px;
    }
  }
</style>
