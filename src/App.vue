<template>
  <div id="app">
    hello world
    <t-header></t-header>
  </div>
</template>

<script type="text/ecmascript-6">
  // 注册THeader
  import THeader from './components/t-header/t-header'

  export default {
    name: 'app',
    components: {
      THeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  #app
    color: $color-primary
</style>
