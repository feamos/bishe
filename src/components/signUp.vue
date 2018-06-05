<!--注册组件-->

<template>
  <div class="signUp">
    <form class="form">
      <div class="username">
        <label for="userName">用户名：</label>
        <input type="text" id="userName" name="userName" placeholder="起个简洁霸气的用户名吧~" @blur="checkName"
               v-model="sigUp.userName" @focus="boolName=true">
        <span class="warn" :class="{warntext: !boolName}"><span :class="{warncolor: nameColor}">{{nametext}}</span></span>
      </div>
      <div>
        <label for="userPassword">密码：</label>
        <input type="password" id="userPassword" name="userPassword" placeholder="6~18位密码~" @blur="checkPass" @focus="boolPasw=true" v-model="sigUp.userPassword">
        <span class="warn" :class="{warntext: !boolPasw}"><span :class="{warncolor: passColor}">{{passtext}}</span></span>
      </div>
      <div>
        <label for="reUserPassword">确认密码：</label>
        <input type="password" id="reUserPassword" name="reUserPassword" placeholder="确保你的密码没有错误~" @blur="checkPass" @focus="boolRePasw=true" v-model="sigUp.reUserPassword">
        <span class="warn" :class="{warntext: !boolRePasw}"><span :class="{warncolor: repassColor}">{{confirmpasstext}}</span></span>
      </div>
      <div>
        <label for="email">邮箱：</label>
        <input type="text" id="email" name="email" placeholder="方便日后密码找回~" @blur="checkMail" @focus="boolMail=true" v-model="sigUp.email">
        <span class="warn" :class="{warntext: !boolMail}"><span :class="{warncolor: mailColor}">{{mailtext}}</span></span>
      </div>

      <div>
        <label for="qq">QQ：</label>
        <input type="text" id="qq" name="qq" placeholder="方便与别人直接QQ联系~" @blur="checkQQ" @focus="boolQq = true" v-model="sigUp.qq">
        <span class="warn" :class="{warntext: !boolQq}"><span :class="{warncolor: qqColor}">{{qqtext}}</span></span>
      </div>
      <div class='btn_sig'>
        <span @click="sigup"></span>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import regx from '../common/js/regx'
import API from '../common/js/api/api'
export default{
  data () {
    return {
      // 用户名
      nametext: '以中文或字母开头，长度为6-16位',
      boolName: false,
      nameColor: false,
      accessName: false,
      // 密码
      passtext: '6-18位密码',
      boolPasw: false,
      passColor: false,
      confirmpasstext: '确认密码',
      boolRePasw: false,
      repassColor: false,
      accessPasw: false,
      mailtext: '格式：*@*.com',
      mailColor: false,
      accessMail: false,
      boolMail: false,
      qqtext: '输入qq号',
      qqColor: false,
      accessQq: false,
      boolQq: false,
      isSignup: true
    }
  },
  computed: {
    sigUp: {
      get () {
        return this.$store.state.sigUp
      }
    }
  },
  methods: {
    checkName () {
      if (regx.userName.test(this.sigUp.userName)) {
        this.nametext = '用户名可用'
        this.accessName = true
        this.nameColor = true
      } else {
        this.nametext = '用户名格式不正确'
        this.accessName = false
        this.nameColor = false
      }
      if (!this.sigUp.userName) {
        this.boolName = false
        this.nametext = '用户名不能为空'
        this.accessName = false
        this.nameColor = false
      }
    },
    checkPass () {
      if (regx.userPassword.test(this.sigUp.userPassword)) {
        this.passtext = '密码可用'
        this.passColor = true
        this.isSignUp = true
      } else if (this.sigUp.userPassword.length < 6) {
        this.passtext = '密码太短'
        this.passColor = false
        this.isSignUp = false
      } else {
        this.passtext = '密码太长'
        this.passColor = false
        this.isSignUp = false
      }
      if (!this.sigUp.userPassword) {
        this.passtext = '密码不能为空'
        this.passColor = false
      }
      if (this.sigUp.reUserPassword !== this.sigUp.userPassword) {
        this.confirmpasstext = '两次输入密码不一致'
        this.repassColor = false
        this.accessPasw = false
      } else if (this.sigUp.reUserPassword) {
        this.confirmpasstext = '输入正确'
        this.repassColor = true
        this.accessPasw = true
      }
    },
    checkMail () {
      if (regx.mail.test(this.sigUp.email)) {
        this.mailtext = '邮箱格式正确'
        this.accessMail = true
        this.mailColor = true
      } else {
        this.mailtext = '邮箱格式不正确'
        this.accessMail = false
        this.mailColor = false
      }
      if (!this.sigUp.email) {
        this.mailtext = '邮箱不能为空'
      }
    },
    checkQQ () {
      if (regx.qq.test(this.sigUp.qq)) {
        this.qqtext = 'QQ号可用'
        this.accessQq = true
        this.qqColor = true
      } else {
        this.qqtext = 'QQ号格式不正确'
        this.qqColor = false
      }
      if (!this.sigUp.qq) {
        this.qqtext = 'QQ号不能为空'
      }
    },
    sigup () {
      let submitRegister = this.$store.state.sigUp
      console.log(submitRegister)
      fetch(API.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitRegister)
      }).then((res) => res.json())
        .then((json) => {
          if (json.status === 400) {
            console.log(json.data)
            let msg = ''
            for (var value in json.data) {
              if (json.data[value] === 1) {
                msg = value
              }
            }
            switch (msg) {
              case 'usernameExistError':
                this.nametext = '用户名已存在'
                this.boolName = true
                this.nameColor = false
                this.accessName = false
                break
            }
          }
          if (json.status === 200) {
            this.$Message.info('注册成功！')
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .signUp {
    width: 300px;
    height: 500px;
    margin-top: 43px;
    margin-left: 366px;
    background: url("../img/register/border_signUp.png") no-repeat;
  }

  .form .username {
    padding-top: 72px;
  }

  .form input {
    display: block;
    margin-left: 45px;
    border: 2px solid #0094be;
    border-radius: 5px;
    padding-left: 10px;
    line-height: 24px;
    font-size: 14px;
    outline: none;
    width: 198px;
  }

  .form label {
    display: block;
    color: #3e3e3e;
    font-size: 14px;
    text-align: left;
    padding-left: 53px;
  }

  .form .warn {
    display: block;
    color: #fe8454;
    font-size: 12px;
    line-height: 18px;
    text-align: left;
    padding-left: 53px;
  }

  .btn_sig span {
    display: inline-block;
    width: 204px;
    height: 34px;
    margin-top: 28px;
    background: url("../img/register/注册按钮.png") no-repeat;
    cursor: pointer;
  }

  .warntext {
    visibility: hidden;
  }
  .warncolor {
    color: green;
  }
  @media only screen and (max-width: 1366px) {
    .signUp {
      margin-left: 300px;
    }
  }
</style>
