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
          <input type="checkbox" checked>记住密码
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
//  import router from '../router'
import store from '../vuex/store'
export default{

  data () {
    return {
      sigIn: {
        userName: '',
        userPassword: ''
      }
    }
  },
  computed: {
  },
  methods: {
    // 用户点击“快速去注册”触发父组件(register.vue)的事件
    changeState () {
      this.$emit('changeState')
    },
    // 登录
    btn_sigin () {
      console.log(this.$store.state.sigIn)
      let userData = {
        userName: this.sigIn.userName,
        userPassword: this.sigIn.userPassword
      }
      fetch('http://192.168.1.103:8080/campus/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then((res) => res.json())
        .then((json) => {
          this.$store.state.head.userName = this.sigIn.userName
        })
    }

    //      // 登录后获得用户名和用户头像
    //      signIn () {
    //        // this.errors.add('userName', '用户名/邮箱不存在');
    //        this.formData = $(".form").serialize();
    //        this.$http.post('http://localhost/my/LoginServlet', this.formData)
    //          .then(response => {
    //            console.log(response)
    //            this.userName = response.data[0].userName
    //            //  that.userHead = response.data.data.userHead;
    //            //  触发父组件(register)给App.vue传值
    //            this.$emit('userSignIn', this.userName)
    //            //  路由到主页
    //            router.push({
    //              path: '/'
    //            })
    //          })
    //          .catch(error => {
    //            console.log(error)
    //          })
    //      }
  },
  store
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
