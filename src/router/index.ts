/*
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-13 15:27:01
 * @LastEditTime: 2021-04-18 03:01:19
 * @LastEditors: klisit
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Home = () => import(/* webpackChunkName: "home" */ '../view/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '../view/About.vue')

const routerHistory = createWebHistory()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/',
    redirect: '/home',
  },
]

const router = createRouter({
  history: routerHistory,
  routes,
})

export default router
