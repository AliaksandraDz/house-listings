import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import HouseDetailsMain from '../components/HouseDetailsMain.vue'
import HouseEditMain from '../components/HouseEditMain.vue'
import HouseCreateMain from '../components/HouseCreateMain.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/details/:id',
    name: 'HouseDetailsMain',
    component: HouseDetailsMain,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'HouseEditMain',
    component: HouseEditMain,
    props: true
  },
  {
    path: '/create',
    name: 'HouseCreateMain',
    component: HouseCreateMain,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
