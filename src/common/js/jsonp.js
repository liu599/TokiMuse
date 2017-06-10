import originalJSONP from 'jsonp'

/*
* 如何封装:
* 原函数: url,opt{param，timeout, prefix, name}, fn
* 第一, 原函数使用fn作为callback, 使用Promise
* 第二, 原函数传入url是带有许多参数的(拼好), 但是我们希望在应用中, url是纯净的,
* 查询的字符串是预先拼好的。
*
* 回调函数支持 err, data
* */

// 对外暴露一个方法
export default function jsonp(url, data, opt){
  // 没有问号加问号, 没有问号加个&
  url += (url.indexOf('?')<0 ? '?' : '&') +
          param(data)

  return new Promise((resolve, reject) => {
    originalJSONP(url, opt, (err, data)=>{
      // 当第一个参数为null的时候, 表示获取成功, 这时执行resolve
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

//  url拼接
function param(data){
  let url=''
  for(let k in data){
    // 没有的时候传空值
    let value = data[k]!== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
