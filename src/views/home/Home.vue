<template>
  <div class="Home">
    <NavBar title="师大餐饮" :border="false">
      <template #left>
        <div class="navBar-left" @click="showPicker = true">
          <van-icon name="location-o" size="16" />
          <span>{{ location }}</span>
        </div>
      </template>
    </NavBar>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper1.jpg" alt="" class="swiper-img"
        /></van-swipe-item>
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper2.png" alt="" class="swiper-img"
        /></van-swipe-item>
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper3.png" alt="" class="swiper-img"
        /></van-swipe-item>
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper4.png" alt="" class="swiper-img"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <div class="breakfast content-item" @click="Undeveloped">
        <img src="@/assets/img/icon/breakfast.png" alt="" />
        <div class="content-item-text breakfast-text">
          <span class="stage">早餐</span>
          <span class="deadline">8:30&nbsp;截止时间</span>
        </div>
      </div>
      <div class="lunch content-item" @click="pageJump">
        <img src="@/assets/img/icon/lunch.png" alt="" />
        <div class="content-item-text lunch-text">
          <span class="stage">午餐</span>
          <span class="deadline">12:30&nbsp;截止时间</span>
        </div>
      </div>
      <div class="dinner content-item">
        <img src="@/assets/img/icon/dinner.png" alt="" />
        <div class="content-item-text dinner-text">
          <span class="stage">晚餐</span>
          <span class="deadline">19:00&nbsp;截止时间</span>
        </div>
      </div>
    </div>
    <div class="propaganda">
      <div class="propaganda-tag">{{ propaganda.title }}</div>
      <img :src="propaganda.banner" class="propaganda-banner" />
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :default-index="distanceIndex"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
import banner from "@/assets/img/banner.png";
export default {
  name: "HomePage",
  components: {
    NavBar,
  },
  inject: ["tabBar"],
  data() {
    return {
      showPicker: false,
      distance: 0,
      distanceIndex: 0,
      location: "定位中",
      locations: [
        { name: "第三食堂分店", lng: 104.211598, lat: 30.569171, distance: 0 },
        { name: "西苑分店", lng: 104.204598, lat: 30.572892, distance: 0 },
        { name: "东苑分店", lng: 104.210736, lat: 30.568546, distance: 0 },
      ],
      propaganda: {
        title: "放心吃饭315",
        banner: banner,
      },
    };
  },
  computed: {
    columns() {
      let array = [];
      let text = "";
      for (const item of this.locations) {
        text = `${item.name} ${this.formatDistant(item.distance)}`;
        array.push(text);
      }
      return array;
    },
  },
  mounted() {
    const { tabBar } = this;
    tabBar.show = true;
    this.getLocation();
  },
  destroyed() {
    const { tabBar } = this;
    tabBar.show = false;
  },
  methods: {
    pageJump() {
      this.$router.push("/order-food");
      this.tabBar.show=false
    },
    getLocation() {
      //利用百度地图获取当前经纬度
      const _this = this;
      try {
        // eslint-disable-next-line no-undef
        const geolocation = new BMap.Geolocation(); //已在index.html引入的百度地图的JS
        geolocation.getCurrentPosition(function (r) {
          // eslint-disable-next-line no-undef
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //已在index.html引入的百度地图的JS
            const { lat, lng } = r.point;
            let distances = [];
            for (let item of _this.locations) {
              let distance = _this.getSpace(lat, lng, item.lat, item.lng);
              distances.push(distance);
              item.distance = distance;
            }
            _this.distanceIndex = distances.indexOf(
              Math.min.apply(null, distances)
            );
            _this.location = _this.locations[_this.distanceIndex].name;
          }
        });
      } catch (e) {
        _this.location = "定位失败";
        console.error(e);
      }
    },
    onConfirm(value, index) {
      this.showPicker = false;
      this.location = this.locations[index].name;
    },

    getSpace(lat1, lng1, lat2, lng2) {
      //lat 纬度、lng 经度
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000; // 单位千米
      return s;
    },
    formatDistant(value) {
      if (value > 10) return ">10km";
      else if (value < 1) return `${value * 1000}m`;
      else return `${value}km`;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>