import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app');

// //test router
// import { markRaw } from 'vue';

// const pinia = createPinia();
// pinia.use(({ store }) => {
//   store.$router = markRaw(router)
// });

// createApp(App)
//   .use(router)
//   .use(pinia)
//   .mount('#app');