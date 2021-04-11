<template>
  <common-layout>
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
    <div class="login">
      <div class="title">非侵入式负荷检测</div>
      <a-form :form="form" @submit="onSubmit">
        <a-form-item class="form-inout-item">
          <a-input
            v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
            autocomplete="autocomplete"
            size="large"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" two-tone-color="#fff" />
          </a-input>
        </a-form-item>
        <a-form-item class="form-inout-item">
          <a-input
            v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
            size="large"
            placeholder="请输入密码"
            autocomplete="autocomplete"
            auto-complete="new-password"
            type="password"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button :loading="logging" block class="btn-login" size="large" html-type="submit" type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import { login, getRoutesConfig } from '@/services/user'
import { setAuthorization } from '@/utils/request'
import { loadRoutes } from '@/utils/routerUtil'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          login(name, password).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const { user, permissions, roles } = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({ token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt) })
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes(routesConfig)
          this.$router.push('/dashboard/workplace')
          this.$message.success(loginRes.message, 3)
        })
      } else {
        this.error = loginRes.message
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    color: #22ffff;
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
    .login{
      width: 368px;
      margin: 0 auto;
      padding: 24px 40px;
      box-sizing: content-box;
      border: 1px solid #22ffff;
      background-color: rgba(11, 33, 100, .5);
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
        // &::after{
        //   content: '';
        //   width: 10px;
        //   height: 10px;
        //   position: absolute;
        //   right: 0;
        //   bottom: 1px;
        //   z-index: 1;
        //   border-right: 1px solid #22ffff;
        //   border-bottom: 1px solid #22ffff;
        // }
        // &::before{
        //   content: '';
        //   width: 10px;
        //   height: 10px;
        //   position: absolute;
        //   left: 0;
        //   top: 0;
        //   z-index: 1;
        //   border-top: 1px solid #22ffff;
        //   border-left: 1px solid #22ffff;
        // }
      }
      /deep/.ant-input{
        border: none;
        background: transparent;
        background-image: linear-gradient(rgba(255, 255, 255, .2), rgba(255, 255, 255, .1), rgba(255, 255, 255, .2))
      }
      .btn-login{
        margin-top: 30px;
        font-size: 20px;
        font-weight: bold;
        background-image: linear-gradient(to right, #005efe, #0587eb);
        color: #fff !important;
      }
    }
  }
</style>
