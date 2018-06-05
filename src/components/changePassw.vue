<template>
  <div class="changePassw">
    <p class="firstP">修改密码</p>
    <p class="line"><span></span></p>
    <p class="oldP"><label for="text1">原密码</label><input type="password" id="text1" v-model="oldPas"></p>
    <p><label for="text2">新密码</label><input type="password" id="text2" v-model="newPas" @blur="checkPass" ref="Pas"></p>
    <p><label for="text3">重复密码</label><input type="password" id="text3" v-model="rePas" ref="conPas"></p>
    <p><label></label><a href="#" class="btn" @click="complete()">保存</a></p>
  </div>
</template>
<script>
import API from '../common/js/api/api.js'
export default {
  data () {
    return {
      oldPas: '',
      newPas: '',
      rePas: '',
      isTrue: false,
      isShiyong: false
    }
  },
  methods: {
    checkPass () {
      if (this.newPas.length < 6 && this.newPas) {
        this.$Message.info('密码太短！')
        this.newPas = ''
        this.$refs.Pas.focus()
      } else if (this.newPas.length > 18) {
        this.$Message.info('密码太长！')
        this.newPas = ''
        this.$refs.Pas.focus()
      } else {
        this.isShiyong = true
      }
    },
    getUrl (url, data) {
      url += (url.indexOf('?') === -1 ? '?' : '&')
      for (var name in data) {
        url += ((url.indexOf('=') !== -1) ? '&' : '') + name + '=' + encodeURIComponent(data[name])
      }
      return url
    },
    complete () {
      if (this.isShiyong) {
        if (this.newPas && this.rePas) {
          if (this.newPas !== this.rePas) {
            this.$Message.info('两次输入密码不一致！')
            this.newPas = ''
            this.rePas = ''
            this.$refs.conPas.focus()
          } else {
            this.isTrue = true
          }
        }
      }
      let data = {userPassword: this.oldPas, newUserPassword: this.newPas, token: localStorage.getItem('token')}
      let url = this.getUrl(API.changePassword, data)
      console.log(data)
      console.log(url)
      if (this.isTrue) {
        console.log('发送请求')
        fetch(url, {
          method: 'get'
        }).then(res => res.json())
          .then(json => {
            if (json.status === 200) {
              this.$Message.info('修改成功！')
              localStorage.removeItem('token')
              this.userName = ''
              localStorage.removeItem('userName')
              localStorage.removeItem('userPassword')
              this.$router.push('/signIn')
            }
          })
      }
    }
  }
}
</script>
<style scoped>
  .changePassw {
    display: inline-block;
    width: 860px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    margin-left: 5px;
    padding: 10px 10px 0 10px;
    margin-bottom: 50px;
  }
  p {
    font-family: SimHei;
    font-size: 18px;
    color: #3e3e3e;
    text-align: left;
    margin-top: 25px;
  }
  .firstP {
    font-size: 20px;
    color: #333333;
    padding-top: 10px;
  }
  .firstP, .line {
    margin-top: 0;
  }
  label {
    display: inline-block;
    width: 234px;
    text-align: right;
    padding-right: 24px;
  }
  .line span {
    display: inline-block;
    width: 812px;
    border-bottom: 1px solid #d2d2d2;
  }
  input {
    width: 300px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid #d2d2d2;
    padding: 3px 0 3px 4px;
    outline: none;
  }
  .btn {
    border-radius: 3px;
    font-family: SimHei;
    line-height: 44px;
    margin-bottom: 30px;
    font-size: 18px;
    color: #ffffff;
    margin-top: 34px;
    text-align: center;
    display: inline-block;
    width: 300px;
    height: 44px;
    background: url("../img/personal/保存按钮bg@2x.png") no-repeat;
  }
</style>
