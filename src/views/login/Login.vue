<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 15:15:59
 * @LastEditTime: 2024-03-29 22:18:23
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\login\Login.vue
 * @Description: 用户登录页面（已测试api通过）
-->
<template>
  <div class="login">
    <div ref="header" class="login-header">
      <div class="login-header-back">
        <router-link to="/profile">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </router-link>
      </div>
      <header-background></header-background>
    </div>
    <div class="login-container">
      <form-box title="用户登录">
        <form-box-input
          v-model="loginForm.username"
          icon="idcard"
          placeholder="用户名"
        ></form-box-input>
        <form-box-input
          v-model="loginForm.password"
          icon="lock"
          placeholder="密码"
          type="password"
        ></form-box-input>
      </form-box>
      <div class="login-help">忘记密码？</div>
      <van-button type="primary" size="large" color="#fe4e36" @click="login">
        登录
      </van-button>
    </div>
    <div class="login-footer">
      <span>尚未拥有账号？</span>
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import HeaderBackground from "@/components/canvas/header-background";
import FormBox from "@/components/form-box/form-box.vue";
import FormBoxInput from "@/components/form-box/form-box-input.vue";
import { userLogin } from "@/service/login";
import AESHelper from "@/utils/AEShelper";

export default {
  name: "LoginPage",
  inject: ["tabBar"],
  components: {
    "header-background": HeaderBackground,
    "form-box": FormBox,
    "form-box-input": FormBoxInput,
  },
  data() {
    return {
      focusActive: false,
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      console.log("login", this.loginForm.username, this.loginForm.password);
      let encryptPassword = AESHelper.encrypt(this.loginForm.password);
      console.log("password", encryptPassword);
      const res = await userLogin({
        username: this.loginForm.username,
        password: encryptPassword,
      });
      if (res.status) {
        this.$toast({ message: res.message, type: "success" });
        localStorage.setItem("token", res.data.token);
        this.$router.push("/profile");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>