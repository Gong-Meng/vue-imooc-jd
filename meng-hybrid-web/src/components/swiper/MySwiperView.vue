<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :style="{height: height}" :src="item" alt="">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    swiperImgs: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // 自动滚动
        autoplay: true,
        // 自动高度，让 siwper 的高度跟随 slide 的高度变化
        autoHeight: true
      }
    }
  }
}
</script>
<style>
</style>
