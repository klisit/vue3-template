/*
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-15 17:18:35
 * @LastEditTime: 2021-04-17 17:39:48
 * @LastEditors: klisit
 */
const envJson = require('dotenv').config().parsed
const readline = require('readline')
const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { exec } = require('child_process')
let oldVer = process.env.VUE_APP_VERSION
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(`当前版本为${oldVer},请输入新版本(不填默认当前版本) \n`, (ver) => {
  let chip = ver.split('.')
  if (ver == '') {
    logo(oldVer)
  } else if (chip.length <= 2) {
    console.clear()
    console.log('\033[31m 输入参数格式不正确> %s <\033[0m', ver)
    rl.close()
  } else {
    const packagePath = join(__dirname, '..', 'package.json')
    const envPath = join(__dirname, '..', '.env')
    let appString = readFileSync(packagePath).toString()
    let envString = readFileSync(envPath).toString()
    let app = JSON.parse(appString)

    app.version = ver
    envString = envString.replace(oldVer, ver)

    const appBuffer = Buffer.from(JSON.stringify(app), 'utf8')
    const envBuffer = Buffer.from(envString, 'utf8')
    writeFileSync(packagePath, appBuffer)
    writeFileSync(envPath, envBuffer)

    exec(`yarn prettier --write ${packagePath}`)
    console.clear()
    console.log('\033[33m修改版本为\033[90m %s \033[37m------>\033[32m %s \033[0m', oldVer, ver)
    logo(ver)
  }

  rl.close()
})

function logo(ver) {
  console.log(
    '\x1B[0;31m      ___            ___            ___      __________      ___      __________\n     /  /|          /  /|          /  /|    /  _______/|    /  /|    /___   ___/|\n    /  / /         /  / /         /  / /   /  /______ |/   /  / /    |__/  /|__|/\n   /  /_/____     /  / /         /  / /   /______   /|    /  / /       /  / /\n  /     ____/|   /  / /         /  / /    |_____/  / /   /  / /       /  / /\n /  /\\  \\___|/  /  /_/____     /  / /   _______/  / /   /  / /       /  / /\n/__/ |\\__\\     /_________/|   /__/ /   /_________/ /   /__/ /       /__/ /\n|__|/ \\|__|    |_________|/   |__|/    |_________|/    |__|/        |__|/   \x1B[0;37m version: %s\n \x1B[0m',
    ver
  )
}
