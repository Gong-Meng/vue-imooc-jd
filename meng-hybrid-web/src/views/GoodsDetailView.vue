<template>
  <div class="goods-detail">
    <navigation-bar :is-show-back="false" :nav-bar-style="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img src="@img/back-2.svg" alt="">
        </div>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <my-swiper
        :height="SWIPER_IMAGE_HEIGHT + 'px'"
        :swiper-imgs="goodsData.swiperImgs"
        :paginationType="'2'"
      >
      </my-swiper>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBarView.vue'
import MySwiper from '@c/swiper/MySwiperView.vue'
export default {
  components: {
    NavigationBar,
    MySwiper
  },
  data () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      navBarStyle: {
        backgroundColor: ''
      },
      goodsData: {}
    }
  },
  created () {
    this.goodsData = this.$route.params.goods
  },
  methods: {
    /**
     * 后退当前页面
     */
    onBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
