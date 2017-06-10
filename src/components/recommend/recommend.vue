<template>
  <div class="recommend">
    推荐页面
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
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
          }
        })
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

