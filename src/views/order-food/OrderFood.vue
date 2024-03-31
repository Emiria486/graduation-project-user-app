<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 16:03:37
 * @LastEditTime: 2024-03-31 17:33:58
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\order-food\OrderFood.vue
 * @Description: 用户点单页面，基本UI功能修复完毕(已api测试通过)
-->
<template>
  <div class="order-food">
    <NavBar title="餐饮预订" :back="true"></NavBar>
    <div class="order-food-header">
      <div class="order-food-date__week">今日{{ weekDate }}菜单</div>
    </div>
    <div class="order-food-container">
      <div
        class="order-food-item"
        v-for="(food, index) in currentFoods"
        :key="index"
      >
        <div class="order-food-item__floor">
          <div
            class="order-food-item-introduction"
            :style="{ background: getFoodBg(food.type) }"
          >
            <van-image width="120" height="120" :src="food.image" />
            <div class="order-food-item-name">{{ food.food_name }}</div>
            <van-tag
              size="medium"
              :color="food.status ? '#13c0ab' : '#d44d44'"
              >{{ food.status ? "在售" : "不在售" }}</van-tag
            >
          </div>
          <div class="order-food-item-footer">
            <div class="order-food-item-price">{{ food.price | price }}</div>
            <van-stepper
              v-model="food.step"
              theme="round"
              button-size="16"
              disable-input
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="shopCart">
      <div class="totle-price">
        <van-badge :content="$store.getters.totalNumber">
          <van-icon name="shopping-cart" />
        </van-badge>
        <span class="price-text">{{ $store.getters.totalPrice | price }}</span>
      </div>
      <div class="payment-button" @click="payment">去结算</div>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="orderShow"
      round
      closeable
      position="bottom"
      :style="{ height: '80%' }"
    >
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
import { getFoods } from "@/service/food";
import { weekFormat, dateWithoutYear } from "@/utils/format";
export default {
  name: "OrderFood",
  components: {
    NavBar,
  },
  filters: {
    week(value) {
      return weekFormat(value);
    },
    date(value) {
      return dateWithoutYear(value);
    },
    price(value) {
      return `￥${parseFloat(value).toFixed(2)}`;
    },
  },
  data() {
    return {
      weekDate: weekFormat(new Date()),
      foods: [],
      currentTab: "",
      orderShow: false,
    };
  },
  computed: {
    tabs() {
      const dates = [...new Set(this.foods.map((food) => food.date))];
      dates.sort(
        (pre, next) => new Date(pre).getTime() - new Date(next).getTime()
      );
      return dates;
    },
    currentFoods() {
      const foods = [];
      this.foods.forEach((food) => {
        if (food.date === this.currentTab) {
          foods.push(food);
        }
      });
      return foods;
    },
  },
  watch: {
    tabs(value) {
      this.currentTab = value[0];
    },
    currentFoods: {
      handler(value) {
        console.log("当前的currentFoods值", value);
        const selection = this.currentFoods.filter((food) => food.step !== 0);
        this.$store.commit("changeSelectedFoods", selection);
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getFoodBg(status) {
      switch (status) {
        case 1:
          return "#faece5";
        case 0:
          return "#eafde8";
      }
    },
    payment() {
      if (!localStorage.getItem("token")) {
        this.$toast("您还未登录");
      } else if (!this.$store.getters.totalNumber) {
        this.$toast("购物车空空如也~");
      } else {
        this.$router.push("/payment");
      }
    },
  },
  async mounted() {
    this.foods = (await getFoods({ date: weekFormat(new Date()) })).data;
    console.log("mounted", this.foods);
    this.foods.forEach((food) => {
      this.$set(food, "step", 0);
    });
  },
};
</script>
<style lang="less" scoped>
@import url("./style.less");
</style>