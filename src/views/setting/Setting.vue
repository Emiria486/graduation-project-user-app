<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 20:20:15
 * @LastEditTime: 2024-03-30 16:43:27
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\setting\Setting.vue
 * @Description: 用户设置页（已测试通过）
-->
<template>
  <div class="setting">
    <NavBar title="设置" :back="true"></NavBar>
    <van-cell-group title="信息" :border="false">
      <van-cell title="个人信息" clickable @click="jump('/user-info')">
        <template #icon>
          <i class="iconfont icon-user-setting" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="支付设置">
      <van-cell title="支付密码" clickable to="/payment-password">
        <template #icon>
          <i class="iconfont icon-payment-password" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="账号" :border="false">
      <van-cell title="切换账号" clickable @click="switchAccount">
        <template #icon>
          <i class="iconfont icon-exchange" />
        </template>
      </van-cell>
      <van-cell
        title="注销账号"
        clickable
        icon-prefix="login-out"
        @click="loginOut"
      >
        <template #icon>
          <i class="iconfont icon-login-out" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
export default {
  name: "SettingPage",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    jump(path) {
      if (localStorage.getItem("token")) {
        this.$router.push(path);
      } else {
        this.$toast({
          message: "未登录",
        });
      }
    },
    switchAccount() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    loginOut() {
      if (localStorage.getItem("token")) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否退出账号？",
          })
          .then(() => {
            localStorage.removeItem("token");
            this.$router.push("/");
          })
          .catch(() => {
            this.$toast({
              message: "不要离开我~",
            });
          });
      } else {
        this.$toast({
          message: "未登录",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>