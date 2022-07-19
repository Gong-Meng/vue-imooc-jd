<template>
  <div class="count-down">
    <span class="count-down-end-time">
      16点场
    </span>
    <span class="count-down-surplus">
      06:18:18
    </span>
  </div>
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
.count-down{
  display: inline-block;
  font-size:$infoSize;
  margin-left: $marginSize;

  span{
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }

  &-end-time{
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }

  &-surplus{
    background-color: white;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
