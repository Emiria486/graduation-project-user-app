<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 19:55:06
 * @LastEditTime: 2024-03-31 20:35:51
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\register\Register.vue
 * @Description: 用户注册页面
-->
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
      <van-form title="注册" ref="registerForm">
        <van-field
          v-model="registerForm.username"
          icon="manager-o"
          placeholder="姓名"
        />
        <van-field
          v-model="registerForm.password"
          icon="lock"
          placeholder="密码"
          type="password"
          :rules="[
            { required: true, message: '密码不能为空', trigger: 'onBlur' },
          ]"
        />
        <van-field
          v-model="registerForm.repeatPassword"
          icon="lock"
          placeholder="请重新确认你的密码"
          type="password"
          name="validator"
          :rules="[
            {
              required: true,
              validator: repeatPasswordValidator,
              message: '两次输入的密码不一致',
              trigger: 'onBlur',
            },
          ]"
        />
        <van-field
          v-model="registerForm.email"
          icon="envelop-o"
          placeholder="邮箱"
          :rules="[
            {
              required: true,
              pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
              message: '请输入正确的邮箱',
              trigger: 'onBlur',
            },
          ]"
        />
        <van-field
          v-model="registerForm.phone"
          icon="phone-o"
          placeholder="电话号码"
          :rules="[
            {
              required: true,
              pattern:
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '请输入正确的电话号码',
              trigger: 'onBlur',
            },
          ]"
        />
      </van-form>
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
import { userRegister } from "@/service/register";
import AESHelper from "@/utils/AEShelper";
export default {
  name: "RegisterPage",
  components: {
    "header-background": HeaderBackground,
  },
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
        repeatPassword: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        await this.$refs.registerForm.validate();
        console.log("全部校验成功");

        const res = await userRegister({
          username: this.registerForm.username,
          password: AESHelper.encrypt(this.registerForm.password),
          email: this.registerForm.email,
          phone: this.registerForm.phone,
        });

        if (res.status) {
          this.$toast.success(res.message);
           this.$router.push("/login");
        } else {
          this.$toast.fail(res.message);
        }
      } catch (error) {
        this.$toast.fail("提交失败，请检查你的输入");
      }
    },
    repeatPasswordValidator() {
      return this.registerForm.password === this.registerForm.repeatPassword;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./style.less");
</style>