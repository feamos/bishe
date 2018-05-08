const _APIHOST_ = 'http://47.93.31.220/campus'
const userApiMaker = (path) => {
  return `${_APIHOST_}/${path}`
}
export default {
  login: userApiMaker('login'),
  register: userApiMaker('registUser'),
  getGoodsByNew: userApiMaker('getGoodsByNew'),
  quit: userApiMaker('quit')
}
