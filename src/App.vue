<template>
  <div id="app">
    <t-header></t-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // 注册THeader
  import THeader from 'components/t-header/t-header'
  // 注册Tab
  import Tab from 'components/tab/tab'

  export default {
    name: 'app',
    components: {
      THeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  #app
    color: $color-primary
</style>
