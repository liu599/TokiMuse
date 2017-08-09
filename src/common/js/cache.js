import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// 插入/添加
function insertArray(arr, val, compare, maxLen) {
  // 灵活定义任何的比较函数
  const index = arr.findIndex(compare)
  // 数组中已经有, 第一个, 不需要做任何事, 直接返回
  if (index === 0) {
    return
  }
  // 有这条数据不是第一个位置, 首先删掉数据
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插入数组的第一个位置
  arr.unshift(val)
  // 判断数组的长度, 如果数组超过限制, 删除最老的一个
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 保存
export function saveSearch(query) {
  // 把信息拿出来
  let searches = storage.get(SEARCH_KEY, [])
  // 插入数组, 数组, 值, 定义比较函数， 最大值
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function savePlay(song) {
  // 把信息拿出来
  let songs = storage.get(PLAY_KEY, [])
  // 插入数组, 数组, 值, 定义比较函数， 最大值
  insertArray(songs, song, (item) => {
    return item === song
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 删除
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空历史
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 获取历史列表
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
