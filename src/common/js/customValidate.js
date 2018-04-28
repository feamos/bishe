/**
 * Created by Administrator on 2017/6/3.
 */
import { Validator } from 'vee-validate'

Validator.extend('qq', {
  messages: {
    zh_CN: field => 'qq号码输入不正确呀'
  },
  validate: value => {
    return /^[1-9][0-9]{4,14}$/.test(value)
  }
})

export default Validator
