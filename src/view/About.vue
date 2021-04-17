<!--
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-13 15:26:19
 * @LastEditTime: 2021-04-18 03:09:55
 * @LastEditors: klisit
-->
<template>
  <div class="about">
    <h2>关于vue3</h2>
    <div>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener noreferrer">vue document</a>
      |
      <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener noreferrer">
        typescript document
      </a>
    </div>
    <router-link to="/home">去主页</router-link>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Test',
})
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div {
    width: 100%;
    margin: 10px 0;
    text-align: center;
  }
}
</style>
