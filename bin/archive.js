/*
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-15 15:16:07
 * @LastEditTime: 2021-04-18 01:22:22
 * @LastEditors: klisit
 */
require('dotenv').config()
const { exec } = require('child_process')
const { join } = require('path')
const { existsSync } = require('fs')
let dist = process.env.VUE_APP_DIST
let name = process.env.VUE_APP_OUTPUT_NAME
let version = process.env.VUE_APP_VERSION
let distPath = join(__dirname, '../', dist)

if (existsSync(distPath)) {
  archiveDist()
} else {
  console.error('\033[31m压缩失败，请打包文件是否存在!!!\033[0m')
}

async function archiveDist() {
  // TODO: 这里兼容window要自己用node写压缩
  exec(`cd ${dist} && tar -zcvf ${name}-${version}.tar.gz *`, (error) => {
    if (error) {
      throw error
    } else {
      console.log('\033[32m 🚀 压缩成功\033[0m')
      console.log('\033[32m压缩文件路径\033[36m%s\033[0m', `${distPath}/${name}-${version}.tar.gz`)
    }
  })
}
