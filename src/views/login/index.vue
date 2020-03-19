<template>
  <div class='container'>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 手机号  验证码  登录按钮 -->
    <van-cell-group>
      <van-field v-model="loginForm.mobile" @blur="checkMobile" :error-message="errorMessage.mobile" label="手机号" placeholder="请输入手机号"></van-field>
      <van-field v-model="loginForm.code" @blur="checkCode" :error-message="errorMessage.code" label="验证码" placeholder="请输入验证码">
        <!-- slot指定给哪个坑填内容 -->
        <van-button  slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class='btn-box'>
      <van-button @click="login" type="info" size="small" round block>登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMessage: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']),
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errorMessage.mobile = '手机号不能为空'
        // 为了终止下面的判断
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号格式错误'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        // 为了终止下面的判断
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码格式错误'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    async login () {
      const validateMobile = this.checkMobile()
      const validateCode = this.checkCode()
      if (validateMobile && validateCode) {
        // 发送登录请求 封装到api/login
        try {
          const result = await login(this.loginForm)// 请求成功返回result方法此时的reslut是{token:'',refresh_token: ''}
          // 更改vuex中的公共状态
          console.log(result)
          this.updateUser({ user: result })
          // 判断是否有需要跳转的页面
          const { redirectUrl } = this.$route.query
          this.$router.push(redirectUrl || '/')
        } catch (error) {
          // 如果请求失败,友好提示
          this.$notify('手机号验证码错误')
        }
      }
    }
  }
}
</script>

<style scoped>
   .btn-box {
     padding: 20px;
   }
</style>
