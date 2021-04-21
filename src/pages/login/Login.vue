<template>
  <common-layout :style="login_wrap_bg">
    <div class="top">
      <div class="header">
        <svg width="60px" height="30" viewBox="0 0 169 141" style="vertical-align: middle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="linearGradient-1" x1="54.0428975%" y1="4.39752391%" x2="54.0428975%" y2="108.456714%">
              <stop stop-color="#29CDFF" offset="0%" />
              <stop stop-color="#148EFF" offset="62.3089445%" />
              <stop stop-color="#0A60FF" offset="100%" />
            </linearGradient>
            <linearGradient id="linearGradient-2" x1="50%" y1="14.2201464%" x2="50%" y2="113.263844%">
              <stop stop-color="#FA816E" offset="0%" />
              <stop stop-color="#F74A5C" offset="65.9092442%" />
              <stop stop-color="#F51D2C" offset="100%" />
            </linearGradient>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(0.000000, -5.000000)">
              <rect id="Rectangle" fill="url(#linearGradient-1)" transform="translate(83.718923, 75.312358) rotate(-24.000000) translate(-83.718923, -75.312358) " x="68.7189234" y="0.312357954" width="30" height="150" rx="15" />
              <rect id="Rectangle" fill="url(#linearGradient-1)" transform="translate(129.009910, 75.580213) rotate(-24.000000) translate(-129.009910, -75.580213) " x="114.00991" y="0.580212739" width="30" height="150" rx="15" />
              <circle id="Oval" fill="url(#linearGradient-2)" cx="25" cy="120" r="25" />
            </g>
          </g>
        </svg>
        <span class="title">{{ systemName }}</span>
      </div>
    </div>
    <div class="login-wrap" :style="login_bg">
      <div class="title">登录</div>
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-form-model-item prop="account">
          <a-input v-model="form.account" size="large" placeholder="请输入用户名">
            <a-icon slot="prefix" type="user" style="font-size: 18px; color: #00FFFC" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input v-model="form.password" size="large" placeholder="请输入密码" autocomplete="autocomplete" auto-complete="new-password" type="password">
            <a-icon slot="prefix" type="lock" style="font-size: 18px; color: #00FFFC" />
          </a-input>
        </a-form-model-item>
        <div>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-model-item>
          <a-button :loading="loading" block class="btn-login" size="large" type="primary" @click="handleSubmit">登录</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import { login, getMenus } from '@/services/user'
import { setAuthorization } from '@/utils/request'
import { loadRoutes } from '@/utils/routerUtil'
import { mapMutations } from 'vuex'
import { toTree } from '@/utils/util'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      loading: false,
      error: '',
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: { required: true, message: '请输入用户名' },
        password: { required: true, message: '请输入用户密码' }
      },
      login_wrap_bg: { backgroundImage: 'url(' + require('@/assets/img/bg.jpg') + ')' },
      login_bg: { backgroundImage: 'url(' + require('@/assets/img/login.png') + ')' }
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.loading = true
        const res = await login(this.form.account, this.form.password)
        this.loading = false
        const { code, data, message } = res.data
        if (code !== 0) {
          this.$message.error(message)
          return
        }
        this.setUserInfo(data)
      })
    },
    setUserInfo(data) {
      const { userInfo, token } = data
      this.setUser(userInfo.user)
      this.setPermissions(userInfo.permissions)
      setAuthorization({ token: token })
      this.handleMenus()
    },
    async handleMenus(message) {
      const res = await getMenus()
      const { data } = res.data
      const routesConfig = [
        {
          router: 'root',
          children: toTree(data)
        }
      ]
      loadRoutes(routesConfig)
      this.$router.push('/dashboard')
      this.$message.success('登录成功！', 3)
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    color: #22ffff;
    background-size: 100% 100%;
    .top{
      text-align: center;
      .header {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
    }
    .login-wrap{
      width: 368px;
      margin: 0 auto;
      padding: 24px 40px;
      box-sizing: content-box;
      background-size: 100% 100%;
      border-radius: 8px;
      color: #fff;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .title{
        text-align: center;
        font-size: 28px;
        margin-bottom: 24px;
      }
      .form-inout-item{
        &::after{
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          right: 0;
          bottom: 1px;
          z-index: 1;
          border-right: 1px solid #22ffff;
          border-bottom: 1px solid #22ffff;
        }
        &::before{
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          border-top: 1px solid #22ffff;
          border-left: 1px solid #22ffff;
        }
      }
      /deep/.ant-input{
        border: none;
        background: transparent;
        padding-left: 42px;
        background-image: linear-gradient(rgba(255, 255, 255, .2), rgba(255, 255, 255, .1), rgba(255, 255, 255, .2));
        color: #22ffff;
      }
      /deep/::-webkit-input-placeholder{
        color: #86F0FF;
      }
      .btn-login{
        margin-top: 30px;
        font-size: 20px;
        font-weight: bold;
        border: none;
        background-image: linear-gradient(to right, #005efe, #0587eb);
        color: #fff !important;
      }
    }
  }
</style>
