<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
          ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon anticon">
          <i :class="genIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉!未找到搜索结果哦"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  // import {filterSinger} from 'common/js/song'
  import {createSong} from 'common/js/song'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations, mapActions} from 'vuex'
  import NoResult from 'base/no-result/no-result'

  const TYPE_SINGER = 'singer'
  const PER_PAGE = 20

  export default {
    props: {
      // 决定组件行为
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true
      }
    },
    methods: {
      refresh() {
        this.$refs.suggest.refresh()
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        // 这个组件不需要做存储历史的事件, 派发事件后交给外层组件完成
        this.$emit('select')
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          // return `${item.songname} - ${filterSinger(item.singer)}`
          return `${item.name} - ${item.singer}`
        }
      },
      genIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-user'
        } else {
          return 'icon-right'
        }
      },
      search() {
        // 需要重置Page
        this.page = 1
        // 抓取检索数据
        this.hasMore = true
        // 需要重置Scroll的位置
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, PER_PAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page += 1
        search(this.query, this.page, this.showSinger, PER_PAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      listScroll() {
        this.$emit('listScroll')
      },
      _checkMore(data) {
        const songs = data.song
        if (!songs.list.length || (songs.curnum + songs.curpage * PER_PAGE) > songs.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          // 对象扩展运算符
          ret.push({
            ...data.zhida,
            ...{type: TYPE_SINGER}
          })
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/extend"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        .anticon
          font-size: 14px
          color: $color-font-title
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-font-title
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
