<template>
  <div class="home">
    <div class="home-content">
      <!-- swiper -->
      <my-swiper :swiper-imgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
      <!-- activity 520活动 -->
      <activity>
          <div class="activity-520">
            <img v-for="(item, index) in activityDatas" :key="index" :src="item.icon" alt="">
          </div>
      </activity>
      <!-- mode-options 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀模块 -->
      <seconds :data-source="secondsDatas"></seconds>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiperView.vue'
import Activity from '@c/currency/ActivityView.vue'
import ModeOptions from '@c/currency/ModeOptionsView.vue'
import Seconds from '@c/seconds/SecondsView.vue'
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds
  },
  data () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 获取数据
    initData () {
      // // 获取顶部轮播图片
      // this.$http.get('/swiper').then(data => {
      //   this.swiperData = data.list
      // }).catch(err => {
      //   console.log(err)
      // })

      // // 获取活动信息
      // this.$http.get('/activitys').then(data => {
      //   this.activityDatas = data.list
      // }).catch(err => {
      //   console.log(err)
      // })

      // axios 同事发送多个请求（并行）
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityData, secondsData) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityData.list
        this.secondsDatas = secondsData.list
        console.log(secondsData)
      }))
    }
  }
}

</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.home{
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  &-content {
    height: 100%;

    .activity-520{
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img{
        display: inline-block;
        width: 33.33%;
      }
    }
  }
}
</style>
