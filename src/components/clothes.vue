<template>
  <div class="newgoods">
    <ul>
      <li v-for="(goodDetail, index) in clothes" v-bind:key="index">
        <good :goodDetail="goodDetail"></good>
      </li>
    </ul>
  </div>
</template>

<script>
import good from './good'
import store from '../vuex/store'
import { mapMutations } from 'vuex'
export default {
  computed: {
    clothes: {
      get () {
        return this.$store.state.clothes
      }
    }
  },
  destroyed () {
    this.reserve()
  },
  methods: {
    ...mapMutations(['reserve'])
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
    padding-top: 40px;
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
