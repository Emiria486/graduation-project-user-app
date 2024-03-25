<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:09:58
 * @LastEditTime: 2024-03-24 08:53:05
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\components\form-box\form-box.vue
 * @Description: 表格组件
-->
<template>
  <section class="form-box">
    <div class="form-box-title" v-if="title">{{ title }}</div>
    <form :action="action">
      <slot></slot>
    </form>
  </section>
</template>
<script>
export default {
  name: "FormBox",
  props: {
    action: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
.form-box {
  display: flex;
  flex-direction: column;
  &-title {
    width: 100%;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 700;
    font-family: "黑体";
  }
}
</style>