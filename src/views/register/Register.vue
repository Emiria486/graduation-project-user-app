<template>
  <div class="register">
    <div class="register-header">
      <div class="register-header-back">
        <router-link to="/login">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </router-link>
      </div>
      <header-background></header-background>
    </div>
    <div class="register-container">
      <form-box title="注册">
        <form-box-input
          v-model="registerForm.username"
          icon="manager-o"
          placeholder="姓名"
        />
        <form-box-input
          v-model="registerForm.password"
          icon="lock"
          placeholder="密码"
          type="password"
        />
        <form-box-input
          v-model="registerForm.email"
          icon="envelop-o"
          placeholder="邮箱"
        />
        <form-box-input
          v-model="registerForm.phone"
          icon="phone-o"
          placeholder="电话号码"
        />
      </form-box>
      <van-button type="primary" size="large" color="#fe4e36" @click="submit">
        注册
      </van-button>
    </div>
    <div class="register-footer">
      <span>已拥有账号,立即前往&nbsp;&nbsp;</span>
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>
<script>
import HeaderBackground from "@/components/canvas/header-background.vue";
import FormBox from "@/components/form-box/form-box.vue";
import FormBoxInput from "@/components/form-box/form-box-input.vue";
import { userRegister } from "@/service/register";
export default {
  name: "RegisterPage",
  components: {
    "header-background": HeaderBackground,
    "form-box": FormBox,
    "form-box-input": FormBoxInput,
  },
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    async submit() {
      const res = await userRegister({
        username: this.registerForm.username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        phone: this.registerForm.phone,
      });
      if (res.status) {
        this.$toast.success("注册成功");
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./style.less");
</style>