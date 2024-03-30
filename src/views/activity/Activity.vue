<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 09:56:23
 * @LastEditTime: 2024-03-30 17:53:40
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\views\activity\Activity.vue
 * @Description: 用户领取优惠券界面（已通过api测试）
-->
<template>
  <div class="activity">
    <NavBar title="近期活动" :back="true"></NavBar>
    <div class="activity-content" v-if="coupons.length">
      <van-cell-group title="优惠券">
        <div class="activity-coupon" v-for="coupon in coupons" :key="coupon.id">
          <div class="activity-coupon-info">
            <div class="money">
              <div class="discount">
                <span> {{ coupon.discount | priceFormat }} </span>
              </div>
              <div class="useLimit">
                门槛：{{ coupon.limit | priceFormat }}元
              </div>
            </div>
            <div class="description">
              <div class="title">{{ coupon.title }}</div>
              <div class="expire">
                {{ coupon.create_time | timeFormat }}
                剩余有效期：{{ coupon.expirein }}天
              </div>
            </div>
          </div>
          <van-button
            class="activity-coupon-button"
            type="danger"
            size="small"
            round
            :disabled="coupon.userHold"
            @click="receive(coupon.coupon_id)"
          >
            {{ buttonName(coupon.userHold) }}
          </van-button>
        </div>
      </van-cell-group>
    </div>
    <van-empty description="近期没有活动哦~" v-else></van-empty>
  </div>
</template>
<script>
import NavBar from "@/components/nav/NavBar.vue";
import {
  getIssueCoupons,
  getUserCoupons,
  addUserCoupon,
} from "@/service/coupon";
export default {
  name: "ActivityPage",
  components: { NavBar },
  data() {
    return {
      coupons: [],
    };
  },
  filters: {
    timeFormat(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      return `${year}-${month}-${day}`;
    },
    priceFormat(value) {
      return parseFloat(value).toFixed(2);
    },
  },
  async mounted() {
    this.coupons = (await getIssueCoupons({ date: 1 })).data;
    //添加用户持有状态
    if (localStorage.getItem("token") && this.coupons.length !== 0) {
      const userCoupons = (await getUserCoupons()).data;
      this.coupons.forEach((coupon) => {
        if (
          userCoupons.find(
            (userCoupon) => userCoupon.coupon_id === coupon.coupon_id
          )
        ) {
          this.$set(coupon, "userHold", true); //使用$set方法，添加userHold属性并使其变为响应式的
        } else {
          this.$set(coupon, "userHold", false);
        }
      });
    } else {
      this.coupons.forEach((coupon) => {
        this.$set(coupon, "userHold", false);
      });
    }
  },
  methods: {
    async receive(coupon_id) {
      const res = await addUserCoupon({ coupon_id: coupon_id });
      if (res) {
        this.$toast.success("优惠券领取成功");
      }
      this.coupons.forEach((coupon) => {
        if ((coupon.coupon_id === coupon_id)) {
          this.$set(coupon, "userHold", true);
        }
      });
    },
    buttonName(userHold) {
      return userHold ? "已领取" : "领取";
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./style.less");
</style>