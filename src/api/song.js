
import {commonParams} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric (mid) {
  // 设置前端路由转发后, 地址为api
  // 线上地址。 这里自己的服务器找不到? 解决方法先通过NGINX代理到imooc的api上。
  // location /api {
  //   proxy_pass          http://vuemusic.t.imooc.io;
  // }
  // const url = '/api/lyric'
  const url = debug ? '/api/lyric' : 'http://fm.nekohand.moe/api/lyric'

  // const url = 'http://fm.nekohand.moe/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
