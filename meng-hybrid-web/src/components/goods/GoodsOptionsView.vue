<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选项 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item"
        v-for="(item, index) in optionsDatas" :key="index"
      >
        <a href="" class="goods-options-list-item-content">
          <span class="goods-options-list-item-content-name">
            {{item.name}}
          </span>
          <span class="goods-options-list-item-content-caret caret"></span>
        </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <div class="options-sub-content">
      <ul class="options-sub-content-list">
        <li class="options-sub-content-list-item"
          v-for="(item, index) in selectOption.subs" :key="index"
        >
          <a class="options-sub-content-list-item-content" href="">
            <span class="options-sub-content-list-item-content-name">
              {{item.name}}
            </span>
            <img class="options-sub-content-list-item-content-select" src="@img/options-select.svg" alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 筛选项数据源
      optionsDatas: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格由高到低'
            },
            {
              id: '1-2',
              name: '销量由高到低'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营优先',
          subs: []
        }
      ],
      // 选中的筛选项
      selectOption: {}
    }
  },
  created () {
    this.selectOption = this.optionsDatas[0]
    console.log(this.selectOption)
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods-options{
  width: 100%;
  border-bottom: 1px solid $lineColor;
  // 一级选项 css
  &-list{
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: white;

    &-item{
      flex-grow: 1;

      &-content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-name{
          font-size: $infoSize;
          margin-right: $marginSize;
        }
      }
    }
  }

  // 子选项 css
  .options-sub-content{
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;

    &-list{
      &-item{
        &-content{
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;

          &-name{
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;
          }

          &-select{
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
}
</style>
