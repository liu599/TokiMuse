import {mapGetters, mapMutations, mapActions} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

// 使组件共用一些逻辑
// 把需要公用的逻辑粘贴过来
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'anticon icon-swap' : this.mode === playMode.loop ? 'anticon icon-retweet' : 'anticon icon-sharealt'
    },
    ...mapGetters([
      'playlist',
      'currentSong',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      // 由原来的列表产生新的列表
      let list = null
      switch (mode) {
        case playMode.random:
          list = shuffle(this.sequenceList)
          break
        default:
          list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      // 找到当前歌曲的索引
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
