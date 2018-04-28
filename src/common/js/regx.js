export default {
  userName: /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4E00-\u9FA5]{5,15}$/,
  userPassword: /^[a-zA-Z]\w{5,17}$/,
  mail: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  qq: /[1-9][0-9]{4,}/
}
