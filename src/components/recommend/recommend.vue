<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper"> <!--确保异步之后渲染 -->
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import { getRecommend } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    data() {
      // 根dom相关
      return {
        recommends: []
      }
    },
    created() {
      // 组件的生命周期
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          // 要语义化
          if (res.code === ERR_OK) {
            console.log(res.data.slider)
            this.recommends = res.data.slider
          }
        })
      }
    },
    components: {
      Slider
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

