function getRandomInt(min, max) {
  // 包括max不包括min
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 对arr修改后发生了变化, 必须保留原来的list
export function shuffle(arr) {
  // 创建副本
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i += 1) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
