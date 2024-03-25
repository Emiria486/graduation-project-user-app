<template>
  <div class="About">
    <NavBar title="关于我们" :border="true"></NavBar>
    <div class="content">
      <img src="../../assets/img/about/introduce.jpg" />
      <img src="../../assets/img/about/about1.jpg" />
      <img src="../../assets/img/about/about2.jpg" />
      <img src="../../assets/img/about/about3.jpg" />
      <img src="../../assets/img/about/about4.jpg" />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/nav/NavBar.vue";
export default {
  name: "AboutPage",
  comments: { NavBar },
  inject: ["tabBar"],
  activated() {
    const { tabBar } = this;
    tabBar.show = true;
  },
  deactivated() {
    const { tabBar } = this;
    tabBar.show = false;
  },
};
</script>
<style lang="less" scoped>
@import url("./style.less");
</style>