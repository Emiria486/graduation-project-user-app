<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:18:01
 * @LastEditTime: 2024-03-25 15:20:22
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\App.vue
 * @Description: 头部注释配置模板
-->
<template>
  <div id="app">
    <div id="content" class="outer-container">
      <keep-alive include="About">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div id="tabBar" v-if="tabBar.show">
      <TabBar></TabBar>
    </div>
  </div>
</template>

<script>
import TabBar from "./components/nav/TabBar.vue";
export default {
  name: "App",
  provide() {
    return {
      tabBar: this.tabBar,
    };
  },
  components: {
    TabBar,
  },
  data() {
    return {
      tabBar: {
        show: true,
      },
    };
  }
};
</script>

<style>
@import url("./assets/css/base.css");
</style>
