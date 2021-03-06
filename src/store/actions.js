/**
 * Created by tokei on 2017/7/13.
 */

// 第一种是异步操作

// 第二种是触发多个mutations, 用一个action达到修改多个mutations的目的

// 第一个参数, commit和state
// 第二个参数 修改
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'
// import { currentIndex, currentSong } from './getters'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    // shuffle不能产生永久变化
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    // 顺序列表的歌在随机列表中的索引
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = ({commit}, {list}) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 在search页面点击歌曲, 至少需要改变, playlist，sequencelist，currentindex, 如果现在列表中也有歌曲, 还需要删除这个列表的歌曲

export const insertSong = ({commit, state}, song) => {
  // 修改动作不要直接修改state中的值, 所以先创建副本, 副本修改ok后可以通过commit提交
  // let playlist = state.playlist
  let playlist = state.playlist.slice()
  // let sequenceList = state.sequenceList
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 插入之前查找是否有待插入歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 插入当前索引的下一个
  currentIndex += 1
  playlist.splice(currentIndex, 0, song)
  // 如果原列表有当前这首歌了, 那就删掉原来的歌曲
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      // 当前插入的序号大于列表中的序号
      playlist.splice(fpIndex, 1)
      currentIndex -= 1
    } else {
      // 位置也增加了一位
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 找到sequeceList插入的地方
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  // 提交mutations
  // 副本修改成功后再通过commit提交。
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 需要将搜索结果存储在localStorage
export const saveSearchHistory = ({commit}, query) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = ({commit}, query) => {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = ({commit}) => {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = ({commit, state}, song) => {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  // 删除在后面， 正在播放的需要减去1
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex -= 1
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  const playlistState = (playlist.length > 0)
  commit(types.SET_PLAYING_STATE, playlistState)
}

export const deleteSongList = ({commit}) => {
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = ({commit}, song) => {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
