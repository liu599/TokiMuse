/**
 * Created by tokei on 2017/7/13.
 */
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

// 播放器： 数据是全局的(多个组件可以打开)
/* 播放状态, 播放器状态, 当前播放的列表(不同播放模式下), 顺序播放的列表 */
/* state -> getters 函数, 类似计算属性 -> mutations-type 需要哪些修改动作, 动词SET或者UPDATE, 字符串常量 -> mutations */

export default state
