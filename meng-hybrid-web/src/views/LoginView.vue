<template>
  <div class="login-page">
    <navigation-bar :page-name="'登录'" @onLeftClick="onBackClick"></navigation-bar>

    <!-- 内容区 -->
    <div class="login-page-content">
      <!-- 用户名 -->
      <div class="input-container">
          <input v-model="username" type="text" placeholder="用户名">
      </div>
      <!-- 密码 -->
      <div class="input-container">
          <input v-model="password" type="password" placeholder="密码">
      </div>

      <div class="login-page-content-login page-commit" @click="onLoginClick">
        登录
      </div>

      <a @click="onToRegisterClick()" class="login-page-content-register" href="javascript:;">注册新用户</a>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBarView.vue'
export default {
  name: 'login-view',
  components: {
    NavigationBar
  },
  data () {
    return {
      // 用户名
      username: '',
      password: ''
    }
  },
  methods: {
    onBackClick () {
      // 后退事件
      this.$router.go(-1)
    },
    // 登录按钮点击事件
    onLoginClick () {
      // 验证用户输入的合法性
      if (this.username.length === 0 || this.password.length === 0) {
        alert('用户名或密码未输入')
      }
    },
    /**
     * 立即注册点击事件
     */
    onToRegisterClick () {
      this.$router.push({
        name: 'register-view',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.login-page{
  // 页面组件过渡动画，脱离文档流
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;

  &-content{
    width: 100%;
    height: 100%;

    &-login{
      margin-top: 40%;
    }

    &-register{
      font-size: $infoSize;
      color: $hintColor;
      margin-top: $marginSize;
      padding: $marginSize;
      float: right;
    }
  }
}
</style>
