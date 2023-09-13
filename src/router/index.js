import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Houses.vue'
import HouseDetails from '../components/HouseDetails.vue'

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
    path: '/:id',
    name: 'houseDetails',
    component: HouseDetails,
    props: true //to accept route params as props
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
