<template>
  <scroll class="listview" :data="data" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart.stop.prevent = "onShortcutTouchStart"
         @touchmove.stop.prevent = "onShortcutTouchMove"
         @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index = "index"
            class="item">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  // 规定锚点高度
  const ANCHOR_HEIGHT = 18

  export default {
    created() {
      this.touch = {}
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        // 从数据中计算
        return this.data.map((group) => {
          // title 集合数组, 计算属性
          return group.title.substr(0, 1)
        })
      }
    },
    methods: {
      onShortcutTouchStart(e) {
        // 判断列表第几个元素
        // 封装dom方法, 获取参数
        let anchorIndex = getData(e.target, 'index')
        // 位置需要多个函数共享, created时候要考虑, data()还是props()都会加getter和setter用来监听与DOM数据绑定
        // 我们不需要观测touch的变化, 只是为了数据共享
        let firstTouch = e.touches[0] // 手指的位置, pageY
        // console.log(anchorIndex);
        // 封装scroll方法滚动到固定位置, 第二个参数是滚动时间
        this.touch.y1 = firstTouch.pageY
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        // 当前位置和原来的差确定滚动的距离
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 向下取整
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    components: {
      Scroll
    }
  }

</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-medium-x
        color: $color-font-title
        background: $color-border
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-font-title
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-bg
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-font-link
        font-size: $font-size-small
        &.current
          color: $color-primary-dark
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-primary
        background: $color-bg
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
