<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span class="tab-link">推 荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/radio">
      <span class="tab-link">电 台</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/rank">
      <span class="tab-link">排行榜</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/singer">
      <span class="tab-link">歌 手</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .tab
    display: flex
    height: 42px
    line-height: 42px
    font-size: $font-size-medium
    background-color: rgba(255,255,255,0.4)
    border-bottom: 1px solid grey #d3d3d3
    box-shadow: 0 0 2px 1px #d3d3d3
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 8px
        color: $color-font-link
      &.router-link-active
        .tab-link
          color: $color-primary-dark
          border-bottom: 2px solid $color-primary

</style>

