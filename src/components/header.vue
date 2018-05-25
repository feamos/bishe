<template>
  <div class="header">
    <div class="logo">
      <a class="brand"><img src="../img/header/logo.png"/></a>
    </div>
    <ul class="tab">
      <li class="tab-item">
        <router-link to="/" tag="span">主页</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/oldgoods" tag="span">二手</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/message" tag="span">留言</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/lost" tag="span">寻物</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/active" tag="span">活动</router-link>
      </li>
    </ul>
    <span class="login" v-show="!userName">
        <router-link to="/register"><img src="../img/header/登录.png" alt="登录"></router-link>
        <router-link to="/signUp"><img src="../img/header/注册.png" alt="注册"></router-link>
      </span>
    <Dropdown v-show="userName" id="person">
      <a href="javascript:void(0)">
        hello!  {{userName}}
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list" class='personLi'>
        <DropdownItem>个人中心</DropdownItem>
        <DropdownItem><span @click="quitSign">退出</span></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import API from '../common/js/api/api.js'
export default {
  name: 'header',
  data () {
    return {
      msg: 'head'
    }
  },
  mounted () {
    if (localStorage.getItem('userName')) {
      this.$store.state.head.userName = localStorage.getItem('userName')
    }
  },
  computed: {
    userName: {
      get () {
        return this.$store.state.head.userName
      },
      set (value) {
        this.$store.state.head.userName = value
      }
    }
  },
  methods: {
    quitSign () {
      fetch(API.quit, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(localStorage.getItem('token'))
      }).then(res => res.json())
        .then(json => {
          console.log(json)
          if (json.status === 200) {
            localStorage.removeItem('token')
            this.userName = ''
            this.$Message.info('退出成功！')
          }
        })
    }
  }
}
</script>

<style scoped>
  li,a {
    list-style: none;
  }
  .header {
    width: 100%;
    text-align: center;
    line-height: 75px;
    color: #009efd;
    background: url("../img/header/bg.png") no-repeat center;
  }
  .header ul, li{
    display: inline-block;
  }
  .header li {
    padding: 0 40px 0 40px;
    font-size: 24px;
  }
  .logo {
    display: inline-block;
  }
  .brand {
    padding-right: 10px;
  }
  .tab {
    vertical-align: middle;
    margin-left: 80px;
  }
  .tab-item ,.user{
    color: #009efd;
    cursor: pointer;
  }
  .tab-item span:hover,.user:hover {
    color: #000;
  }
  .login,.user {
    padding-left: 100px;
  }
  .login a,.user a {
    margin-left: 10px;
  }
  #person {
    line-height: 32px;
    margin-left: 80px;
  }
  #person li {
    display: block;
    padding: 3px 20px 3px 20px;
  }
  @media (max-height: 768px) and (max-width:1366px) {
    .brand{
      padding-right: 0px;
    }
    .header li {
      padding: 0 20px 0 20px;
    }
    .login,.user{
      padding-left: 50px;
    }
  }
</style>
