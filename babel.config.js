/*
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-11 16:10:23
 * @LastEditTime: 2021-04-11 16:10:53
 * @LastEditors: klisit
 */
module.exports = function (api) {
  api.cache(true)
  const presets = ['@babel/preset-env']
  const plugins = []
  return {
    presets,
    plugins,
  }
}
