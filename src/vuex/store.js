import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'

Vue.use(iView)
Vue.use(Vuex)

const state = {
  // header组件
  head: {
    userName: ''
  },
  // oldgoods
  searchtext: '',
  active: 1,
  index: 0,
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
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
