<!--
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-12 15:48:03
 * @LastEditTime: 2021-04-18 02:49:12
 * @LastEditors: klisit
-->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    /*输出版本戳 */
    console.log(
      '%c%s%c%s',
      'padding:2px 5px;border-radius:4px 0px 0px 4px;color:#fff;background:#4072b7',
      process.env.VUE_APP_NAME,
      'padding:2px 5px;border-radius:0px 4px 4px 0px;color:#333;background:#fff',
      process.env.VUE_APP_VERSION
    )
    return {}
  },
})
</script>
