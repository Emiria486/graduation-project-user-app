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