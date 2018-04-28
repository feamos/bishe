const _APIHOST_ = 'http://neuq.shop:8082/campus'
const userApiMaker = (path) => {
  return `${_APIHOST_}/${path}`
}
export default {
  login: userApiMaker('login'),
  register: userApiMaker('registUser'),
  getGoodsByNew: userApiMaker('getGoodsByNew')
}
