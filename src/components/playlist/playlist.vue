<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear" @click="showConfirm"><i class="anticon icon-delete"></i></span>
          </h1>
        </div>
        <scroll ref="listContent" :data="sequenceList" class="list-content">
          <transition-group name="list" tag="ul">
            <li :key="item.id" class="item" ref="listItem" v-for="(item, index) in sequenceList" @click="selectItem(item, index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="anticon icon-hearto"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="anticon icon-closecircle"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="anticon icon-addfile"></i>
            <span class="text">添加歌曲至队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text="清空播放列表哦?"
      confirmBtnText="清空" @confirm="confirmClear"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playMode} from 'common/js/config'
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'

  export default {
    data() {
      return {
        showFlag: false
      }
    },
    computed: {
      ...mapGetters([
        'sequenceList',
        'currentSong',
        'playlist',
        'mode'
      ])
    },
    methods: {
      selectItem(item, index) {
        if (this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      confirmClear() {
        this.deleteSongList()
        this.hide()
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      show() {
        // 显示后必须重新计算
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      getCurrentIcon(item) {
        return (this.currentSong.id === item.id) ? 'anticon icon-play' : ''
      },
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex((song) => {
          return current.id === song.id
        })
        // 滚动过去
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
      },
      deleteOne(item) {
        this.deleteSong(item)
        if (!this.playlist) {
          return
        }
        if (!this.playlist.length) {
          this.hide()
        }
      },
      ...mapMutations({
        'setCurrentIndex': 'SET_CURRENT_INDEX',
        'setPlayingState': 'SET_PLAYING_STATE'
      }),
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        this.scrollToCurrent(newSong)
      }
    },
    components: {
      Scroll,
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/extend"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: rgba(255, 255, 255, 0.5)
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-primary-light
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-font-title
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-font-title
          .clear
            extend-click()
            .icon-delete
              font-size: $font-size-medium
              color: #f4f4f4
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: #9900f0
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: #990ff0
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-font-title
            .icon-hearto
              color: #f4f4f4
          .delete
            extend-click()
            font-size: $font-size-small
            color: #f4f4f4
      .list-operate
        width: 140px
        margin: 25px auto 20px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 2px solid $color-primary-dark
          border-radius: 100px
          color: #f4f4f4
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 40px
        background: $color-primary-dark
        font-size: $font-size-medium-x
        color: #f4f4f4
</style>
