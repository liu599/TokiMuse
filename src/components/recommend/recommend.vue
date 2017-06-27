<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper"> <!--确保异步之后渲染 -->
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    data() {
      // 根dom相关
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      // 组件的生命周期
      // 如果没有keep-alive标签, 路由切换时获取的数据(mouted需要重新渲染)
      // 渲染并不知道哪块数据先渲染, 所以BetterScroll会遇到问题, 这时我们要监听image-onload事件
//      setTimeout(() => {
//        this._getRecommend();
//      }, 2000)
      this._getRecommend()
      // 歌单列表
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          // 要语义化
          if (res.code === ERR_OK) {
            // console.log(res.data.slider)
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list // 只传数据, 监听数据变化, 自动计算
          }
        })
      },
      loadImage() {
        if (!this.checkLoaded) {
            // 不能滚动的时候, 必须保证Dom是渲染好的, 如果有数据变化, 必须重新refresh
          this.$refs.scroll.refresh()
          this.checkLoaded = true;
        }
      }
    },
    components: {
      Slider,
      Scroll
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-primary
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-font-title
            .desc
              color: $color-font-content
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

