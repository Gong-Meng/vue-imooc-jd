<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选项 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item"
        v-for="(item, index) in optionsDatas" :key="index"
      >
        <a href="javascript:;" class="goods-options-list-item-content"
          @click="onOptionsItemClick(item, index)"
        >
          <span class="goods-options-list-item-content-name"
            :class="{'goods-options-list-item-content-name-active': selectOption.id === item.id}"
          >
            {{item.name}}
          </span>
          <span v-if="item.subs.length > 0" class="goods-options-list-item-content-caret caret"></span>
        </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <div class="options-sub-content" v-show="isShowSubContent">
      <ul class="options-sub-content-list">
        <li class="options-sub-content-list-item"
          v-for="(item, index) in selectOption.subs" :key="index"
        >
          <a class="options-sub-content-list-item-content" href="javascript:;"
            @click="onSubOptionsItemClick(item, index)"
          >
            <span class="options-sub-content-list-item-content-name"
              :class="{'options-sub-content-list-item-content-name-active': selectOption.id === item.id}"
            >
              {{item.name}}
            </span>
            <img v-show="selectOption.id === item.id" class="options-sub-content-list-item-content-select" src="@img/options-select.svg" alt="">
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
              id: '1-3',
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
      selectOption: {},
      // 标记子选项是否处于展开状态
      isShowSubContent: false
    }
  },
  created () {
    this.selectOption = this.optionsDatas[0]
  },
  methods: {
    /**
     * 一级选项点击事件
     * 1、如果子选项处于展开状态，则关闭子选项试图
     * 2、筛选项（item）包含子选项（subs.length>0）
     * 并且当前 item 处于一个选中状态下的时候（item.id === selectOpotion.id），展示子选项视图
     * 3、设置选中项为用户点击的item
     */
    onOptionsItemClick (item, index) {
      // 1、如果子选项处于展开状态，则关闭子选项试图
      // 需标记子选项视图是否展开 isShowSubContent
      if (this.isShowSubContent) {
        this.isShowSubContent = false
        return
      }
      // 展示子选项视图
      // 1、（item）包含子选项（subs.length > 0）
      // 2、当前 item 处于一个选中状态下的时候（item.id === selectOpotion.id）
      if (item.subs.length > 0 && this.selectOption.id === item.id) {
        this.isShowSubContent = true
      }
      // 3、设置选中项为用户点击的item
      this.selectOption = item
    },
    /**
     * 子选项点击事件
     * 1、设置选中项为用户点击的选项（item）
     * 2、将选中项置顶到一级选项
     * 3、关闭子选项试图
     */
    onSubOptionsItemClick (item, index) {
      // 设置选中项为用户点击的选项（item）
      this.selectOption = item
      // 将选中项置顶到一级选项
      this.optionsDatas.forEach(options => {
        options.subs.forEach(subOptions => {
          if (subOptions.id === this.selectOption.id) {
            options.id = subOptions.id
            options.name = subOptions.name
          }
        })
      })
      // 关闭子选项试图
      this.isShowSubContent = false
    }
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

          &-active{
            color: $mainColor;
          }
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

            &-active{
              color: $mainColor;
            }
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
