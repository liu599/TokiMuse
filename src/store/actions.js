/**
 * Created by tokei on 2017/7/13.
 */

// 第一种是异步操作

// 第二种是触发多个mutations, 用一个action达到修改多个mutations的目的

// 第一个参数, commit和state
// 第二个参数 修改
import * as types from './mutation-types'

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
