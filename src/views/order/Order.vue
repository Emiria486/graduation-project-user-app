<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 15:29:42
 * @LastEditTime: 2024-04-09 11:11:45
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\order\Order.vue
 * @Description: 用户支付券码页面（已通过api测试）
-->
<template>
  <div class="order">
    <NavBar title="师大餐饮" :border="false">
      <template #left>
        <div class="navBar-left" @click="goBack">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </template>
    </NavBar>
    <van-empty v-if="!orders.length" description="暂无支付券码信息" />
    <template v-else>
      <van-cell-group
        v-for="(item, index) in orders"
        :key="index"
        :title="item.create_time | dateFormat"
      >
        <van-card
          :price="parseFloat(item.price).toFixed(2)"
          :tag="item.order_type | orderType"
          :desc="item.foods | description"
          :title="'订单编号：' + item.order_id"
          @click="showDetails(item)"
        >
          <template #price-top>
            <div>共 {{ item.foodTotal }} 件商品</div>
          </template>
          <template #num>
            <van-button
              class="order-confirm-button"
              size="small"
              type="danger"
              :disabled="!!item.status"
              @click="confirmOrder"
            >
              {{ item.status | buttonText }}
            </van-button>
          </template>
          <template #thumb>
            <img src="@/assets/img/icon/QRCode.png" class="QRCodeImg" />
          </template>
        </van-card>
      </van-cell-group>
    </template>
    <!-- 弹出层 -->
    <van-popup
      v-model="popupShow"
      position="right"
      closeable
      @closed="hanldePopupClose"
    >
      <div class="order-popup">
        <div ref="qrcode" class="qrcode"></div>
        <span class="qrcode-use-tip">以此二维码扫码取餐</span>
        <div class="order-popup-details">
          <van-cell-group title="商家联系方式：">
            <van-cell icon="phone">{{ adminInfo.phone }}</van-cell>
          </van-cell-group>
          <van-cell-group title="配送信息">
            <van-cell
              icon="manager"
              title="姓名"
              :value="user.username"
            ></van-cell>
            <van-cell title="配送地址" :value="user.address">
              <template #icon>
                <i class="iconfont icon-address"></i>
              </template>
            </van-cell>
            <van-cell
              title="订单类型"
              :value="currentOrder.order_type | orderType"
            >
              <template #icon>
                <i class="iconfont icon-type"></i>
              </template>
            </van-cell>
            <van-cell icon="phone" title="联系方式" :value="user.phone" />
          </van-cell-group>
          <van-cell-group title="选购信息">
            <van-cell
              v-for="(item, index) in currentOrder.foods"
              :key="index"
              :title="item.food_name + ' x' + item.number"
              :value="item.price | price"
            />
          </van-cell-group>
          <van-cell-group title="付款信息">
            <van-cell
              icon="coupon"
              title="优惠"
              :value="`￥${currentOrder.discount}`"
            />
            <van-cell
              icon="points"
              title="总额"
              :value="`￥${currentOrder.price}`"
            />
          </van-cell-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
import QRCode from "qrcodejs2";
import { getOrder } from "@/service/order";
import { dateFormat } from "@/utils/format";
import { getUserInfo, getAdminInfo } from "@/service/user";
export default {
  name: "OrderPage",
  components: {
    NavBar,
  },
  filters: {
    dateFormat,
    orderType(value) {
      switch (value) {
        case 1:
          return "堂食";
        case 2:
          return "打包";
        case 3:
          return "外卖";
      }
    },
    buttonText(value) {
      //status 0表示未处理，1表示订单已处理
      return value ? "已完成" : "确认订单";
    },
    description(foods) {
      const description = foods.reduce(
        (desc, currentValue) => (desc += `${currentValue.food_name}、`),
        ""
      );
      return description.slice(0, -1);
    },
    price(value) {
      return `￥${parseFloat(value).toFixed(2)}`;
    },
  },
  data() {
    return {
      popupShow: false,
      orders: [],
      user: {},
      qrCode: "",
      currentOrder: "",
      adminInfo: {},
    };
  },
  methods: {
    goBack() {
      this.$router.push("/profile");
    },
    confirmOrder(event) {
      event.stopPropagation();
    },
    // 根据传入信息生成支付码
    generateQRCode(qrCodeContent) {
      this.qrCode = new QRCode(this.$refs.qrcode, {
        text: JSON.stringify(qrCodeContent),
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    showDetails(item) {
      this.popupShow = true;
      this.$nextTick(() => {
        // 减少二维码内容
        const foods = [];
        item.foods.forEach((food) => {
          const obj = {
            food_name: food.food_name,
            number: food.price,
          };
          foods.push(obj);
        });
        this.generateQRCode({
          status: item.status,
          foods,
        });
      });
      this.currentOrder = item;
    },
    hanldePopupClose() {
      this.$refs.qrcode.innerHTML = "";
    },
  },
  async mounted() {
    const [orderResponse, userResponse] = await Promise.all([
      getOrder(),
      getUserInfo(),
    ]);
    this.adminInfo = (await getAdminInfo()).data;
    const { orderFoods, orders } = orderResponse.data;
    this.user = userResponse.data;
    console.log(
      "Order页面的orderFoods,orders,user",
      orderFoods,
      orders,
      this.user
    );
    // 合并
    orders.forEach((order) => {
      const foods = [];
      const itemFood = orderFoods.find(
        (item) => item.order_id === order.order_id
      ).food;
      foods.push(itemFood);
      console.log("filter后", foods);
      order.foods = foods;
      order.foodTotal = foods.reduce(
        (total, currentValue) => (total += currentValue.number),
        0
      );
    });
    // 按时间排序
    this.orders = orders.sort(
      (pre, next) => next.create_time - pre.create_time
    );
  },
};
</script>

<style lang="less" scoped>
@import url("./style.less");
@import url("../../assets/font/iconfont/iconfont.css");
</style>