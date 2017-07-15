<template>
  <div id="app">
    <t-header></t-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  // 注册THeader
  import THeader from 'components/t-header/t-header'
  // 注册Tab
  import Tab from 'components/tab/tab'
  // 注册播放器
  import Player from 'components/player/player'

  export default {
    name: 'app',
    components: {
      THeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
