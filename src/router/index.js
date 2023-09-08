import { createRouter, createWebHistory } from 'vue-router'
import Houses from '../views/Houses.vue'

const routes = [
  {
    path: '/',
    name: 'houses',
    component: Houses
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import Houses from '../views/Houses.vue'
// import AboutView from '../views/AboutView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'houses',
//     component: Houses
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: AboutView
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
