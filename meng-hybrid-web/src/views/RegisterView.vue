<template>
  <div class="register-page">
    <navigation-bar :page-name="'注册'" @onLeftClick="onBackClick()"></navigation-bar>

    <div class="register-page-content">
        <div class="input-container">
          <input v-model="username" placeholder="用户名" type="text" name="" id="">
        </div>
        <div class="input-container">
          <input v-model="password" placeholder="密码" type="text" name="" id="">
        </div>
        <div class="input-container">
          <input v-model="confirmPassword" placeholder="确认密码" type="text" name="" id="">
        </div>
        <div @click="onRegisterClick()" class="register-page-content-register page-commit">
            注册
        </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBarView.vue'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 注册按钮点击事件
     */
    onRegisterClick () {
      if (this.username.length === 0) {
        alert('请完善用户名')
        return
      }
      if (this.password.length === 0 || this.password !== this.comfirmPassword) {
        alert('请完善密码')
        return
      }

      // 保存用户输入的 用户名以及密码
      this.md5Password = this.password
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.register-page{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;

  &-content{
    width: 100%;
    height: 100%;

    &-register{
      margin-top: 40%;
    }
  }
}
</style>
