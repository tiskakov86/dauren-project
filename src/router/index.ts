import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CVillage from '../components/cVillage.vue'
import CCity from '../components/cCity.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/village',
    name: 'village',
    component: CVillage
  },
  {
    path: '/city',
    name: 'city',
    component: CCity
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
