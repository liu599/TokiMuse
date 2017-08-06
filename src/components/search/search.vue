<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortCut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
              <i class="anticon icon-delete"></i>
            </span>
            </h1>
            <search-list :searches="searchHistory"
                         @select="addQuery"
                         @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" :showFlag="searchHistory.length"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Suggest from 'components/suggest/suggest'
  import SearchList from 'base/search-list/search-list'
  import SearchBox from 'base/search-box/search-box'
  import Confirm from 'base/confirm/confirm'
  import Scroll from 'base/scroll/scroll'
  import {playlistMixin} from 'common/js/mixin'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {mapActions, mapGetters} from 'vuex'

  // Scroll的引入
  // 第一是计算时Scroll的内部如果有两个元素的话只能计算第一个, 需要外层包裹
  // 第二是, 由于数据是异步获取的, 在传入Data的时候, Scroll内部的两个Data需要用Computed整合。
  // 第三是DOM没有被显示

  export default {
    mixins: [playlistMixin],
    created() {
      this._getHotKey()
    },
    data() {
      return {
        hotKey: [],
        query: ''
      }
    },
    computed: {
      // 两个数据有一个发生改变, 就会重新计算
      shortCut() {
        return this.hotKey.concat(this.searchHistory)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.shortcut.refresh()
        this.$refs.suggest.refresh()
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query) {
        this.query = query
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      saveSearch() {
        // 需要永久缓存
        this.saveSearchHistory(this.query)
      },
      showConfirm() {
        this.$refs.confirm.text = '将清空所有记忆数据, 是否确认?'
        this.$refs.confirm.show()
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data.hotkey)
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    components: {
      SearchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/extend"
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-font-title
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-primary
            font-size: $font-size-medium
            color: $color-font-head
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-font-title
            .text
              flex: 1
            .clear
              extend-click()
              .anticon
                font-size: $font-size-medium
                color: $color-font-title
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>

