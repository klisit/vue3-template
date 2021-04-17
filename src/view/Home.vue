<!--
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-13 15:25:50
 * @LastEditTime: 2021-04-18 03:01:43
 * @LastEditors: klisit
-->
<template>
  <div class="home">
    <img src="../assets/loading.gif" alt="" />
    <div style="width: 100%; text-align: center; margin: 10px 0"><router-link to="/about">去介绍页</router-link></div>
    <input type="text" name="" id="" v-model="num" />
    <div style="width: 100%; text-align: center; margin: 10px 0">{{ num }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
export default defineComponent({
  name: 'Home',
  setup() {
    const num: Ref<string> = ref('hello vue3')
    return { num }
  },
})
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img {
    background-image: linear-gradient(rgb(95, 183, 255), rgb(242, 147, 255));
  }
}
</style>
