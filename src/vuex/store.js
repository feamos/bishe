import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'
import API from '../common/js/api/api.js'

Vue.use(iView)
Vue.use(Vuex)

const state = {
  // header组件
  head: {
    userName: ''
  },
  // oldgoods
  searchtext: '',
  newGoods: {},
  // sell
  imgsArr: [],
  // register
  sigUp: {
    qq: '',
    userName: '',
    userPassword: '',
    reUserPassword: '',
    email: ''
  },
  // sigIn
  sigIn: {
    userName: '',
    userPassword: ''
  }
}
const mutations = {
  //  oldgoods
  showActive (state, index) {
    state.active = index
  },
  hideActive () {
    state.active = 0
  },
  selectActive (state, index) {
    state.index = index
  },
  // sigUp
  updateSignUp (state, value) {
    state.sigUp = value
  }
}
const actions = {
  sigup (context) {
    console.log('1234')
  },
  huode (context) {
    console.log(context.state.newGoods)
    fetch(API.getGoodsByNew, {
      method: 'get'
    }).then(res => res.json())
      .then(json => {
        context.state.newGoods = json.data
        console.log(context.state.newGoods)
      })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
