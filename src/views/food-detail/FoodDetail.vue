<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-02 13:10:48
 * @LastEditTime: 2024-04-02 15:09:43
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\food-detail\FoodDetail.vue
 * @Description: （菜品详情页） api测试通过
-->
<template>
  <div>
    <NavBar title="美食详情" :back="true"></NavBar>
    <div class="container">
      <van-image
        class="foodImage"
        width="15rem"
        height="15rem"
        fit="cover"
        :src="food.image"
      />
      <div class="banner">
        <div class="nameAndPrice">
          <span id="price">￥{{ food.price }}</span>
          <span>{{ food.food_name }}</span>
        </div>
        <div class="icon">
          <van-icon name="share-o" id="share" color="#921b9c" size="20px" />
          <span>分享</span>
        </div>
      </div>
      <div class="detail">
        <div class="info">
          <span class="header">原材料</span>
          {{ food.description | getMaterials }}
        </div>
        <div class="info">
          <span class="header">制作工艺</span>
          {{ food.description | getProcess }}
        </div>
        <div class="info">
          {{ food.description | getRecommended }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/nav/NavBar.vue";
import { getFoods } from "@/service/food";
import { weekFormat } from "@/utils/format";
export default {
  name: "FoodDetail",
  components: { NavBar },
  inject: ["allFoods"],
  data() {
    return {
      id: Number(this.$route.params.id),
      foods: [],
    };
  },
  computed: {
    food() {
      return this.foods.find((item) => item.food_id === this.id);
    },
  },
  filters: {
    getMaterials(word) {
      return word.match(/原材料介绍：([\s\S]*?)：/)[1].trim();
    },
    getProcess(word) {
      return word.match(/制作工艺：([\s\S]*?)：/)[1].trim();
    },
    getRecommended(word) {
      return word.match(/推荐词：([\s\S]*)/)[1].trim();
    },
  },
  async mounted() {
    this.foods = (await getFoods({ date: weekFormat(new Date()) })).data;
  },
};
</script>
<style lang="less" scoped>
@import url("./style.less");
</style>