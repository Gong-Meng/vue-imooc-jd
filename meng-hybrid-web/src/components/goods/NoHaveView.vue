<template>
  <!-- 缺货标签 -->
  <span class="goods-item-name-no-have">
    缺货
  </span>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods-item-name-no-have{
  padding: 0 px2rem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: #999;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>
