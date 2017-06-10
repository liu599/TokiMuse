/*
* 通常把每个请求的公用参数写在这里
* 跟QQ接口保持一致
* code为0, 正确值为0
* */

export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0
