import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ClientView from '@/views/ClientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/marketplace',
      name: 'marketplace',  
      component: ClientsView, 
    },
   
    {
      path:'/client/:id',
      name:'client',
      component:ClientView
    },
   
  ]
})

export default router
