<template>
  <div class="t-header">
    <div class="icon">
      <i class="anticon">&#xe661;</i>
    </div>
    <div class="search">
      <input class="search-input"
             name="search-input"
             placeholder="Search..." />
    </div>
    <div class="playing"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .t-header
    position: relative
    height: 42px
    font-size: 0
    color: $color-font-head
    background: $color-primary
    display: box
    display: -webkit-box
    display: -moz-box
    -webkit-box-orient: horizontal
    -moz-box-orient: horizontal
    box-orient: horizontal
    .icon
      display: inline-block
      width: 30px
      height: 30px
      margin: 6px 18px;
      font-size: 30px
      line-height: 30px
      text-align: center
      vertical-align: middle
      //background: url('~components/t-header/logo_thumb.jpg')
      box-flex: 1.0
      -webkit-box-flex: 1.0
      -moz-box-flex: 1.0
    .search
      text-align: center
      font-size: ($font-size-medium)px
      height: 42px
      width: 40%
      margin: 0 6px
      line-height: 36px
      box-flex: 1.0
      -webkit-box-flex: 1.0
      -moz-box-flex: 1.0
      .search-input
        font-size: ($font-size-medium)px
        padding: 4px
        text-indent: 8px
        border-radius: 20px
        width: 100%
        vertical-align: middle
        -webkit-appearance: none
    .playing
      box-flex: 1.0
      -webkit-box-flex: 1.0
      -moz-box-flex: 1.0


</style>

