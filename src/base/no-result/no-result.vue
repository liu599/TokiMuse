<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text"><i class="anticon icon-earth"></i> {{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "~common/stylus/variable"
  @import "~common/stylus/extend"
  .no-result
    text-align: center
    .no-result-icon
      width: 86px
      height: 90px
      margin: 0 auto
      // bg-image('no-result')
      background-color: turquoise
      background-size: 86px 90px
    .no-result-text
      margin-top: 30px
      font-size: $font-size-medium
      color: $color-title
</style>
