<template>
    <div class="tool-bar">
        <!-- tab 按钮，需要有一个数据源，通过这个数据源来去驱动视图 -->
        <div class="tool-bar-item" @click="onChangeFragment(item, index)" v-for="(item, index) in toolBarData" :key="index">
            <!-- 当当前 img 标签的 index === 选中的tab的index的时候，就让img显示高亮的图片 -->
            <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" alt="">
            <!-- 当当前 p 标签的 index === 选中的tab的index的时候，就让 p 添加高亮状态类 -->
            <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h' : index === selectItemIndex}">{{item.name}}</p>
       </div>
    </div>
</template>

<script>
/**
 * ToolBar 的功能：
 * 1、永远位于页面的最底部
 * 2、点击 toolbar 按钮的时候 页面发生对应的响应
 * 3、按钮分为默认和选中的两个状态
 *
 * ----------
 *
 * 能力和约束
 * 1、不具备的能力（约束）
 * 2、通过一个回调，告诉父组件，按钮的点击事件
 * 3、当按钮被选中的时候，应该切换按钮的状态
 */
export default {
  data: () => {
    return {
      // tab 按钮数据源，vue mvvm又数据驱动视图
      toolBarData: [
        {
          // 默认状态下的图片
          nIcon: require('@img/home-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@img/home-h.svg'),
          // 名称
          name: '首页',
          // 组件名称
          componentName: 'home'
        },
        {
          // 默认状态下的图片
          nIcon: require('@img/shopping-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@img/shopping-h.svg'),
          // 名称
          name: '购物车',
          // 组件名称
          componentName: 'shopping'
        },
        {
          // 默认状态下的图片
          nIcon: require('@img/my-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@img/my-h.svg'),
          // 名称
          name: '我的',
          // 组件名称
          componentName: 'my'
        }
      ],
      // 选中的tab 按钮
      selectItemIndex: 0
    }
  },
  methods: {
    onChangeFragment (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    },
    /**
     * 指定切换的 tab 页
     */
    pushFragment (index) {
      // 调用 onChangeFragment 切换对应的tab
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.tool-bar{
    width: 100%;
    height: px2rem(46);
    display: flex;
    justify-content: space-around;
    background: white;
    box-shadow: 0 0 16px 0 rgb(0 0 0 / 20%);
    border-top: 1px solid $lineColor;

    &-item{
        text-align: center;
        padding: px2rem(4) px2rem(12);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &-img{
            width: px2rem(22);
            height: px2rem(22);
        }

        &-name{
            font-size: $infoSize;
            margin-top: px2rem(4);

            &-h{
               color: $mainColor;
            }
        }
    }
}
</style>
