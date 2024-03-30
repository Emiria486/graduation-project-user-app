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
import { getAdminInfo } from "@/service/user";
export default {
  name: "App",
  provide() {
    return {
      tabBar: this.tabBar,
      adminInfo: this.adminInfo,
    };
  },
  components: {
    TabBar,
  },
  async created() {
    this.adminInfo = (await getAdminInfo()).data;
    console.log("获取到的adminInfo", this.adminInfo);
  },
  data() {
    return {
      tabBar: {
        show: true,
      },
      adminInfo: {},
    };
  },
};
</script>

<style>
@import url("./assets/css/base.css");
</style>
