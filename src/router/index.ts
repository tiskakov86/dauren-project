import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CVillage from '../components/cVillage.vue'
import CCity from '../components/cCity.vue'
import cLogin from '../components/cLogin.vue'
import store from '../store';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/village',
    name: 'village',
    component: CVillage,
    meta: { requiresAuth: true }
  },
  {
    path: '/city',
    name: 'city',
    component: CCity,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: cLogin
  },
  {
    path: '/references',
    name: 'references',
    component: () => import( '../views/References.vue')
  },
  {
    path: '/referenceKato',
    name: 'referenceKato',
    component: () => import( '../views/ReferenceKato.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import( '../views/Users.vue')
  },
  {
    path: '/maps',
    name: 'maps',
    component: () => import( '../views/MapView.vue')
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


// Глобальный навигационный охранник
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.getters.token; // Получаем состояние авторизации из Vuex

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Если маршрут требует авторизации
    if (!isAuthenticated) {
      // Если пользователь не авторизован
      next('/login'); // Перенаправляем на страницу логина
    } else {
      next(); // Разрешаем переход
    }
  } else {
    next(); // Если маршрут не требует авторизации, разрешаем переход
  }
});

export default router
