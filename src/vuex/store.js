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
  searchGoods: [],
  newGoods: {},
  active: 0,
  index: 0,
  goodInfo: {},
  // new-goods
  latestGoods: [],
  // sort
  study: {},
  life: {},
  sports: {},
  clothes: {},
  hats: {},
  foods: {},
  others: {},
  // sell
  godInfor: {
    goodSort: '',
    goodName: '',
    sellerTel: '',
    godPictures: [],
    goodPrice: '',
    goodDesc: '',
    goodPicture0: '',
    goodPicture1: '',
    goodPicture2: ''
  },
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
  reserve (state) {
    state.index = 0
  },
  hideActive () {
    state.active = 0
  },
  selectActive (state, index) {
    console.log('将index设为' + index)
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
    fetch(API.getGoodsByNew, {
      method: 'get'
    }).then(res => res.json())
      .then(json => {
        context.state.newGoods = json.data
      })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
