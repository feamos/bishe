<template>
  <div id="app">
    <Heade></Heade>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Heade from './components/header.vue'
import store from './vuex/store.js'
import Foot from './components/Foot.vue'
export default {
  name: 'app',
  store,
  data () {
    return {}
  },
  mounted () {
    console.log(this.$store.state.head.userName)
  },
  destroyed () {
    this.$store.state.head.userName = ''
  },
  components: {
    Heade,
    Foot
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
