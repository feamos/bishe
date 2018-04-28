<template>
  <div id="app">
    <Heade></Heade>
    <router-view></router-view>
  </div>
</template>

<script>
import Heade from './components/header.vue'
import store from './vuex/store.js'
export default {
  name: 'app',
  store,
  data () {
    return {}
  },
  components: {
    Heade
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
