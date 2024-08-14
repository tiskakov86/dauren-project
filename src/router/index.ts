import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainPage from '../components/mainPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
