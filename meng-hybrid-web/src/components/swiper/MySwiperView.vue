<template>
  <swiper :options="swiperOptions" ref="mySwiper">
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
    },
    /**
     * 1、圆点切换
     * 2、数字
     */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOptions: {
        // 自动滚动
        autoplay: true,
        // 自动高度，让 siwper 的高度跟随 slide 的高度变化
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          // 分页器样式
          type: 'bullets',
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  created () {
    this.initPaginationLayout()
  },
  methods: {
    initPaginationLayout () {
      switch (this.paginationType) {
        // 圆点分页器
        case '1':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            // 分页器样式
            type: 'bullets',
            bulletClass: 'custom-bullet-class'
          }
          break
        // 数字分页器
        case '2':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            type: 'fraction' // 数字分页器样式
          }
          break
      }
    }
  }
}
</script>
<style lang="scss">
@import '@css/style.scss';
.swiper-slide-img{
  width: 100%;
}
// 圆点分页器
.swiper-pagination{
  bottom: px2rem(123);
  .custom-bullet-class{
    box-sizing: border-box;
    border-radius: 100%;
    height: px2rem(6);
    width: px2rem(6);
    border: px2rem(1) solid #fff;
    margin: 0 px2rem(4);
    display: inline-block;
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    background-color: #fff;
  }
}

// 数字分页器
.swiper-pagination-fraction{
  left: auto;
  right: 0;
  width: auto;
  font-size:  $infoSize;
  background-color: rgba(0, 0, 0, 0.3);
  padding: px2rem(6) px2rem(18);
  border-top-left-radius: px2rem(16);
  border-bottom-left-radius: px2rem(16);
  bottom: px2rem(32);
  color: white;

  .swiper-pagination-current{
    font-size: $titleSize;
    font-weight: bold;
  }
}
</style>
