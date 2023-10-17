import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Houses.vue'
import HouseDetails from '../components/HouseDetails.vue'
import HouseEdit from '../components/HouseEdit.vue'
import HouseCreate from '../components/HouseCreate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    name: 'houseDetails',
    component: HouseDetails,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'houseEdit',
    component: HouseEdit,
    props: true
  },
  {
    path: '/create',
    name: 'houseCreate',
    component: HouseCreate,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
