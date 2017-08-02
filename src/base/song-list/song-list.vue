<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" class="item">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)"> {{ getRankText(index) }}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return `text`
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      },
      getDesc(song) {
        return `${song.singer} - ${song.album}`
      },
      // 基础组件, 只派发事件, 不写出具体逻辑
      selectItem(item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/extend"
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-primary
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-font-content
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-font-help
</style>
