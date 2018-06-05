<!--登录组件-->

<template>
  <div class="signIn">
    <form action="http://localhost/my/LoginServlet" class="form">
      <div class="username">
        <input type="text" placeholder="用户名/邮箱" name="userName"
               onfocus="this.placeholder=''" onblur="this.placeholder='用户名/邮箱'" v-model="sigIn.userName">
        <p class="warn">用户名/邮箱不存在！</p>
      </div>

      <div>
        <input type="password" placeholder="密码" name="userPassword"
               onfocus="this.placeholder=''" onblur="this.placeholder='密码'" v-model="sigIn.userPassword">
        <p class="warn" >密码错了,再想想吧~</p>
      </div>

      <div class="rememberAndForget">
        <span>
          <Checkbox v-model="single">记住密码</Checkbox>
        </span>
        <span>忘记密码>></span>
      </div>

      <div class='btn_log'>
        <span @click="btn_sigin"></span>
      </div>
      <div class="footer">
        <router-link to="/signUp"><span @click="changeState" class="routerToSignUp">竟然还没有账号？速去注册>></span></router-link>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import API from '../common/js/api/api.js'
export default{
  data () {
    return {
      single: true
    }
  },
  computed: {
    sigIn () {
      return this.$store.state.sigIn
    }
  },
  mounted () {
    if (localStorage.getItem('userPassword') && localStorage.getItem('userPassword')) {
      this.sigIn.userName = localStorage.getItem('userName')
      this.sigIn.userPassword = localStorage.getItem('userPassword')
    }
  },
  methods: {
    // 用户点击“快速去注册”触发父组件(register.vue)的事件
    changeState () {
      this.$emit('changeState')
    },
    // 登录
    getUrl (url, data) {
      url += (url.indexOf('?') === -1 ? '?' : '&')
      for (var name in data) {
        url += ((url.indexOf('=') !== -1) ? '&' : '') + name + '=' + encodeURIComponent(data[name])
      }
      return url
    },
    btn_sigin () {
      var urlSign = this.getUrl(API.login, this.$store.state.sigIn)
      //      console.log(urlSign)
      fetch(urlSign, {
        method: 'get'
      }).then((res) => res.json())
        .then(json => {
          if (json.status === 200) {
            this.$Message.info('登录成功！')
            localStorage.setItem('token', json.data)
            if (this.single) {
              localStorage.setItem('userName', this.sigIn.userName)
              localStorage.setItem('userPassword', this.sigIn.userPassword)
            } else {
              localStorage.removeItem('userName')
              localStorage.removeItem('userPassword')
            }
            this.$store.state.head.userName = this.sigIn.userName
            this.$router.push('/oldgoods')
          }
          if (json.status === 400) {
            this.$Message.info(json.data)
          }
        })
    }
  }
}
</script>

<style scoped>
  * {
    margin:0;
    padding:0;
    text-decoration: none;
  }
  .signIn {
    width:300px;
    height: 341px;
    margin-top: 43px;
    margin-left: 366px;
    background: url("../img/register/border_signIn.png") no-repeat;
  }

  form {
    height: 341px;
  }
  form input {
    border: 2px solid #0094be;
    border-radius: 3px;
    padding-left: 10px;
    line-height: 24px;
    font-size: 14px;
    outline: none;
    width: 210px;
  }
  p {
    line-height:20px;
    font-size: 12px;
    color: #fe8454;
    text-align: left;
    padding-left: 50px;
  }
  .username {
    padding-top: 82px;
  }
  .rememberAndForget span {
    font-size: 12px;
    color: #3e3e3e;
  }
  .rememberAndForget span:first-child {
    margin-right: 98px;
  }
  input[type=checkbox] {
    width: 12px;
    height: 12px;
    vertical-align: middle;
    border: 0;
    outline: none;
    cursor: pointer;
  }
  .btn_log {
    padding-top: 30px;
  }
  .btn_log span {
    display: inline-block;
    width: 204px;
    height: 34px;
    background: url("../img/register/登录按钮.png") no-repeat;
  }
  .warn {
    visibility: hidden;
  }
  .footer {
    padding-top: 30px;
  }
  .footer a {
    font-size: 12px;
    color: #444a50;
  }
  @media only screen and (max-width: 1366px) {
    .signIn {
      margin-left: 300px;
    }
  }
</style>
